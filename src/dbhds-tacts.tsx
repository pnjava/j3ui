import React from "react";
import ReactDOMClient from "react-dom/client";
import singleSpaReact from "single-spa-react";
import Root from "./root.component";

const lifecycles = singleSpaReact({
  React,
  ReactDOMClient,
  rootComponent: Root,
  errorBoundary(err, info, props) {
    // Customize the root error boundary for your microfrontend here.
    console.log(err, info, props);
    return <h3>Oops! Unable to process your request.</h3>;
  },
});

export const { bootstrap, mount, unmount } = lifecycles;
