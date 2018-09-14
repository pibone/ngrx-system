import { StoreDevtoolsOptions } from './ngrx-platform/modules/store-devtools';

export interface NgrxSystemConfig<T> {
  maxAge: number;
  log: boolean;
  controlledErrors: boolean;
  simpleRecovery: boolean;
  send: {
    enabled: boolean;
  };
  devTools: StoreDevtoolsOptions;
  rootReducers: any;
  effects: any[];
  initialState: T;
}
