import { useState } from "react";
import { Button, Grid, TextField } from "@mui/material";

import BaseLayout from "../../shared/containers/BaseLayout";
import UsersTable from "./components/Tables/UserTable";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import UserService from "../../api/services/UserService";
import PageProvider, { usePageContext } from "../../contexts/PageContext";

//Styles
import "./styles.css";
import CreateModal from "./components/modals/CreateModal";

export function HomePage() {

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

function Home(props: any) {
  const { functions } = usePageContext();
  const { searchUsers } = functions;
  const [createModal, setCreateModal] = useState(false);
  const isAuthenticated = useIsAuthenticated();

  const handleCreate = () => {
    setCreateModal(!createModal)
  }

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