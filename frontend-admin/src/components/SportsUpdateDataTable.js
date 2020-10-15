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
import { formatLetters, isFeatured  } from '../utils';

const columns = [
  { id: 'caption', label: 'Caption'},
  { id: 'featured', label: 'Featured'},
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

const GET_POSTS = gql`
  query GET_POSTS {
    getPosts {
      id
      caption
      isFeatured
      category
    }
  }
`;

const DELETE_POST = gql`
  mutation DELETE_POST($postId: ID!) {
    deletePost(postId: $postId)
  }
`;

const createData = (caption, featured, category, id) => {
  return {caption, featured, category, id};
}

const SportsUpdateDataTable = ({ posts, loading }) => {

  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [deletePost] = useMutation(DELETE_POST, { onCompleted: () => {
    toast.success("Deleted Successfully!", { autoClose: 3000, className: 'toastify-success' });
  }});
  let rows;

  if (!loading && posts[0] !== undefined) {    
    rows = posts.map(post => {
      return createData(post.caption, isFeatured(post), formatLetters(post.category), post.id)
    });
  } else {
    rows = [];
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
      { loading ? <LinearProgress /> : null }
      <Paper className={classes.root}>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column, index) => (
                  <TableCell
                    key={index}
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
              {!loading ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                const postId = row.id;

                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                    {columns.map((column, index) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={index} align={column.align}>
                          {column.format && typeof value === 'number' ? column.format(value) : value}
                          {column.id === "update" && (
                            <Link to={`/sportsupdate/${postId}`}>
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
                              onClick={() => deletePost({
                                variables: { postId },
                                refetchQueries: [{ query: GET_POSTS }]
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
              })
            : (
              <TableRow>  
                <TableCell colSpan={5}>
                  <TableSkeleton />
                </TableCell>
              </TableRow>
            )}
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
  }
});

export default SportsUpdateDataTable;
