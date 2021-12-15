import React from "react";
import ContentLoader from "react-content-loader";

export const CardLoader = () => {
  return (
    <ContentLoader
      speed={1}
      width={476}
      height={55}
      viewBox="0 0 476 55"
      backgroundColor="red"
      foregroundColor="#ecebeb"
    >
      <rect x="52" y="9" rx="3" ry="3" width="380" height="6" />
      <circle cx="20" cy="20" r="20" />
      <rect x="53" y="25" rx="3" ry="3" width="380" height="6" />
    </ContentLoader>
  );
};
