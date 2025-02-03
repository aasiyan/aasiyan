// LoadingSpinner.js
import React from "react";
import { ClipLoader } from "react-spinners";

const Loading = ({ loading, color = "#f4ce14", size = 50, width = 50 }) => (
  <>
    {loading && (
      <>
        <div className="loading-overlay"></div>
        <div className="loading-spinner">
          <ClipLoader
            loading={loading}
            size={size}
            color={color}
            css={{ borderWidth: `${width}px` }}
          />
        </div>
      </>
    )}
  </>
);

export default Loading;
