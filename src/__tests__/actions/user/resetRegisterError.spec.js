import * as actions from '../../../actions/user/resetRegisterError';

describe('reset register error', () => {
  it('RESET_REGISTER_ERROR', () => {
    expect(actions.resetRegisterError()).toEqual({
      type: actions.RESET_REGISTER_ERROR
    });
  });
});
