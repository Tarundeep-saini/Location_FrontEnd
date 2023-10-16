import React from "react";
import Button from "../Shared/Button";

const Modal = (props) => {
  const {handleCloseWarning,ConfirmDelete}=props
  if (props.map) {
    return (
      <>
        <div className="fixed inset-0 bg-black opacity-50"></div>{" "}
        {/* Darkened background */}
        <div className="fixed inset-0 flex items-center justify-center z-50 rounded-xl ">
          <div className="bg-white w-5/12 rounded-lg shadow-md">
            <h2 className="text-4xl bg-yellow-300 font-bold text-center p-6 rounded-r-lg rounded-l-lg  mb-4">
              {props.address}
            </h2>
            <div className="p-6">
              <img
                src="https://www.howtogeek.com/thumbcache/2/200/763a8b04ce2f6bd2113c20cc516f02e7/wp-content/uploads/2019/06/img_5d0cef8cb09f1.png"
                className=" mb-4"
              />
              <div className="flex justify-end">
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  onClick={props.handleModalClose}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
  if (props.warning) {
    
    return (
      <>
        <div className="fixed inset-0 bg-black opacity-50"></div>{" "}
        {/* Darkened background */}
        <div className="fixed inset-0 flex items-center justify-center z-50 rounded-xl ">
          <div className="flex align-middle justify-center flex-col bg-white w-5/12 rounded-lg shadow-md p-6 ">
            <p className="flex justify-center" >Are you sure You want to delete this?</p>
            <div className="flex align-middle justify-evenly mt-4 ">
              <Button handleCloseWarning={ConfirmDelete} danger>YES</Button>
              <Button handleCloseWarning={handleCloseWarning} no >NO</Button>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default Modal;
