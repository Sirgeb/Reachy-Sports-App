import React from 'react';
import { Link } from 'react-router-dom';
import { gql, useMutation } from '@apollo/react-hooks';
import { toast } from 'react-toastify';
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
import TableSkeleton from './TableSkeleton';
import LinearProgress from './LinearProgress';
import { useSuperstarsSearchResult } from '../hooks/AppContext';
import { formatLetters } from '../utils';

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

const GET_SUPERSTARS = gql`
  query GET_SUPERSTARS {
    getSuperstars {
      id 
      fullname 
      country 
      category 
    }
  }
`;

const DELETE_SUPERSTAR = gql`
  mutation DELETE_SUPERSTAR($superStarId: ID!) {
    deleteSuperStar(superStarId: $superStarId) {
      id
    }
  }
`;

const createData = (fullname, country, category, id) => {
  return {fullname, country, category, id};
}

const SuperstarsDataTable = ({ superstars, loading }) => {
  const classes = useStyles();
  const { loading: isMakingSearch, data } = useSuperstarsSearchResult();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [searchResult, setSearchResult] = React.useState(undefined);
  const [deleteSuperStar, { loading: isBeingDeleted }] = useMutation(DELETE_SUPERSTAR, { onCompleted: () => {
    toast.success("Superstar Profile Deleted Successfully!", { autoClose: 3000, className: 'toastify-success' });
  }});

  React.useEffect(() => {
    if (
      data !== undefined && 
      data !== { data: { searchSuperStars: [] }, loading: false } && 
      data !== { data: { searchSuperStars: undefined }, loading: true } && 
      data !== { loading: false, data: []}
      ) {
      setSearchResult(data.searchSuperStars);
    }
  }, [data])

  let rows = superstars.map(superstar => {
    return createData(superstar.fullname, superstar.country, formatLetters(superstar.category), superstar.id)
  });
   
  if (searchResult !== undefined) {
    rows = searchResult.map(superstar => {
      return createData(superstar.fullname, superstar.country, formatLetters(superstar.category), superstar.id)
    });
  } 

  if (isBeingDeleted) {
    toast.info("Deleting Superstar Profile...", { autoClose: 3000 });
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <React.Fragment>
      { isMakingSearch || loading ? <LinearProgress /> : null }
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
              { !loading && !isMakingSearch ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                const superStarId = row.id;

                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                    {columns.map((column) => {
                      const value = row[column.id];

                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number' ? column.format(value) : value}
                          {column.id === "update" && (
                            <Link to={`/superstars/${superStarId}`}>
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
                              onClick={() => deleteSuperStar({
                                variables: { superStarId },
                                refetchQueries: [{ query: GET_SUPERSTARS }]
                              })}
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
              }) : isMakingSearch || loading ? 
              (
                <TableRow>  
                  <TableCell colSpan={5}>
                    <TableSkeleton />
                  </TableCell>
                </TableRow>
              ): null}
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
    </React.Fragment>
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
