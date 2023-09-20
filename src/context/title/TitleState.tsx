import React, { useState } from "react";
import { TitleContext } from "./titleContext";

const TitleState=(props: any)=>{


    const [title, setTitle]=useState<string | null>("Dashboard")
    return (
        <TitleContext.Provider value={{title, setTitle}}>
            {props.children}
        </TitleContext.Provider>
    )

}

export const useTitleState = () => {
    const titleContext = React.useContext(TitleContext);
    if (titleContext === undefined) {
      throw new Error('useOnboardingContext must be inside a TitleProvider');
    }
    return titleContext;
  };

export default TitleState;