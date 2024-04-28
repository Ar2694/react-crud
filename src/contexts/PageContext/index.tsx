import React, { useContext, useState } from "react";

// Props typefor UsersProviderProps
interface UsersProviderProps {
    children: React.ReactNode;
}

const PageContext = React.createContext<any | null>(null);

// create user provider
export default function PageProvider(props: any) {
    const [page, setPage] = useState({});

    const init = (page: any, setPage: any) => ({
        functions: props.functions instanceof Function ? props.functions(page, setPage) : () => {},
        page,
        setPage
    })

    const context = {
        ...init(page, setPage)
    }

    return (
        <PageContext.Provider value={context}>
            {props.children}
        </PageContext.Provider>
    );
}

export const usePageContext = () => useContext(PageContext);