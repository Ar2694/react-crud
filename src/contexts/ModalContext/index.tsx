import { Button } from "@mui/material";
import React, { useContext, useState, cloneElement } from "react";

const ModalContext = React.createContext<any | null>(null);

export default function ModalProvider(props: any) {
    const [modal, setModal] = useState(false);
    const [state, setState] = useState("");

    const init = {
        functions: props.functions instanceof Function ? props.functions(state, setState) : {},
        close: () => setModal(false),
        open: () => setModal(true),
        toggle: () => setModal(!modal),
        modal,
        state,
    }

    const context = {
        ...init
    }

    return (
        <>
            {modal &&
             <ModalContext.Provider value={context}>
                    {props.children}
                </ModalContext.Provider>}
            {props.button
                    ? React.cloneElement(props.button, { onClick: context.open })
                    : <Button variant="contained" onClick={context.open}>Open</Button>}
        </>

    );
}

export const useModalContext = () => useContext(ModalContext);