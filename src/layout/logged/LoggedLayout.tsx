import React, { ReactNode } from "react";

const LoggedLayout = (props: { children: ReactNode }) => {
  return <div>{props.children}</div>;
};

export default LoggedLayout;
