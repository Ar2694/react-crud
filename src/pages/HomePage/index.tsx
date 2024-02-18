//Global
import { useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Container } from "@mui/material";
import DeleteModal from "./components/modals/DeleteModal";
import EditModal from "./components/modals/EditModal";
import CreateModal from "./components/modals/CreateModal";
import BaseLayout from "../../shared/containers/BaseLayout";
import { useUsersContext } from "../../contexts/UsersContext";

//Styles
import "./styles.css";

export function HomePage() {
  const { users } = useUsersContext();
  const [createModal, setCreateModal] = useState(false);
  const [editModal, setEditModal] = useState({ user: {}, show: false });
  const [deleteModal, setDeleteModal] = useState({ id: "", show: false });

  const handleCreate = () => {
    setCreateModal(!createModal)
  }

  const handleEdit =  async (user: any) => {
    setEditModal({ user: user, show: !editModal.show })
  }

  const handleDelete = (id: any) => {
    setDeleteModal({ id: id, show: !deleteModal.show })
  }

  return (
    <BaseLayout className="home-page">
      <Container className="button-container" disableGutters={true}>
        <Button variant="contained" onClick={handleCreate}>Create User</Button>
      </Container>
      <TableContainer component={Paper} >
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Email</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.length > 0
              ? users.map((user) => (
                <TableRow key={user._id}>
                  <TableCell>{user.firstname}</TableCell>
                  <TableCell>{user.lastname}</TableCell>
                  <TableCell>{user.phoneNumber}</TableCell>
                  <TableCell>{user.address}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell><Button onClick={() => {handleEdit(user)}}>Edit</Button></TableCell>
                  <TableCell><Button onClick={() => {handleDelete(user._id)}}>Delete</Button></TableCell>
                </TableRow>))
              : <TableRow>
                <TableCell colSpan={7} align="center">
                  No users
                </TableCell>
              </TableRow>
            }
          </TableBody>
        </Table>
      </TableContainer>
      <CreateModal createModal={createModal} setCreateModal={setCreateModal} />
      <DeleteModal deleteModal={deleteModal} setDeleteModal={setDeleteModal} />
      <EditModal editModal={editModal} setEditModal={setEditModal} />
    </BaseLayout>
  )
}
