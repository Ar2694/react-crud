import UserService from "api/services/UserService";
import React, { useContext, useEffect, useState } from "react";

const PageContext = React.createContext<any | null>(null);

export default function PageProvider(props: any) {
    const [page, setPage] = useState({});

    const setData =(data:any)=>{
        setPage((prev: any) => ({ ...prev, data: data }));
    }
    const context = {
        functions: props.functions instanceof Function ? props.functions(page, setPage) : () => { },
        page,
        setPage,
        setData
    }
    useEffect(() => {
        if (props.data instanceof Promise) {
            (async () => {
                const data = await props.data;
                setData(data);
            })();
        }
    }, [])

    return (
        <PageContext.Provider value={context}>
            {props.children}
        </PageContext.Provider>
    );
}

export const usePageContext = () => useContext(PageContext);