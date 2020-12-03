import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  height: 80%;
  align-items: center;
`;

const TextBox = styled.div`
  width: 600px;
  height: 200px;
  background: #e6e600;
  font-size: 25px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  padding: 10px;
  border: 3px solid #ff3300;
  text-align: center;

  @media only screen and (max-width: 767.98px) {
    width: 300px;
    height: 100px;
    font-size: 14px;
  }
`;

Wrapper.displayName = 'div';
TextBox.displayName = 'div';

export { Wrapper, TextBox };
