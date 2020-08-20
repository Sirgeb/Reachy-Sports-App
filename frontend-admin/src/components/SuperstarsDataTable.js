import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import Typography from '@material-ui/core/Typography';

const columns = [
  { id: 'fullname', label: 'Superstar Name'},
  { id: 'country', label: 'Country'},
  {
    id: 'category',
    label: 'Category',
    align: 'right',
  },
  {
    id: 'update',
    label: 'Update',
    align: 'right',
  },
  {
    id: 'delete',
    label: 'Delete',
    align: 'right',
  }
];

function createData(fullname, country, category) {
  return {fullname, country, category};
}

const rows = [
  createData('Hello world', 'Hello world', "Hello world"),
  createData('Hello world', 'Hello world', "Hello world"),
  createData('Hello world', 'Hello world', "Hello world"),
  createData('Hello world', 'Hello world', "Hello world"),
  createData('Hello world', 'Hello world', "Hello world"),
  createData('Hello world', 'Hello world', "Hello world"),
  createData('Hello world', 'Hello world', "Hello world"),
  createData('Hello world', 'Hello world', "Hello world"),
  createData('Hello world', 'Hello world', "Hello world")
];

const SuperstarsDataTable = () => {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  <Typography color="primary" variant="subtitle2">
                    {column.label}
                  </Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                  {columns.map((column) => {
                    const value = row[column.id];

                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                        {column.id === "update" && (
                          <Link to="/superstar/update">
                            <button 
                              style={{ backgroundColor: "#ffffff", border: "none" }}
                              className="btn"
                            >
                              <BorderColorIcon color="primary" />
                            </button>
                          </Link>
                        )}
                        {column.id === "delete" && (
                          <button 
                            onClick={() => alert(column.id)}
                            style={{ backgroundColor: "#ffffff", border: "none" }}
                            className="btn"
                          >
                            <DeleteForeverOutlinedIcon color="primary" />
                          </button>
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});

export default SuperstarsDataTable;
