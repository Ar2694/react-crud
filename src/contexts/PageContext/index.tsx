import React, { useContext, useEffect, useState } from "react";
import UserService from "../api/services/UserService";
import { User } from "../interfaces/UserInterface";

// Props typefor UsersProviderProps
interface UsersProviderProps {
    children: React.ReactNode;
}

const PageContext = React.createContext<any | null>(null);

// create user provider
export default function PageProvider(props:any) {
    const [state, setPageState] = useState({});



   const init = ()=>{
    const events = props.events instanceof Object ? props.events  : {};

      const init ={
        useState: [state, setPageState],
        ...events
    }
    return init;

   }

    const context = {
         ...init()
    }
  
    return (
        <PageContext.Provider value={context}>
            {props.children}
        </PageContext.Provider>
    );
}

export const usePageContext = () => useContext(PageContext);