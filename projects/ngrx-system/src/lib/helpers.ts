import { Action as UntypedAction } from './ngrx-platform/modules/store';
import { ofType } from './ngrx-platform/modules/effects';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { EffectMetadata, setEffectMetadataEntries } from './ngrx-platform/modules/effects/src/effects_metadata';

export interface Action<TPayload> extends UntypedAction {
  payload: TPayload;
  meta?: any;
}

export interface ReqOb<TIn, TSucc, TError> {
  REQ(p: TIn): Action<TIn>;
  SUCC(p: TSucc): Action<TSucc>;
  ERR(p: TError): Action<TError>;
}

export function Effect<T, TIn, TSucc, TError>(
  reqOb: ReqOb<TIn, TSucc, TError>,
) {
  return function(
    target: T,
    propertyKey: string,
    descriptor: TypedPropertyDescriptor<Function>,
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
                `needs "private actions$: Actions" arg in the constructor`,
            ),
          );
        }
        return this.actions$.pipe(
          ofType(reqOb.REQ.toString()),
          map((a: Action<TIn>) => a.payload),
          mergeMap(method.bind(this)),
          map(reqOb.SUCC),
          catchError(err => of(reqOb.ERR(err))),
        );
      },
    });
  };
}

export const createActionType = (namespace, type) => `[${namespace}]${type}`;
export const createActionTypeReq = baseType => `${baseType}_REQUEST`;
export const createActionTypeSucc = baseType => `${baseType}_SUCCESS`;
export const createActionTypeErr = baseType => `${baseType}_ERROR`;

export function createNamespace(namespace: string) {
  return {
    createAction<TPayload>(type: string) {
      const actionType = createActionType(namespace, type);
      function createNamespacedAction(payload: TPayload): Action<TPayload> {
        return {
          type: actionType,
          payload,
        };
      }
      createNamespacedAction.toString = () => actionType;
      return createNamespacedAction;
    },
    createEmptyReq<TSuccess, TError>(type: string) {
      const actionType = createActionType(namespace, type);
      const typeSucc = createActionTypeSucc(actionType);
      const typeReq = createActionTypeReq(actionType);
      const typeError = createActionTypeErr(actionType);
      function REQ(): Action<undefined> {
        return {
          type: typeReq,
          payload: undefined,
          meta: {
            nodata: true,
          },
        };
      }
      function SUCC(payload: TSuccess): Action<TSuccess> {
        return {
          type: typeSucc,
          payload,
        };
      }
      function ERR(payload: TError): Action<TError> {
        return {
          type: typeError,
          payload,
        };
      }
      REQ.toString = () => typeReq;
      SUCC.toString = () => typeSucc;
      ERR.toString = () => typeError;
      return {
        REQ,
        SUCC,
        ERR,
      };
    },
    createRequest<TRequest, TSuccess, TError>(type: string) {
      const actionType = createActionType(namespace, type);
      const typeSucc = createActionTypeSucc(actionType);
      const typeReq = createActionTypeReq(actionType);
      const typeError = createActionTypeErr(actionType);
      function REQ(payload: TRequest): Action<TRequest> {
        return {
          type: typeReq,
          payload,
        };
      }
      function SUCC(payload: TSuccess): Action<TSuccess> {
        return {
          type: typeSucc,
          payload,
        };
      }
      function ERR(payload: TError): Action<TError> {
        return {
          type: typeError,
          payload,
        };
      }
      REQ.toString = () => typeReq;
      SUCC.toString = () => typeSucc;
      ERR.toString = () => typeError;
      return {
        REQ,
        SUCC,
        ERR,
      };
    },
  };
}
