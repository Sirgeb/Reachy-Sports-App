import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme, fade } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import RsLogo from '../assets/rs-logo-with-name.png';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import SignoutModal from './SignoutModal';

const drawerWidth = 240;

const Dashboard = (props) => {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [Open, setOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const drawer = (
    <div>
      <div className={classes.logoContainer}>
        <img src={RsLogo} alt="Reachy Sports" className={classes.logo} />
      </div>
      <List>
        <Link to="/">
          <ListItem button>
            <ListItemText primary="Sports Update" />
          </ListItem>
        </Link>
        <Divider />
        <Link to="/superstars">
          <ListItem button>
            <ListItemText primary="Superstars Profile" />
          </ListItem>
        <Divider />
        </Link>
        <ListItem button onClick={handleOpen}>
          <ListItemText primary="Sign Out" />
        </ListItem>
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;
  const sportsUpdate = props.route === "sportsUpdate";
  const superstars = props.route === "superstars";

  return (
    <div className={classes.root}>
      <SignoutModal 
        open={Open}
        handleClose={handleClose}
      />
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon color="secondary" />
          </IconButton>
          <div className={classes.appBarContentWrapper}>
            <Typography variant="h6" noWrap color="secondary">
              {props.title}
            </Typography>
            {
              (sportsUpdate || superstars) && (
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <Link to={sportsUpdate ? "/sportsupdate/add" : "/superstars/add"}>
                    <AddCircleIcon 
                      style={{ height: 30, width: 30, marginTop: "4px", marginRight: "5px" }} 
                      color="secondary" 
                      className="btn"
                    />
                  </Link>
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
                      inputProps={{ 'aria-label': 'search' }}
                    />
                  </div>
                </div>
              )
            }
          </div>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {props.children}
      </main>
    </div>
  );
}

Dashboard.propTypes = {
  window: PropTypes.func,
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    }
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  appBarContentWrapper: {
    display: "flex", 
    flexDirection: "row", 
    justifyContent: "space-between", 
    alignItems: "center", 
    width: "100%"
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: {
    ...theme.mixins.toolbar
  },
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  logo: {
    height: 100,
    width: 130
  },
  logoContainer: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F58634',
    height: 120
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
  }
}));

export default Dashboard;
