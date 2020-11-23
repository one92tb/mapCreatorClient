import history from './history';

export const REDIRECT = 'REDIRECT';

// eslint-disable-next-line no-unused-vars
export const createMiddleware = (handlers) => (store) => (next) => (action) => {
  const actionHandler = handlers.find(
    (handler) => handler.type === action.type
  );

  const result = next(action);

  if (actionHandler && actionHandler.afterHandler) {
    actionHandler.afterHandler(action.pathName);
  }

  return result;
};

export const redirectMiddleware = createMiddleware([
  {
    type: REDIRECT,
    afterHandler: (pathName) => {
      history.push(pathName);
    }
  }
]);
