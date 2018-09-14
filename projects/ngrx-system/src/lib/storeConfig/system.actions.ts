import { createNamespace } from '../helpers';

const globalNS = createNamespace('Global');
export const SYSTEM_EXCEPTION = globalNS.createAction<Error>(
  'SYSTEM_EXCEPTION',
);
export const REDUCER_EXCEPTION = globalNS.createAction<Error>(
  'REDUCER_EXCEPTION',
);

export const HARD_RESET = globalNS.createAction('HARD_RESET');
export const SOFT_RESET = globalNS.createAction('SOFT_RESET');
