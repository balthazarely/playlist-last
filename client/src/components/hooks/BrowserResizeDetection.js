import React, { useEffect } from "react";
import { useResizeDetector } from "react-resize-detector";
import GlobalContext from "../../context/appContext";

const BrowserResizeDetection = () => {
  const { width, ref } = useResizeDetector();
  const { closeSidenav } = React.useContext(GlobalContext);

  useEffect(() => {
    closeSidenav();
  }, [width]);

  return <div ref={ref}></div>;
};

export default BrowserResizeDetection;
