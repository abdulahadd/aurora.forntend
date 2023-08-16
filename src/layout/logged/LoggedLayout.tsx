import React, {ReactNode} from 'react'

const LoggedLayout = (props: {children:ReactNode}) => {
    // Replace this with actual content for logged-in users
    return (
      <div>
        {props.children}
      </div>
    );
  };
  
  export default LoggedLayout;