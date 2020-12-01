export const errors = {
  markerNameError: '',
  markerImageFileError: ''
};

export const markerValidationDetails = (data) => {
  const {
    markerName,
    markerImageFile,
    selectedMarker,
    markers,
    uploadStatus
  } = data;

  return [
    {
      condition: markerName.length < 3,
      nameOfErrorProperty: 'markerNameError',
      messageError: 'Username needs to be atleast 3 characters long'
    },
    {
      condition: !/\.(png)$/i.test(markerImageFile.name) && markerImageFile,
      nameOfErrorProperty: 'markerImageFileError',
      messageError: 'Format must be .png'
    },
    {
      condition: !markerImageFile && !selectedMarker.id,
      nameOfErrorProperty: 'markerImageFileError',
      messageError: 'Input file cannot be empty'
    },
    {
      condition: !selectedMarker.name && uploadStatus && markers
        .some((marker) => marker.name === markerName),
      nameOfErrorProperty: 'markerNameError',
      messageError: 'This marker is already exist'
    }
  ];
};
