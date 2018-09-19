import { Action as UntypedAction } from './ngrx-platform/modules/store';
import { ofType } from './ngrx-platform/modules/effects';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import {
  EffectMetadata,
  setEffectMetadataEntries
} from './ngrx-platform/modules/effects/src/effects_metadata';

export interface TypedAction<TPayload> extends UntypedAction {
  payload: TPayload;
  meta?: any;
}

export interface ReqOb<TIn, TSucc, TError> {
  REQ(p: TIn): TypedAction<TIn>;
  SUCC(p: TSucc): TypedAction<TSucc>;
  ERR(p: TError): TypedAction<TError>;
}

export function ReqEffect<T, TIn, TSucc, TError>(
  reqOb: ReqOb<TIn, TSucc, TError>
) {
  return function(
    target: T,
    propertyKey: string,
    descriptor: TypedPropertyDescriptor<Function>
  ) {
    const method = descriptor.value || function() {};
    const key = `${propertyKey}$`;
    const metadata: EffectMetadata<T> = { propertyName: key, dispatch: true };
    setEffectMetadataEntries<T>(target, [metadata]);
    Object.defineProperty(target, key, {
      get() {
        if (!this.actions$) {
          console.error(
            new Error(
              `The application will not work: ${propertyKey} ` +
                `needs "private actions$: Actions" arg in the constructor`
            )
          );
        }
        return this.actions$.pipe(
          ofType(reqOb.REQ.toString()),
          map((a: TypedAction<TIn>) => a.payload),
          mergeMap(method.bind(this)),
          map(reqOb.SUCC),
          catchError(err => of(reqOb.ERR(err)))
        );
      }
    });
  };
}

export const createActionType = (namespace, type) => `[${namespace}]${type}`;
export const createActionTypeReq = baseType => `${baseType}_REQUEST`;
export const createActionTypeSucc = baseType => `${baseType}_SUCCESS`;
export const createActionTypeErr = baseType => `${baseType}_ERROR`;

export function createNamespace(namespace: string) {
  return {
    createAction<TPayload>(
      type: string
    ): (payload: TPayload) => TypedAction<TPayload> {
      const actionType = createActionType(namespace, type);
      function createNamespacedAction(
        payload: TPayload
      ): TypedAction<TPayload> {
        return {
          type: actionType,
          payload
        };
      }
      createNamespacedAction.toString = () => actionType;
      return createNamespacedAction;
    },
    createEmptyReq<TSuccess, TError>(
      type: string
    ): ReqOb<undefined, TSuccess, TError> {
      const actionType = createActionType(namespace, type);
      const typeSucc = createActionTypeSucc(actionType);
      const typeReq = createActionTypeReq(actionType);
      const typeError = createActionTypeErr(actionType);
      function REQ(): TypedAction<undefined> {
        return {
          type: typeReq,
          payload: undefined,
          meta: {
            nodata: true
          }
        };
      }
      function SUCC(payload: TSuccess): TypedAction<TSuccess> {
        return {
          type: typeSucc,
          payload
        };
      }
      function ERR(payload: TError): TypedAction<TError> {
        return {
          type: typeError,
          payload
        };
      }
      REQ.toString = () => typeReq;
      SUCC.toString = () => typeSucc;
      ERR.toString = () => typeError;
      return {
        REQ,
        SUCC,
        ERR
      };
    },
    createRequest<TRequest, TSuccess, TError>(
      type: string
    ): ReqOb<TRequest, TSuccess, TError> {
      const actionType = createActionType(namespace, type);
      const typeSucc = createActionTypeSucc(actionType);
      const typeReq = createActionTypeReq(actionType);
      const typeError = createActionTypeErr(actionType);
      function REQ(payload: TRequest): TypedAction<TRequest> {
        return {
          type: typeReq,
          payload
        };
      }
      function SUCC(payload: TSuccess): TypedAction<TSuccess> {
        return {
          type: typeSucc,
          payload
        };
      }
      function ERR(payload: TError): TypedAction<TError> {
        return {
          type: typeError,
          payload
        };
      }
      REQ.toString = () => typeReq;
      SUCC.toString = () => typeSucc;
      ERR.toString = () => typeError;
      return {
        REQ,
        SUCC,
        ERR
      };
    }
  };
}
