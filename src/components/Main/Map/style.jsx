import styled from 'styled-components';

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  padding: 40px 20px 40px 10px;

  @media only screen and (max-width: 1199px) {
    padding: 5px;
  }
`;

const SearchBoxInput = styled.input`
  box-sizing: border-box;
  border: 1px solid transparent;
  width: 200px;
  height: 40px;
  margin-top: 10px;
  padding: 0 12px;
  border-radius: 3px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
  outline: none;

  @media only screen and (max-width: 575.98px) {
    margin: 5px 10px;
    top: 50px !important;
    left: 0 !important;
    width: 255px;
  }

  @media only screen and (max-width: 350px) {
    top: 15px;
    left: 220px;
    width: 145px;
  }
`;

const InfoBoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  background: #4ddbff;
  opacity: 0.9;
  height: 200px;
  width: 250px;
  border: 5px solid #00b8e6;
  border-radius: 5px;

  &:before {
    top: 100%;
    left: 50%;
    border: solid transparent;
    content: " ";
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
    border-color: rgba(255, 31, 150, 0);
    border-top-color: #00b8e6;
    border-width: 25px;
    margin-left: -25px;
  }
  &:after {
    top: 100%;
    left: 50%;
    border: solid transparent;
    content: " ";
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
    border-color: rgba(136, 183, 213, 0);
    border-top-color: #00b8e6;
    border-width: 20px;
    margin-left: -20px;
  }
`;

const InfoBtn = styled.button`
  margin-top: 10px;
  width: 160px;
  display: block;
  margin-left: auto;
  margin-right: auto;
  background: #4ddbff;
  color: #003d4d;
  border: 0;
  padding: 5px;
  border-radius: 2px;
  border: 2px solid #00b8e6;
  font-weight: bold;

  &:hover {
    cursor: pointer;
    color: #fff;
    background-color: #ff1a1a;
  }
`;

const InfoContent = styled.span`
  font-size: 15px;
  color: #003d4d;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  border-bottom: 2px solid #00b8e6;
  font-weight: bold;
`;

const InfoContentInput = styled.input`
font-size: 15px;
color: #003d4d;
height: 35px;
background: #fff;
text-align: center;
border: none;
border-bottom: 2px solid #00b8e6;
text-transform: uppercase;
`;

export {
  Wrapper,
  SearchBoxInput,
  InfoBoxContainer,
  InfoBtn,
  InfoContent,
  InfoContentInput
};
