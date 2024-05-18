import React, { useContext, useState } from "react";

const PageContext = React.createContext<any | null>(null);

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