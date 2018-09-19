import { StoreDevtoolsOptions } from './ngrx-platform/modules/store-devtools';
import { LocalStorageConfig } from 'ngrx-store-localstorage';
import { Action } from 'ngrx-system/public_api';

export interface TraceData {
  initState: any;
  state: any;
  actions: Action[];
  error: Error;
  max: number;
}

export interface NgrxSystemConfig<T> {
  log: boolean;
  maxAge: number;
  logTrace: boolean;
  submitTrace?: (trace: TraceData) => void;
  controlledErrors: boolean;
  simpleRecovery: boolean;
  send: {
    enabled: boolean;
  };
  devTools: StoreDevtoolsOptions;
  rootReducers: any;
  effects: any[];
  initialState: T;
  storage: LocalStorageConfig;
}
