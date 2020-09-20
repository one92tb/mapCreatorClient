import * as actions from './isPanelSelect';

const bool = true;

describe('is panel select action', () => {
  it('IS_SELECT', () => {
    expect(actions.isPanelSelect(bool)).toEqual({
      type: actions.IS_SELECT,
      bool
    });
  });
});
