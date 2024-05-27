import {  Grid, TextField } from "@mui/material";
import BaseLayout from "shared/containers/BaseLayout";
import UsersTable from "pages/HomePage/components/UserTable";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import UserService from "api/services/UserService";
import PageProvider, { usePageContext } from "contexts/PageContext";
import CreateModal from "shared/modals/CreateModal";

export default function HomePage() {
  const functions = (_page: any, setPage: any) => ({
    searchUsers: async (evt: any) => {
      const search = evt.target.value;
      const users = await UserService.init().searchUsers(search);
    setPage((prev: any) => ({ ...prev, users }));
    },
    getUsers: async () => {
      const users = await UserService.init().getUsers();
      setPage((prev: any) => ({ ...prev, users }));
    }
  })

  return (
    <PageProvider functions={functions}>
      <Home />
    </PageProvider>
  )
}

function Home(_props: any) {
  const { functions } = usePageContext();
  const { searchUsers } = functions;
  const isAuthenticated = useIsAuthenticated();

  return (
    <BaseLayout className="home-page">
      <Grid sx={{alignItems:"center", marginBottom: 2}} container spacing={2}>
        <Grid item xs={12} sm>
          <TextField placeholder="Search" name="search" onChange={searchUsers} variant="outlined" fullWidth/>
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