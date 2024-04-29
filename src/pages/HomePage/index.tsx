import { useState } from "react";
import { Button, Grid, TextField } from "@mui/material";
import CreateModal from "./components/modals/CreateModal";
import BaseLayout from "../../shared/containers/BaseLayout";
import UsersTable from "./components/Tables/UserTable";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import UserService from "../../api/services/UserService";
import PageProvider, { usePageContext } from "../../contexts/PageContext";

//Styles
import "./styles.css";

export function HomePage() {

  const functions = (page: any, setPage: any) => ({
    searchUsers: async (evt: any) => {
      const search = evt.target.value;
      const users = await UserService.init().searchUsers(search);
      setPage((prev: any) => ({ ...prev, users }));
    },

    getUsers: async () => {
      const users = await UserService.init().getUsers();
      console.log(users)
      setPage((prev: any) => ({ ...prev, users }));
    },

    updateUsers: async () => {
      console.log(page)
      const users: any = [];
      setPage((prev: any) => ({ ...prev, users }));
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
        {isAuthenticated ? <Grid item xs={2} className="button-container">
          <Button variant="contained" color="secondary" onClick={handleCreate}>Create User</Button>
        </Grid> : null}
      </Grid>
      <UsersTable />
      <CreateModal createModal={createModal} setCreateModal={setCreateModal} />
    </BaseLayout>
  )
}