import { NgrxSystemConfig } from './models';

export const defaultConfig: NgrxSystemConfig<any> = {
  maxAge: 5,
  log: true,
  controlledErrors: true,
  simpleRecovery: false,
  send: {
    enabled: false,
  },
  devTools: {
    maxAge: 30,
  },
  // TODO: to type
  effects: [],
  rootReducers: {},
  initialState: {},
};
