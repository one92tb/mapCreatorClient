import styled ,{ css } from "styled-components";

const Wrapper = styled.div`
  padding: 40px 20px 40px 10px;
  height: 100%;
  @media only screen and (max-width: 1199px) {
    padding: 5px;
  }
`;

const Inner = styled.div`
  border: 1px solid red;
  height: 100%;
  padding: 30px;
  border: 1px solid #00b8e6;
`;

const ImageInsideMarker = styled.img`
  width: 25px;
  height: 25px;
`;

const ImageWithoutMarker = styled.img`
  width: 50px;
  height: 50px;
  display: block;
  text-align: center;
`;

const Form = styled.form`
  display: block;
  margin-top: 20px;
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
  position: relative;
`;

const Label = css`
  margin-bottom: 0;

  @media only screen and (max-width: 575.98px) {
    font-size: 12px;
  }
`;

const LabelColor = styled.label`
  ${Label};
  margin-left: 2px;
`;

const LabelFile = styled.label`
  ${Label};
`;

const LabelName = styled.label`
  ${Label};
  margin-left: 2px;
`;

const FileInput = styled.input`
  visibility: hidden;
  position: absolute;
  opacity: 0;
  z-index: 99;
`;

const InputStyle = css`
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 0.25rem;
`;

const InputName = css`
  display: block;
  width: 100%;
  padding: 0.375rem 0.75rem;
  border: 1px solid #ced4da;

  @media only screen and (max-width: 575.98px) {
    font-size: 14px;
    padding: 0.25rem;
    height: 31px;
  }
`;

const Button = css`
  width: 165px;
  cursor: pointer;
  color: #fff;
  border: 1px solid transparent;
  display: inline-block;

  @media only screen and (max-width: 575.98px) {
    width: 150px;
  }
`;

const CrudButton = css`
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  -webkit-user-select: none;
  padding: 0.375rem 0.75rem;

  @media only screen and (max-width: 575.98px) {
    padding: 0.25rem 0.5rem;
    font-size: 14px;
  }
`;
//z-index: -00;
const Input = styled.input`
  ${InputStyle} ${InputName};
  background-color: #fff;
  height: 40px;
`;

const InputSpan = styled.span`
  ${InputStyle} ${Button}
  margin-right: 10px;
  margin-bottom: 0;
  border-color: #00b8e6;
  padding: 6px 12px;
  height: 100%;
  background: #00b8e6;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  @media only screen and (max-width: 575.98px) {
    font-size: 14px;
    width: 150px;
    padding: 4px 8px;
    height: 31px;
  }
`;

const SubmitBtn = styled.button`
  ${InputStyle};
  ${Button};
  ${CrudButton};
  margin-right: 10px;
  background-color: #6c757d;
  border-color: #6c757d;
  @media only screen and (max-width: 575.98px) {
    margin-bottom: 16px;
  }
`;

const RemoveBtn = styled.button`
  ${InputStyle};
  ${Button};
  ${CrudButton};
  background-color: #ff6666;
  border-color: #ff6666;
  @media only screen and (max-width: 575.98px) {
    margin-bottom: 16px;
  }
`;

const DownloadBtn = styled.button`
  ${Button};
  ${CrudButton};
  ${InputStyle};
  background-color: #6c757d;
  border-color: #6c757d;
`;

const MarkerIcon = styled.div`
  display: flex;
  position: absolute;
  justify-content: center;
  align-items:center;
  border-radius: 50%;
  border: 8px solid ${props => props.background && props.background};
  width: 60px;
  height: 60px;
  top: 7px;
  background: ${props => props.background && props.background};

  &::after {
    position: absolute;
    content: "";
    width: 0px;
    height: 0px;
    bottom: -45px;
    left: 2px;
    border: 20px solid transparent;
    border-top: 25px solid ${props => props.background && props.background};
  }`;

const UploadButton = styled.button`
  ${Button};
  ${CrudButton};
  background: ${props => (props.status ? "#00b8e6" : "#B2CFE7")};
  border-color: #00b8e6;
  border-top-left-radius: 0.25rem;
  border-bottom-left-radius: 0.25rem;
`;

const CustomButton = styled.button`
  ${Button};
  ${CrudButton};
  font-size: 1rem;
  line-height: 1.5;
  background: ${props => (!props.status ? "#00b8e6" : "#B2CFE7")};
  border-color: #00b8e6;
  border-right: 1px solid #00b8e6;
  border-top-right-radius: 0.25rem;
  border-bottom-right-radius: 0.25rem;
`;

const ImageWrapper = css`
  width: 100px;
  height: 100px;
  margin-left: auto;
  margin-right: auto;
`;

const ImageBox = styled.div`
  ${ImageWrapper};
  border: 1px solid #495057;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AdditionalWrapper = styled.div`
  ${ImageWrapper};
  border: 1px solid #000;
`;

const MarkerIconBox = styled.div`
  ${ImageWrapper};
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ButtonGroup = styled.div`
  margin-bottom: 40px;
  display: flex;
  justify-content: center;
`;

const ErrorMessage = styled.span`
  color: red;
  font-size: 10px;
  display: block;
  margin-left: 2px;
`;

export {
  Wrapper,
  Inner,
  ImageInsideMarker,
  ImageWithoutMarker,
  Form,
  FormGroup,
  LabelColor,
  LabelFile,
  LabelName,
  FileInput,
  Input,
  InputSpan,
  SubmitBtn,
  RemoveBtn,
  DownloadBtn,
  MarkerIcon,
  UploadButton,
  CustomButton,
  ImageBox,
  AdditionalWrapper,
  MarkerIconBox,
  ButtonGroup,
  ErrorMessage
};
