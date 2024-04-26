import { useCallback, useEffect, useState } from "react";
import { Button, Grid, TextField } from "@mui/material";
import CreateModal from "./components/modals/CreateModal";
import BaseLayout from "../../shared/containers/BaseLayout";
import UsersProvider, { useUsersContext } from "../../contexts/UsersContext";
import { User } from "../../interfaces/UserInterface";
import UsersTable from "./components/Tables/UserTable";

//Styles
import "./styles.css";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";

import UserService from "../../api/services/UserService";
import UsersContext from "../../contexts/UsersContext";
import PageProvider, { usePageContext } from "../../contexts/PageContext";


export function HomePage() {

  const functions = (page: any, setPage: any) => ({
    getUsers: async () => {
      const users: Promise<any> = await UserService.init().getUsers()
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
  const {functions, page} = usePageContext();
  const {updateUsers, getUsers} = functions;

const users = page.users ?? [];
  const [createModal, setCreateModal] = useState(false);
  const [searched, setSearched] = useState("");

  const isAuthenticated = useIsAuthenticated();

  const handleCreate = () => {
    setCreateModal(!createModal)
  }

  const handleSearch = (evt: any) => {
    const value = evt.target.value;
    setSearched(value);
  }

  const query = (users: User[]) => {


     const search = users.filter((user) => {
      return !searched.length ||
        user.firstname.toString().toLowerCase().includes(searched.toString().toLowerCase()) ||
        user.lastname.toString().toLowerCase().includes(searched.toString().toLowerCase()) ||
        user.email.toString().toLowerCase().includes(searched.toString().toLowerCase()) ||
        user.address.toString().toLowerCase().includes(searched.toString().toLowerCase()) ||
        user.phoneNumber.toString().toLowerCase().includes(searched.toString().toLowerCase());
    })
    console.log(users, "query", searched,  search)
    return search;
  }
  return (
    <BaseLayout className="home-page">
      <Grid container alignItems="center" justifyContent="center" className="search-container">
        <Grid item xs>
          <TextField placeholder="Search" onChange={handleSearch} variant="outlined" fullWidth className="search-input" />
        </Grid>
        {isAuthenticated ? <Grid item xs={2} className="button-container">
          <Button variant="contained" color="secondary" onClick={handleCreate}>Create User</Button>
        </Grid> : null}

      </Grid>
      <UsersTable data={query(users)} />
      <CreateModal createModal={createModal} setCreateModal={setCreateModal} />
    </BaseLayout>
  )
}