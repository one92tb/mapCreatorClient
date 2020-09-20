import * as actions from './logout';

const userData = {
  userId: '',
  userName: '',
  error: '',
  isAuthorized: false
};

describe('logout action', () => {
  it('LOGOUT', () => {
    expect(actions.logout(userData)).toEqual({
      type: actions.LOGOUT,
      userData
    });
  });
});
