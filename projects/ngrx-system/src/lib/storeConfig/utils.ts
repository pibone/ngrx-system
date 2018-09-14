import { SYSTEM_EXCEPTION } from './system.actions';

export const addActionToActions = (actions, maxActions) => action => {
  if (actions.length >= maxActions) {
    actions.shift();
    actions.push(action);
  } else {
    actions.push(action);
  }
};

export const addStateToPastStates = (pastStates, maxStates) => state => {
  if (pastStates.length >= maxStates) {
    pastStates.shift();
    pastStates.push(state);
  } else {
    pastStates.push(state);
  }
};

export const createTraceOf = (pastStates, actions, max) => (
  error: Error | undefined = undefined,
) =>
  Promise.resolve({
    initState: pastStates[0],
    state: pastStates[pastStates.length - 1],
    actions,
    error,
    max,
  });

export const logTrace = trace => {
  console.group(`Trace sent`);
  if (trace.actions[0].type.endsWith('_EXCEPTION')) {
    console.log('\tby external system error', trace.actions[0]);
  }
  console.log(`State - ${trace.max}:`, trace.initState);
  console.log(`State:`, trace.state);
  console.log(`Action deltas:`, trace.actions);
  console.groupEnd();
};
