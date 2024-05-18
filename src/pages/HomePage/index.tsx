import {  Grid, TextField } from "@mui/material";
import BaseLayout from "shared/containers/BaseLayout";
import UsersTable from "pages/HomePage/components/UserTable";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import UserService from "api/services/UserService";
import PageProvider, { usePageContext } from "contexts/PageContext";
import CreateModal from "shared/modals/CreateModal";

import "./styles.css";

export default function HomePage() {
  const functions = (_page: any, _setPage: any) => ({
    searchUsers: async (evt: any) => {
      const search = evt.target.value;
      const users = await UserService.init().searchUsers(search);
    _setPage((prev: any) => ({ ...prev, users }));
    },
    getUsers: async () => {
      const users = await UserService.init().getUsers();
      _setPage((prev: any) => ({ ...prev, users }));
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
      <Grid container alignItems="center" justifyContent="center" className="search-container">
        <Grid item xs>
          <TextField placeholder="Search" name="search" onChange={searchUsers} variant="outlined" fullWidth className="search-input" />
        </Grid>
        {isAuthenticated && <Grid item xs={2} className="button-container">
          <CreateModal />
        </Grid>}
      </Grid>
      <UsersTable />
    </BaseLayout>
  )
}