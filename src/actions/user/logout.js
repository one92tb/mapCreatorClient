export const LOGOUT = 'LOGOUT';

export const logout = (userData) => ({
  type: LOGOUT,
  userData
});
