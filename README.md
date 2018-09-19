# Ngrx-system

This package compiles common packages of ngrx into one and supplies aditional helpers

## interfaces

- TypedAction<TPayload>: Add a typed payload to Action
- ReqOb<TIn, TSucc, TError>: Object with action creators for async/request handling.

## decorators

- ReqEffect(ReqOb): receives a ReqObject and creates a common handling operation

## type helpers

- createActionType
- createActionTypeReq
- createActionTypeSucc
- createActionTypeErr

## Namespacing action types helper

createNamespace(namespace): receives a namespace and supplies three helper methods for it

- createAction (type): creates a namespaced action
- createEmptyReq(type): creates a ReqOb with an empty TIn
- createRequest(type): creates a ReqOb with a typed TIn

All the action creators supplied by this helper overwrites the toString method in the function. This method returns the Action.type associated to it

## metaReducers included

- localStorage (ngrx-storage-localstorage)
- errorTracing: it will capture the errors for you a give the actions given the number of actions. + initial & last state & Error
- logger: logging made easy
- hardReset: will flush your app state entirely
