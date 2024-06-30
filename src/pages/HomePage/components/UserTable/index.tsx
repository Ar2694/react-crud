import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteModal from 'shared/modals/DeleteModal';
import EditModal from 'shared/modals/EditModal';
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated';
import { usePageContext } from 'contexts/PageContext';
import SwapVertIcon from '@mui/icons-material/SwapVert';

import sx from "./sx";

export default function UsersTable(_props: any) {

  const { page, pagination } = usePageContext();
  const { data, sort } = pagination ?? {}

  const isAuthenticated = useIsAuthenticated();
  const users = data !== undefined && data.length > 0 ? data : [];

  return (
    <TableContainer sx={sx} component={Paper} >
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>First Name <SwapVertIcon className="sort-icon" onClick={() => sort("firstname")} /></TableCell>
            <TableCell>Last Name <SwapVertIcon className="sort-icon" onClick={() => sort("lastname")}/></TableCell>
            <TableCell>Phone Number <SwapVertIcon className="sort-icon" onClick={() => sort("phoneNumber")}/></TableCell>
            <TableCell>Address <SwapVertIcon className="sort-icon" onClick={() => sort("address")}/></TableCell>
            <TableCell>Email <SwapVertIcon className="sort-icon" onClick={() => sort("email")}/></TableCell>
            {isAuthenticated &&
              <>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </>
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
                {isAuthenticated &&
                  <>
                    <TableCell><EditModal user={user} /></TableCell>
                    <TableCell><DeleteModal id={user._id} /></TableCell>
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
