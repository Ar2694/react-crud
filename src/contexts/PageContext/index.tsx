import React, { useContext, useReducer, useState } from "react";

// Props typefor UsersProviderProps
interface UsersProviderProps {
    children: React.ReactNode;
}

const PageContext = React.createContext<any | null>(null);

// create user provider
export default function PageProvider(props: any) {
    const [page, setPage] = useState({});
    
    const context = {
        functions: props.functions instanceof Function ? props.functions(page, setPage) : () => {},
        page,
        setPage
    }

    return (
        <PageContext.Provider value={context}>
            {props.children}
        </PageContext.Provider>
    );
}

export const usePageContext = () => useContext(PageContext);