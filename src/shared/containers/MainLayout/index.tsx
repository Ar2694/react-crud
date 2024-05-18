import { Container } from "@mui/material";

import "./styles.css";

interface Props {
    children?: React.ReactNode;
    className?: string;
}

export default function MainLayout(props: Props) {
    const className = props.className === "" ? "main-layout" : `main-layout ${props.className}`;

    return <Container className={className}>{props.children}</Container>;
}
