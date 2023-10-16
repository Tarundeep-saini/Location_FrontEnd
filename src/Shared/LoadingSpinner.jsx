import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center mt-16 h-screen">
      <div className="border-t-4 border-blue-500 border-solid animate-spin rounded-full h-12 w-12"></div>
    </div>
  );
};

export default LoadingSpinner;
