import * as actions from "./resetRegisterError";

describe("reset register error", () => {
  it("RESET_REGISTER_ERROR", () => {
    expect(actions.resetRegisterError()).toEqual({
      type: actions.RESET_REGISTER_ERROR
    });
  });
});
