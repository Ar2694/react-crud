
import { BaseSyntheticEvent, useEffect, useState } from "react";

const paginationInit: Object = {
    sort: {},
    search: ""
}

export default function usePagination(_api?: any) {
    const [state, setState] = useState<any>({ pagination: paginationInit, data: {} });
    const [refreshKey, setRefreshKey] = useState(0);
    const api = _api ?? function () { };
 
    const setData = async (pagination?: any) => {
        const data = await api(pagination);
        setState((prev: any) => ({ ...prev, data: data }));
    }

    const sort = (_field: string) => {
        const field = _field;

        if (state.pagination.sort[field]) {
            const sort = state.pagination.sort[field] === 1 ? -1 : 1;
            setState((prev: any) => ({ ...prev, pagination: { ...prev.pagination, sort: { [field]: sort } } }));
        } else {
            setState((prev: any) => ({ ...prev, pagination: { ...prev.pagination, sort: { [field]: 1 } } }));
        }
    }

    const search = (_search: BaseSyntheticEvent) => {
        const search = _search.target.value;
        setState((prev: any) => ({ ...prev, pagination: { ...prev.pagination, search: search } }));
    }

    const refresh = () => {
        setRefreshKey(refreshKey + 1);
    }

    useEffect(() => {
        setData(state.pagination);
    }, [state.pagination, refreshKey])

    return {
        data: state.data,
        search,
        sort,
        refresh
    };

};
