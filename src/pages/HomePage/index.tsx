import { Grid, TextField } from "@mui/material";
import BaseLayout from "shared/containers/BaseLayout";
import UsersTable from "pages/HomePage/components/UserTable";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import UserService from "api/services/UserService";
import PageProvider, { usePageContext } from "contexts/PageContext";
import CreateModal from "shared/modals/CreateModal";
import usePagination from "shared/hooks/usePagination";

export default function HomePage() {
  const pagination = usePagination(UserService.getUsers);
  
  return (
    <PageProvider pagination={pagination} >
      <Home />
    </PageProvider>
  )
}

function Home(_props: any) {
  const { pagination } = usePageContext();
  const { search } = pagination ?? {}
  const isAuthenticated = useIsAuthenticated();

  return (
    <BaseLayout className="home-page">
      <Grid sx={{ alignItems: "center", marginBottom: 2 }} container spacing={2}>
        <Grid item xs={12} sm>
          <TextField placeholder="Search" name="search" onChange={search} variant="outlined" fullWidth />
        </Grid>
        {isAuthenticated &&
          <Grid item xs={12} sm="auto">
            <CreateModal />
          </Grid>}
      </Grid>
      <UsersTable />
    </BaseLayout>
  )
}