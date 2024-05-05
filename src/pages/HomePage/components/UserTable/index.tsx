import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect } from "react";
import DeleteModal from '../../../../shared/modals/DeleteModal';
import EditModal from '../../../../shared/modals/EditModal';
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated';
import { usePageContext } from '../../../../contexts/PageContext';


export default function UsersTable(_props: any) {
  const {functions, page} = usePageContext();
  const { getUsers} = functions;
  const data = page.users ?? [];
  const isAuthenticated = useIsAuthenticated();

  useEffect(()=>{
    getUsers();
  },[])

  return (
    <TableContainer component={Paper} >
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Phone Number</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Email</TableCell>
            {isAuthenticated &&
              <>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </>
            }

          </TableRow>
        </TableHead>
        <TableBody>
          {data.length > 0
            ? data.map((user: any) => (
              <TableRow key={user._id}>
                <TableCell>{user.firstname}</TableCell>
                <TableCell>{user.lastname}</TableCell>
                <TableCell>{user.phoneNumber}</TableCell>
                <TableCell>{user.address}</TableCell>
                <TableCell>{user.email}</TableCell>
                {isAuthenticated &&
                  <>
                    <TableCell><EditModal user={user} /></TableCell>
                    <TableCell><DeleteModal id={user._id}/></TableCell>
                  </>
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
    </TableContainer>
  )
}
