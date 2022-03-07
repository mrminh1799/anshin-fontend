import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import * as OrderService from "../../service/OrderService";



import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination
} from '@mui/material';
// components
import Page from '../../components/Page';
import Label from '../../components/Label';
import Scrollbar from '../../components/Scrollbar';
import Iconify from '../../components/Iconify';
import SearchNotFound from '../../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../../sections/@dashboard/user';
//
import USERLIST from '../../_mocks_/user';
import TableHeader from 'src/components/TableHeader';
import TableHeaderComponet from 'src/components/Table/TableHearComponent';
import * as toastHelper from "../../common/ToastHelper";
import { fDateTime } from 'src/utils/formatTime'


// ----------------------------------------------------------------------




const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'company', label: 'Company', alignRight: false },
  { id: 'role', label: 'Role', alignRight: false },
  { id: 'isVerified', label: 'Verified', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: '' }
];

const headerTable = [{ id: '1', label: 'Tên người dùng' }, { id: '2', label: 'Đia chỉ' },
{ id: '3', label: 'Số điện thoại' }, { id: '4', label: 'Thời gian' }, { id: '5', label: 'Tổng tiền' }, { id: '6', label: 'Trạng thái' }]

// ----------------------------------------------------------------------

//Phân trang/////////////////////

export default function OrderManager() {
  const [listOrder, setListOrder] = useState([]);

  useEffect(() => {

    OrderService.getAllOderForAdmin().
      then((response) => {
        // console.log("đây là data order gửi về: ", response.data);
        setListOrder(response.data)
      })

  }, [])




  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - listOrder.length) : 0;



  return (

    <Page title="User | Minimal-UI">
      
      <Container>

        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            User
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="#"
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            New User
          </Button>
        </Stack>

        {/* <Card>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  headLabel={TABLE_HEAD}
                  rowCount={USERLIST.length}
                />
                <TableBody>
                  {USERLIST.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const { id, name, role, status, company, avatarUrl, isVerified } = row;
                      return (
                        <TableRow>

                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <Avatar alt={name} src={avatarUrl} />
                              <Typography variant="subtitle2" noWrap>
                                {name}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell align="left">{company}</TableCell>
                          <TableCell align="left">{role}</TableCell>

                          <TableCell align="left">
                            <Label
                              variant="ghost"
                              color={(status === 'banned' && 'error') || 'success'}
                            >
                              {sentenceCase(status)}
                            </Label>
                          </TableCell>

                          <TableCell align="right">
                            <UserMoreMenu />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={USERLIST.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card> */}

        ------------------
        <Card>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <TableHeaderComponet headLabel={headerTable} />
                <TableBody>
                  {
                    listOrder.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row) => {

                        return (
                          <TableRow>

                            <TableCell component="th" scope="row" padding="none">

                              <Typography variant="subtitle2" noWrap>
                                {row.fullName}
                              </Typography>
                            </TableCell>
                            <TableCell align="left">{row.phoneNumber}</TableCell>
                            <TableCell align="left">{row.address}</TableCell>
                            <TableCell align="left">{row.sumPrice}</TableCell>
                            <TableCell align="left">{fDateTime(row.timeCreate)}</TableCell>
                            <TableCell align="left">
                              <Label
                                variant="ghost"
                                color={(row.status === 0 && 'error') || 'success'}
                              >
                                {row.status === 0 ? "Chưa xử lý" : "Đã xử lý"}

                              </Label>
                            </TableCell>

                            <TableCell align="right">
                              <UserMoreMenu />
                            </TableCell>
                          </TableRow>

                        );
                      })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

              </Table>
            </TableContainer>
          </Scrollbar>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={listOrder.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />

        </Card>

      </Container>
    </Page>
  );
}
