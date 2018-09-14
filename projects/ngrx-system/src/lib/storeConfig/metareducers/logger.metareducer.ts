import { NgrxSystemConfig } from '../../models';

export const loggerMeta = (config: NgrxSystemConfig<any>) => reducer => {
  if (!config.log) {
    return reducer;
  }
  return (state, action) => {
    console.group(action.type);
    const nextState = reducer(state, action);
    const log = action.payload || action.error;
    if (typeof log !== 'undefined') {
      console.log(log);
    } else {
      if (
        !(action.meta && action.meta.nodata) &&
        !(<string>action.type).startsWith('@ngrx/')
      ) {
        console.warn('This action was commited without a payload nor error.');
      }
    }
    console.groupEnd();
    return nextState;
  };
};
