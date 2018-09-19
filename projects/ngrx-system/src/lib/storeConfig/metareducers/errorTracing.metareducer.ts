import { SYSTEM_EXCEPTION, REDUCER_EXCEPTION } from '../system.actions';
import {
  addActionToActions,
  addStateToPastStates,
  createTraceOf,
  logTrace
} from '../utils';
import { NgrxSystemConfig } from '../../models';

export const errorTracingMeta = (tracingConfig: NgrxSystemConfig<any>) => reducer => {
  const maxActions = tracingConfig.maxAge;
  const pastStates = [];
  const actions = [];
  const addAction = addActionToActions(actions, maxActions);
  const addState = addStateToPastStates(pastStates, maxActions);
  const createTrace = createTraceOf(pastStates, actions, maxActions);

  const doTracing = () => {
    const x = 1;
    createTrace().then(trace => {
      if (tracingConfig.logTrace) {
        logTrace(trace);
      }
      if (tracingConfig.submitTrace) {
        tracingConfig.submitTrace(trace);
      }
    });
  };

  return (state, action) => {
    addAction(action);
    try {
      // SYSTEM_ERRORS
      if (<string>action.type === SYSTEM_EXCEPTION.toString()) {
        doTracing();
        // Simple error recovery to a known stable state.
        const newState = reducer(pastStates[1], action);
        addState(newState);
        return newState;
        // CONTROLLED_ERRORS
      } else if (
        tracingConfig.controlledErrors &&
        (<string>action.type).endsWith('_ERROR')
      ) {
        const newState = reducer(state, action);
        addState(newState);
        doTracing();
        return newState;
        // NO ERROR
      } else {
        const newState = reducer(state, action);
        addState(newState);
        return newState;
      }
    } catch (e) {
      // REDUCER_ERRORS
      const injectedAction = REDUCER_EXCEPTION(e);
      const newState = reducer(state, injectedAction);
      addState(state);
      addState(newState);
      addAction(injectedAction);
      return newState;
    }
  };
};
