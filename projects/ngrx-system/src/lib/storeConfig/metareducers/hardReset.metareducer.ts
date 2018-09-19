import { HARD_RESET } from '../system.actions';

export const hardResetMeta = config => reducer => (state, action) =>
  reducer(action.type === HARD_RESET.toString() ? undefined : state, action);
