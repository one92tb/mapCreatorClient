import * as actions from '../../../actions/signIn/resetLoginError';

describe('reset login error action', () => {
  it('RESET_LOGIN_ERROR', () => {
    expect(actions.resetLoginError()).toEqual({
      type: actions.RESET_LOGIN_ERROR
    });
  });
});
