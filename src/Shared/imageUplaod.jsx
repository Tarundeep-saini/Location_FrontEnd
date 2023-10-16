import React, { useEffect, useRef, useState } from "react";
import Button from "./Button";

const ImageUpload = (props) => {
  const [file, setFile] = useState();
  const [previewURL, setPreviewURL] = useState();
  const [isValid, setIsVaild] = useState(false);

  const filePickerRef = useRef();

  useEffect(() => {
    if(!file){
        return
    }
    const fileReader=new FileReader()
    fileReader.onload=()=>{
      setPreviewURL(fileReader.result)
    }
    fileReader.readAsDataURL(file)
  }, [file]);

  const pickedHandler = (event) => {
    let pickedFile;
    let fileIsValid = isValid;
    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      setFile(pickedFile);
      setIsVaild(true);
      fileIsValid = true;
    } else {
      setIsVaild(false);
      fileIsValid = false;
    }
    props.onInput(props.id, pickedFile, fileIsValid);
  };

  const pickImageHandler = () => {
    filePickerRef.current.click();
  };

  return (
    <div className="form-control ">
      <input
        id={props.id}
        className="none" // Hide the input element using Tailwind CSS class
        style={{ display: "none" }}
        type="file"
        accept=".jpg,.png,.jpeg"
        onChange={pickedHandler}
        ref={filePickerRef}
      />
      <div
        className={`image-upload  ${props.center ? "center" : ""} mt-4`} // Added Tailwind CSS classes
      >
        <div className="flex flex-col items-center justify-center">
          {previewURL && <img
            src={previewURL}
            alt="Preview"
            className=" w-40 h-40 object-cover mx-auto border border-gray-500"
          />}
          {!previewURL && <p>Please pick a image.</p>}
          <Button
            type="button"
            onClick={pickImageHandler}
            className="mt-2 bg-blue-500 text-white px-4 py-2 w-3/4 rounded"
          >
            PICK IMAGE
          </Button>
        </div>
      </div>
      {!isValid && <p> {props.errorText} </p>}
    </div>
  );
};

export default ImageUpload;
