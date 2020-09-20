export const REDIRECT = 'REDIRECT';

export const redirect = (path) => ({
  type: REDIRECT,
  pathName: path
});
