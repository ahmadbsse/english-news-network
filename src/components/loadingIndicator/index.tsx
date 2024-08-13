import "./loader.scss";
import { Spinner } from "react-bootstrap";
import React from "react";

const LoaderView = ({ show }: { show: boolean }): React.ReactElement => {
  if (show) {
    return (
      <div className="site-loader-backdrop">
        <Spinner animation="grow" variant="primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  } else {
    return <></>;
  }
};

export default LoaderView;
