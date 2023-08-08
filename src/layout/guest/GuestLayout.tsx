import React, { ReactNode } from 'react'

const GuestLayout = (props: {children:ReactNode}) => {
    // Replace this with actual content for non-logged-in users
    return (
      <div>
       {props.children}
      </div>
    );
  };
  
  export default GuestLayout;