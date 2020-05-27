import React from "react";
import { Wrapper, TextBox } from "./style";

Wrapper.displayName = "div";
TextBox.displayName = "div";

export const NoAuthorization = () => (
  <Wrapper>
    <TextBox>
      You have no permission to access this components. You must have admin
      status.
    </TextBox>
  </Wrapper>
);

export default NoAuthorization;
