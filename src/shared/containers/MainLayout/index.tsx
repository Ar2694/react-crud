import { Container } from "@mui/material";

export default function MainLayout(props: any) {
    const className = props.className === "" ? "main-layout" : `main-layout ${props.className}`;

    return <Container sx={{marginTop: 10}} className={className}>{props.children}</Container>;
}
