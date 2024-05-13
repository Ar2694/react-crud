import React, { useContext, useState } from "react";

const DialogContext = React.createContext<any | null>(null);

export default function DialogProvider(props: any) {
    const [dialog, setDialog] = useState(true);
    const [state, setState] = useState({});
    
    const context = {
        functions: props.functions instanceof Function ? props.functions(state, setState) : {},
        close: () => setDialog(false),
        open: () => setDialog(true),
        toggle: () => setDialog(!dialog),
        dialog,
        state
    }

    return (
        <>
            {dialog &&
             <DialogContext.Provider value={context}>
                {props.children}
            </DialogContext.Provider>}
        </>
    );
}

export const useDialogContext = () => useContext(DialogContext);