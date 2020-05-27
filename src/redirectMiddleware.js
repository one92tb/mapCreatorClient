import history from "./history";

export const REDIRECT = "REDIRECT";

export const createMiddleware = handlers => {
  return store => next => action => {
    const actionHandler = handlers.find(
      handler => handler.type === action.type
    );
  
    let result = next(action);

    if (actionHandler && actionHandler.afterHandler) {
      actionHandler.afterHandler(action.pathName);
    }

    return result;
  };
};

export const redirectMiddleware = createMiddleware([
  {
    type: REDIRECT,
    afterHandler: pathName => {
      history.push(pathName);
    }
  }
]);
