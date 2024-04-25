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
    const [state, setState] = useState({});
const test =props.events ??{}
const setEvents = props.events ? props.events : {};


   const init = ()=>{
    const eventss = Object.keys(setEvents).reduce((item) => {
       return item
     
      });
      setState((prev) => ({ ...prev, eventss})); 
   }

    const context = {
   
        state,
        users: [],
  
    }
   
    useEffect(()=>{
        init();

    },[])
    return (
        <PageContext.Provider value={context}>
            {props.children}
        </PageContext.Provider>
    );
}

export const usePageContext = () => useContext(PageContext);