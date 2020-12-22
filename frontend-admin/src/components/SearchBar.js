import React from 'react';
import { withRouter } from 'react-router-dom';
import { gql, useLazyQuery } from '@apollo/react-hooks';
import { makeStyles, fade } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import RefreshIcon from '@material-ui/icons/Refresh';
import { 
  useSetSportsUpdateSearchResult, 
  useSetSuperstarsSearchResult
} from '../hooks/AppContext';

const SEARCH_SUPERSTARS = gql` 
  query SEARCH_SUPERSTARS($keyword: String!) {
    searchSuperStars(keyword: $keyword) {
      id  
      fullname
      image
      dateOfBirth
      country
      category 
      bio
    }
  }
`;

const SEARCH_POSTS = gql` 
  query SEARCH_POSTS($keyword: String!) {
    searchPosts(keyword: $keyword) {
      id
      image
      caption
      description
      isFeatured
      category
    }
  }
`;

const SearchBar = ({ match }) => {
  const classes = useStyles();
  const setSportsUpdate = useSetSportsUpdateSearchResult();
  const setSuperstars = useSetSuperstarsSearchResult();

  const isSportsUpdate = match.path === '/';
  const [getQuery, { loading, data }] = useLazyQuery(isSportsUpdate ? SEARCH_POSTS : SEARCH_SUPERSTARS, { fetchPolicy: "network-only" });

  React.useEffect(() => {
    if ((loading && isSportsUpdate) || (!loading && data && isSportsUpdate)) {
      setSportsUpdate({ loading, data });
    } else {
      setSportsUpdate({ loading: false, data: [] })
    }
  
    if ((loading && !isSportsUpdate) || (!loading && data && !isSportsUpdate)) { 
      setSuperstars({ loading, data });
    } else {
      setSuperstars({ loading: false, data: [] })
    }
  }, [data, loading, isSportsUpdate, setSportsUpdate, setSuperstars])

  const onChange = event => {
    event.preventDefault();
    getQuery({
      variables: { keyword: event.target.value }
    })
  }

  function refreshPage() {
    window.location.reload();
  }

  return (
    <React.Fragment>
      <RefreshIcon  
        onClick={refreshPage} 
        fontSize="large" 
        color="secondary" 
        className={classes.refresh}
        titleAccess="Refresh"
      />
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon color="secondary" />
        </div>
        <InputBase
          placeholder="Search…"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          onChange={onChange}
          inputProps={{ 'aria-label': 'search' }}
        />
      </div>
    </React.Fragment>
  )
}

const useStyles = makeStyles((theme) => ({
  inputRoot: {
    color: 'white',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  refresh: {
    marginTop: 1,
    cursor: 'pointer'
  }
}))

export default withRouter(SearchBar);
