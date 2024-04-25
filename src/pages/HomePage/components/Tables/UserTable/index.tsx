import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from "@mui/material";

import { useEffect, useState } from "react";
import DeleteModal from '../../modals/DeleteModal';
import EditModal from '../../modals/EditModal';
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated';
import { usePageContext } from '../../../../../contexts/PageContext';


export default function UsersTable(props: any) {
  const {state, getUsers} = usePageContext();
const users = getUsers;


 console.log(users)
  console.log(usePageContext())
  const data = props.data ?? [];
  const update = props.update;
  const [editModal, setEditModal] = useState({ user: {}, show: false, setUpdate: props.setUpdate });
  const [deleteModal, setDeleteModal] = useState({ id: "", show: false, setUpdate: props.setUpdate });
  const isAuthenticated = useIsAuthenticated();

  const handleEdit = async (user: any) => {
    setEditModal({ user: user, show: !editModal.show, setUpdate: props.setUpdate })
  }

  const handleDelete = (id: any) => {
    setDeleteModal({ id: id, show: !deleteModal.show, setUpdate: props.setUpdate})
  }
  useEffect(()=>{
    console.log(data, "data")
  },[update])

  return (
    <TableContainer component={Paper} >
      <Button >Edit</Button>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Phone Number</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Email</TableCell>

            {isAuthenticated ?
              <>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </>
              : ""
            }

          </TableRow>
        </TableHead>
        <TableBody>
          {users.length > 0
            ? users.map((user: any) => (
              <TableRow key={user._id}>
                <TableCell>{user.firstname}</TableCell>
                <TableCell>{user.lastname}</TableCell>
                <TableCell>{user.phoneNumber}</TableCell>
                <TableCell>{user.address}</TableCell>
                <TableCell>{user.email}</TableCell>
                {isAuthenticated?
                  <>
                    <TableCell><Button onClick={() => { handleEdit(user) }}>Edit</Button></TableCell>
                    <TableCell><Button onClick={() => { handleDelete(user._id) }}>Delete</Button></TableCell>
                  </>
                  : ""
                }

              </TableRow>))
            : <TableRow>
              <TableCell colSpan={7} align="center">
                No users
              </TableCell>
            </TableRow>
          }
        </TableBody>
      </Table>
      <DeleteModal deleteModal={deleteModal} setDeleteModal={setDeleteModal} />
      <EditModal editModal={editModal} setEditModal={setEditModal} />
    </TableContainer>
  )
}
