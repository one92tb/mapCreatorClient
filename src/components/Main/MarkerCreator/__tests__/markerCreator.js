import '@testing-library/jest-dom/extend-expect';
import React from 'react'
import {render, fireEvent, screen} from '@testing-library/react'
import {MarkerCreator} from "../MarkerCreator";
import "jest-styled-components";
import {errors, markerValidationDetails} from "../../../../schema/markerSchema";
import validate from "../../../../validate";
const domtoimage = require("dom-to-image");

test("it should render mapCreator component", () => {
  const props = {
    postMarker: jest.fn(),
    removeMarker: jest.fn(),
    editMarker: jest.fn(),
    getSelectedMarker: jest.fn(),
    fetchMarkers: jest.fn(),
    selectedMarker: "",
    markers: [
      {
        id: 1,
        name: "square",
        icon: "square.png",
        userId: 1
      }, {
        id: 2,
        name: "park",
        icon: "park.png",
        userId: 1
      }, {
        id: 3,
        name: "restaurant",
        icon: "restaurant.png",
        userId: 1
      }
    ]
  }

  render(< MarkerCreator {
    ...props
  } />)
})

test("it should change Upload Marker for Download Marker in MarkerCreator component", () => {
  const props = {
    postMarker: jest.fn(),
    removeMarker: jest.fn(),
    editMarker: jest.fn(),
    getSelectedMarker: jest.fn(),
    fetchMarkers: jest.fn(),
    selectedMarker: "",
    markers: [
      {
        id: 1,
        name: "square",
        icon: "square.png",
        userId: 1
      }, {
        id: 2,
        name: "park",
        icon: "park.png",
        userId: 1
      }, {
        id: 3,
        name: "restaurant",
        icon: "restaurant.png",
        userId: 1
      }
    ]
  }

  render(< MarkerCreator {
    ...props
  } />)

  const uploadBtn = screen.queryByText("Upload Marker");
  const customBtn = screen.queryByText("Custom Marker");
  fireEvent.click(customBtn);
  expect(screen.getByLabelText('Color')).toBeInTheDocument();
  expect(uploadBtn).toHaveStyleRule("background", "#B2CFE7");
  expect(customBtn).toHaveStyleRule("background", "#00b8e6");
})

test("it should successfully upload marker", () => {

  const props = {
    postMarker: jest.fn(),
    removeMarker: jest.fn(),
    editMarker: jest.fn(),
    getSelectedMarker: jest.fn(),
    fetchMarkers: jest.fn(),
    selectedMarker: "",
    markers: [
      {
        id: 1,
        name: "square",
        icon: "square.png",
        userId: 1
      }, {
        id: 2,
        name: "park",
        icon: "park.png",
        userId: 1
      }, {
        id: 3,
        name: "restaurant",
        icon: "restaurant.png",
        userId: 1
      }
    ]
  }

  render(< MarkerCreator {
    ...props
  } />)

  const inputName = screen.getByLabelText("Name");
  //screen.debug(inputName);
  const inputFile = screen.getByTestId("inputFile")
  //screen.debug(inputFile);
  const submitBtn = screen.getByText("Upload new marker");
  //screen.debug(submitBtn);
  global.URL.createObjectURL = jest.fn(() => 'details');

  fireEvent.change(inputName, {
    target: {
      value: "pool"
    }
  })

  fireEvent.change(inputFile, {
    target: {
      files: [new File(['(⌐□_□)'], 'pool.png', {type: 'image/png'})]
    }
  })

  fireEvent.click(submitBtn);
  expect(props.postMarker).toHaveBeenCalledTimes(1);
})

test("it should successfully edit marker without image", () => {

  const props = {
    postMarker: jest.fn(),
    removeMarker: jest.fn(),
    editMarker: jest.fn(),
    getSelectedMarker: jest.fn(),
    fetchMarkers: jest.fn(),
    selectedMarker: {
      icon: "1588436373967.png",
      id: 1,
      name: "square",
      url: "http://localhost:8080/images/1588436373967.png",
      userId: 1
    },
    markers: [
      {
        id: 1,
        name: "square",
        icon: "square.png",
        userId: 1
      }, {
        id: 2,
        name: "park",
        icon: "park.png",
        userId: 1
      }, {
        id: 3,
        name: "restaurant",
        icon: "restaurant.png",
        userId: 1
      }
    ]
  }

  render(< MarkerCreator {
    ...props
  } />)

  const inputName = screen.getByLabelText("Name");
  const editBtn = screen.getByText("Edit Marker");

  fireEvent.change(inputName, {
    target: {
      value: "pool"
    }
  })

  fireEvent.click(editBtn);
  expect(props.editMarker).toHaveBeenCalledTimes(1);
  expect(props.editMarker).toHaveBeenCalledWith({
    name: "pool",
    icon: "1588436373967.png"
  }, 1)
})

test("it should successfully edit marker with image", () => {

  const props = {
    postMarker: jest.fn(),
    removeMarker: jest.fn(),
    editMarker: jest.fn(),
    getSelectedMarker: jest.fn(),
    fetchMarkers: jest.fn(),
    selectedMarker: {
      icon: "1588436373967.png",
      id: 1,
      name: "square",
      url: "http://localhost:8080/images/1588436373967.png",
      userId: 1
    },
    markers: [
      {
        id: 1,
        name: "square",
        icon: "square.png",
        userId: 1
      }, {
        id: 2,
        name: "park",
        icon: "park.png",
        userId: 1
      }, {
        id: 3,
        name: "restaurant",
        icon: "restaurant.png",
        userId: 1
      }
    ]
  }

  render(< MarkerCreator {
    ...props
  } />)

  const inputName = screen.getByLabelText("Name");
  const inputFile = screen.getByTestId("inputFile");
  const editBtn = screen.getByText("Edit Marker");

  fireEvent.change(inputName, {
    target: {
      value: "pool"
    }
  })

  fireEvent.change(inputFile, {
    target: {
      files: [new File(['(⌐□_□)'], 'pool.png', {type: 'image/png'})]
    }
  })

  /*  function FormDataMock() {
    this.append = jest.fn();
  }
  global.FormData = FormDataMock
  const formData = new FormData()
*/

  fireEvent.click(editBtn);
  expect(props.editMarker).toHaveBeenCalledTimes(1);
})

test("it should successfully remove marker", () => {

  const props = {
    postMarker: jest.fn(),
    removeMarker: jest.fn(),
    editMarker: jest.fn(),
    getSelectedMarker: jest.fn(),
    fetchMarkers: jest.fn(),
    selectedMarker: {
      icon: "1588436373967.png",
      id: 1,
      name: "square",
      url: "http://localhost:8080/images/1588436373967.png",
      userId: 1
    },
    markers: [
      {
        id: 1,
        name: "square",
        icon: "square.png",
        userId: 1
      }, {
        id: 2,
        name: "park",
        icon: "park.png",
        userId: 1
      }, {
        id: 3,
        name: "restaurant",
        icon: "restaurant.png",
        userId: 1
      }
    ]
  }

  render(< MarkerCreator {
    ...props
  } />)

  const inputName = screen.getByLabelText("Name");
  const inputFile = screen.getByTestId("inputFile");
  const removeBtn = screen.getByText("Remove Marker");

  fireEvent.click(removeBtn);
  expect(props.removeMarker).toHaveBeenCalledTimes(1);
  expect(props.removeMarker).toHaveBeenCalledWith(1);
  expect(props.getSelectedMarker).toHaveBeenCalledTimes(1);
  expect(props.getSelectedMarker).toHaveBeenCalledWith({
    icon: "1588436373967.png",
    id: 1,
    name: "square",
    url: "http://localhost:8080/images/1588436373967.png",
    userId: 1,
    isDeleted: true
  })
})

test("it should throw error (marker name has less than 3 characters) when marker is uploading", () => {

  const props = {
    postMarker: jest.fn(),
    removeMarker: jest.fn(),
    editMarker: jest.fn(),
    getSelectedMarker: jest.fn(),
    fetchMarkers: jest.fn(),
    selectedMarker: "",
    markers: [
      {
        id: 1,
        name: "square",
        icon: "square.png",
        userId: 1
      }, {
        id: 2,
        name: "park",
        icon: "park.png",
        userId: 1
      }, {
        id: 3,
        name: "restaurant",
        icon: "restaurant.png",
        userId: 1
      }
    ]
  }

  render(< MarkerCreator {
    ...props
  } />)

  const inputName = screen.getByLabelText("Name");
  const inputFile = screen.getByTestId("inputFile");
  const submitBtn = screen.getByText("Upload new marker");

  fireEvent.change(inputName, {
    target: {
      value: "po"
    }
  })

  fireEvent.change(inputFile, {
    target: {
      files: [new File(['(⌐□_□)'], 'pool.png', {type: 'image/png'})]
    }
  })

  fireEvent.click(submitBtn);
  expect(screen.getByText("Username needs to be atleast 3 characters long")).toBeTruthy();
})

test("it should throw error when marker is uploading without image", () => {

  const props = {
    postMarker: jest.fn(),
    removeMarker: jest.fn(),
    editMarker: jest.fn(),
    getSelectedMarker: jest.fn(),
    fetchMarkers: jest.fn(),
    selectedMarker: "",
    markers: [
      {
        id: 1,
        name: "square",
        icon: "square.png",
        userId: 1
      }, {
        id: 2,
        name: "park",
        icon: "park.png",
        userId: 1
      }, {
        id: 3,
        name: "restaurant",
        icon: "restaurant.png",
        userId: 1
      }
    ]
  }

  render(< MarkerCreator {
    ...props
  } />)

  const inputName = screen.getByLabelText("Name");
  const inputFile = screen.getByTestId("inputFile");
  const submitBtn = screen.getByText("Upload new marker");

  fireEvent.change(inputName, {
    target: {
      value: "pool"
    }
  })

  fireEvent.click(submitBtn);
  expect(screen.getByText("Input file cannot be empty")).toBeTruthy();
})

test("it should throw error when marker is uploading with wrong image format (not png format)", () => {

  const props = {
    postMarker: jest.fn(),
    removeMarker: jest.fn(),
    editMarker: jest.fn(),
    getSelectedMarker: jest.fn(),
    fetchMarkers: jest.fn(),
    selectedMarker: "",
    markers: [
      {
        id: 1,
        name: "square",
        icon: "square.png",
        userId: 1
      }, {
        id: 2,
        name: "park",
        icon: "park.png",
        userId: 1
      }, {
        id: 3,
        name: "restaurant",
        icon: "restaurant.png",
        userId: 1
      }
    ]
  }

  render(< MarkerCreator {
    ...props
  } />)

  const inputName = screen.getByLabelText("Name");
  const inputFile = screen.getByTestId("inputFile");
  const submitBtn = screen.getByText("Upload new marker");

  fireEvent.change(inputName, {
    target: {
      value: "pool"
    }
  })

  fireEvent.change(inputFile, {
    target: {
      files: [new File(['(⌐□_□)'], 'pool.jpeg', {type: 'image/jpeg'})]
    }
  })

  fireEvent.click(submitBtn);
  expect(screen.getByText("Format must be .png")).toBeTruthy();
})

test("it should successfully download marker", () => {

  const props = {
    postMarker: jest.fn(),
    removeMarker: jest.fn(),
    editMarker: jest.fn(),
    getSelectedMarker: jest.fn(),
    fetchMarkers: jest.fn(),
    selectedMarker: "",
    markers: [
      {
        id: 1,
        name: "square",
        icon: "square.png",
        userId: 1
      }, {
        id: 2,
        name: "park",
        icon: "park.png",
        userId: 1
      }, {
        id: 3,
        name: "restaurant",
        icon: "restaurant.png",
        userId: 1
      }
    ]
  }

  render(< MarkerCreator {
    ...props
  } />)

  const inputName = screen.getByLabelText("Name");
  const inputFile = screen.getByTestId("inputFile");
  const customBtn = screen.queryByText("Custom Marker");

  fireEvent.click(customBtn);

  fireEvent.change(inputName, {
    target: {
      value: "pool"
    }
  })

  fireEvent.change(inputFile, {
    target: {
      files: [new File(['(⌐□_□)'], 'pool.png', {type: 'image/png'})]
    }
  })

  const downloadBtn = screen.queryByText("Download");

  domtoimage.toPng = jest.fn(arg => {
    let promise = new Promise((resolve, reject) => {
      resolve("myblob");
    });
    return promise;
  });

  fireEvent.click(downloadBtn);
  expect(domtoimage.toPng).toHaveBeenCalledTimes(1);
})
