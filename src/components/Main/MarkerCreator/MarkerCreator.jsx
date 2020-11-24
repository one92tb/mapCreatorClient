import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getSelectedMarker } from '../../../actions/marker/getSelectedMarker';
import { postMarker } from '../../../actions/marker/postMarker';
import { removeMarker } from '../../../actions/marker/removeMarker';
import { editMarker } from '../../../actions/marker/editMarker';
import { fetchMarkers } from '../../../actions/marker/fetchMarkers';
import validate from '../../../validate';
import { errors, markerValidationDetails } from '../../../schema/markerSchema';
import {
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
} from './style';

const domtoimage = require('dom-to-image');

Wrapper.displayName = 'div';
Inner.displayName = 'div';
ImageInsideMarker.displayName = 'img';
ImageWithoutMarker.displayName = 'img';
Form.displayName = 'form';
FormGroup.displayName = 'div';
LabelColor.displayName = 'label';
LabelFile.displayName = 'label';
LabelName.displayName = 'label';
FileInput.displayName = 'input';
Input.displayName = 'input';
InputSpan.displayName = 'span';
SubmitBtn.displayName = 'button';
RemoveBtn.displayName = 'button';
DownloadBtn.displayName = 'button';
MarkerIcon.displayName = 'div';
UploadButton.displayName = 'button';
CustomButton.displayName = 'button';
ImageBox.displayName = 'div';
AdditionalWrapper.displayName = 'div';
MarkerIconBox.displayName = 'div';
ButtonGroup.displayName = 'div';
ErrorMessage.displayName = 'span';

export const MarkerCreator = (props) => {
  const {
    selectedMarker,
    fetchMarkers,
    postMarker,
    removeMarker,
    getSelectedMarker,
    editMarker,
    markers
  } = props;

  const [inputValues, setInputValues] = useState({
    markerName: '',
    color: '#000',
    markerImageFile: ''
  });
  const [displayImageUrl, setDisplayImageUrl] = useState('img/IMG-default.png');
  const [uploadStatus, setUploadStatus] = useState(true);
  const [markerNameError, setMarkerNameError] = useState('');
  const [markerImageFileError, setMarkerImageFileError] = useState('');

  const imageBoxRef = useRef();

  useEffect(() => {
    fetchMarkers();
  }, []);

  useEffect(() => {
    if (selectedMarker) {
      setInputValues({ ...inputValues, markerName: selectedMarker.name, markerImageFile: '' });
      setDisplayImageUrl(selectedMarker.url);
      setMarkerNameError('');
      setMarkerImageFileError('');
    }
  }, [selectedMarker.id]);

  useEffect(() => {
    inputValues.markerName && (inputValues.markerName.length > 2) && setMarkerNameError('');
  }, [inputValues.markerName]);

  useEffect(() => {
    /\.(png)$/i.test(inputValues.markerImageFile.name) && setMarkerImageFileError('');
  }, [inputValues.markerImageFile.name]);

  const onChange = (event) => {
    if (event.target.name === 'markerImage' && event.target.files[0]) {
      setInputValues({ ...inputValues, markerImageFile: event.target.files[0] });
      setDisplayImageUrl(URL.createObjectURL(event.target.files[0]));
    } else {
      setInputValues({ ...inputValues, [event.target.name]: event.target.value });
    }
  };

  const sendRecord = (event) => {
    event.preventDefault();

    const data = {
      markerName: inputValues.markerName,
      markerImageFile: inputValues.markerImageFile,
      uplaodStatus: uploadStatus,
      selectedMarker,
      markers
    };

    const validationResult = validate(errors, markerValidationDetails, data);

    const fd = new FormData();
    fd.append('file', inputValues.markerImageFile);
    fd.append('markerName', inputValues.markerName);

    if (!validationResult.isError) {
      // edit
      if (selectedMarker.id && !selectedMarker.isDeleted) {
        // edit without image file
        if (inputValues.markerImageFile === '') {
          editMarker(
            {
              name: inputValues.markerName,
              icon: selectedMarker.icon
            },
            selectedMarker.id
          );
        } else {
          editMarker(fd, selectedMarker.id);
        }
      } else { // post
        postMarker(fd);
        setInputValues({ ...inputValues, markerName: '', markerImageFile: '' });
        setDisplayImageUrl('img/IMG-default.png');
      }
    }

    setMarkerNameError(validationResult.errors.markerNameError);
    setMarkerImageFileError(validationResult.errors.markerImageFileError);
  };

  const downloadRecord = () => {
    const data = {
      markerName: inputValues.markerName,
      markerImageFile: inputValues.markerImageFile,
      uplaodStatus: uploadStatus,
      selectedMarker,
      markers,
    };

    const validationResult = validate(errors, markerValidationDetails, data);

    if (!validationResult.isError) {
      const node = imageBoxRef;
      console.log(node);
      domtoimage.toPng(node.current).then((dataUrl) => {
        const link = document.createElement('a');
        link.download = `${inputValues.markerName}.png`;
        link.href = dataUrl;
        link.click();
      });
    }

    setMarkerNameError(validationResult.errors.markerNameError);
    setMarkerImageFileError(validationResult.errors.markerImageFileError);
  };

  const removeRecord = () => {
    setInputValues({ ...inputValues, markerName: '', markerImageFile: '' });
    setDisplayImageUrl('img/IMG-default.png');

    removeMarker(selectedMarker.id);
    getSelectedMarker({
      ...selectedMarker,
      isDeleted: true
    });
  };

  return (
    <Wrapper>
      <Inner>
        <ButtonGroup>
          <UploadButton
            status={uploadStatus}
            onClick={() => setUploadStatus(true)}
          >
            upload
          </UploadButton>
          <CustomButton
            status={uploadStatus}
            onClick={() => setUploadStatus(false)}
          >
            custom
          </CustomButton>
        </ButtonGroup>
        {uploadStatus ? (
          <ImageBox>
            <ImageWithoutMarker alt='' src={displayImageUrl} />
          </ImageBox>
        ) : (
          <AdditionalWrapper>
            <MarkerIconBox ref={imageBoxRef}>
              <MarkerIcon background={inputValues.color}>
                <ImageInsideMarker src={displayImageUrl} />
              </MarkerIcon>
            </MarkerIconBox>
          </AdditionalWrapper>
        )}

        <Form onSubmit={sendRecord}>
          <FormGroup>
            <LabelName htmlFor='markerName'>Name</LabelName>
            <Input
              type='text'
              name='markerName'
              value={inputValues.markerName}
              id='markerName'
              onChange={onChange}
            />
            {markerNameError && (
              <ErrorMessage>{markerNameError}</ErrorMessage>
            )}
          </FormGroup>
          {!uploadStatus && (
            <FormGroup>
              <LabelColor htmlFor='markerColor'>Color</LabelColor>
              <Input
                onChange={onChange}
                type='color'
                name='color'
                id='markerColor'
                value={inputValues.color}
                placeholder='color placeholder'
              />
            </FormGroup>
          )}
          <FormGroup>
            <LabelFile htmlFor='file'>
              <InputSpan>choose file</InputSpan>
              {displayImageUrl === 'img/IMG-default.png'
                ? 'Not file detected'
                : inputValues.markerImageFile === ''
                  ? `${inputValues.markerName}.png`
                  : inputValues.markerImageFile.name}
            </LabelFile>
            <FileInput
              data-testid='inputFile'
              type='file'
              id='file'
              name='markerImage'
              onChange={onChange}
              value=''
            />
            {markerImageFileError && (
              <ErrorMessage>{markerImageFileError}</ErrorMessage>
            )}
          </FormGroup>
          {uploadStatus ? (
            <FormGroup>
              <SubmitBtn>
                {selectedMarker.id && !selectedMarker.isDeleted
                  ? 'edit'
                  : 'upload'}
              </SubmitBtn>
              {selectedMarker.id && !selectedMarker.isDeleted ? (
                <RemoveBtn onClick={removeRecord} type='button'>
                  remove
                </RemoveBtn>
              ) : (
                ''
              )}
            </FormGroup>
          ) : (
            <FormGroup>
              <DownloadBtn onClick={downloadRecord} type='button'>
                download
              </DownloadBtn>
            </FormGroup>
          )}
        </Form>
      </Inner>
    </Wrapper>
  );
};

const mapDispatchToProps = {
  postMarker,
  removeMarker,
  editMarker,
  getSelectedMarker,
  fetchMarkers
};

const mapStateToProps = (state) => ({
  selectedMarker: state.marker.selectedMarker,
  markers: state.marker.markers
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MarkerCreator);

MarkerCreator.propTypes = {
  postMarker: PropTypes.func.isRequired,
  removeMarker: PropTypes.func.isRequired,
  editMarker: PropTypes.func.isRequired,
  getSelectedMarker: PropTypes.func.isRequired
};

MarkerCreator.defaultProps = {
  selectedMarker: {}
};
