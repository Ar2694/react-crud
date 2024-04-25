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
import PageProvider from "../../contexts/PageContext";


export function HomePage() {

  // const { users } = useUsersContext();
  const [createModal, setCreateModal] = useState(false);
  const [searched, setSearched] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  
 const isAuthenticated = useIsAuthenticated();



  const test =  async() => {
    const getUser = await UserService.getUsers();
    setUsers(getUser)
  }

  const handleCreate = () => {
    setCreateModal(!createModal)
  }

  const handleSearch = (evt: any) => {
    const value = evt.target.value;
    setSearched(value);
  }

  const query = (users: User[]) => {
    return users.filter((user) => {
      return !searched.length ||
        user.firstname.toString().toLowerCase().includes(searched.toString().toLowerCase()) ||
        user.lastname.toString().toLowerCase().includes(searched.toString().toLowerCase()) ||
        user.email.toString().toLowerCase().includes(searched.toString().toLowerCase()) ||
        user.address.toString().toLowerCase().includes(searched.toString().toLowerCase()) ||
        user.phoneNumber.toString().toLowerCase().includes(searched.toString().toLowerCase());
    })
  }

  useEffect(()=>{
    test();
  },[])

const events ={
  test: (evt:any)=>{
    console.log(1)
    return true;
  },
  testTwo: ()=>{
    console.log(2)
    return true;
  }
}
 

  return (

    <PageProvider events={events}>
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
      <CreateModal createModal={createModal} setCreateModal={setCreateModal}/>
    </BaseLayout>
    </PageProvider>
   


  )
}
