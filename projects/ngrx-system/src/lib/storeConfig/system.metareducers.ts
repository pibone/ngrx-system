import { errorTracingMeta } from './metareducers/errorTracing.metareducer';
import { localStorageMeta } from './metareducers/localStorage.metareducer';
import { loggerMeta } from './metareducers/logger.metareducer';
import { hardResetMeta } from './metareducers/hardReset.metareducer';

export const metaReducers = [
  loggerMeta,
  hardResetMeta,
  errorTracingMeta,
  localStorageMeta
];
