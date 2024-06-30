import React, { useContext, useEffect, useState } from "react";

const PageContext = React.createContext<any | null>(null);

export default function PageProvider(props: any) {
    const [page, setPage] = useState({});

    const setApi =(data:any)=>{
        setPage((prev: any) => ({ ...prev, data: data }));
    }
    const setData = async (api?: any) => {
        const data = await api();
        setPage((prev: any) => ({ ...prev, data: data }));
    }
    const context = {
        pagination: props.pagination instanceof Object ? props.pagination : null,
        functions: props.functions instanceof Function ? props.functions(page, setPage) : () => { },
        page,
        setPage,
        setApi
    }
    useEffect(() => {
        if (props.data instanceof Promise) {
            setApi(props.data);
        }
    }, [])

    return (
        <PageContext.Provider value={context}>
            {props.children}
        </PageContext.Provider>
    );
}

export const usePageContext = () => useContext(PageContext);