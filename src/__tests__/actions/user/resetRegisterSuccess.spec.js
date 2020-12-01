import * as actions from '../../../actions/user/resetRegisterSuccess';

describe('reset register success', () => {
  it('RESET_REGISTER_SUCCESS', () => {
    expect(actions.resetRegisterSuccess()).toEqual({
      type: actions.RESET_REGISTER_SUCCESS
    });
  });
});
