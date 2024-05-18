import { Container } from "@mui/material";
import MainLayout from "shared/containers/MainLayout";
import Navbar from "shared/ui/NavBar";


export default function BaseLayout(props: any) {
    const className = props.className ?? "";

    return (
        <Container className="base-layout" disableGutters={true} maxWidth={false}>
            <Navbar />
            <MainLayout className={className}>
                {props.children}
            </MainLayout>
        </Container>
    )
}
