import React from "react";

const dimensions = {
  minHeight: "700px",
  // height: "100vh",
};

export const Layout = ({ children }) => {
  return (
    <div className="relative" style={dimensions}>
      <div
        className="bg-hero-pattern bg-cover bg-no-repeat bg-top  top-0 left-0 w-full z-0 fixed"
        style={{ height: "80vh" }}
      ></div>
      <div className=" relative z-50">{children}</div>
    </div>
  );
};
