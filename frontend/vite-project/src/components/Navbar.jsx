// Navbar.jsx
import React, { useState, useEffect } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import BookIcon from '@mui/icons-material/Book';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import Button from '@mui/material/Button';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";

import Home from "../roots/Home.jsx";
import Recipes from '../roots/Recipes.jsx';
import MyRecipes from '../roots/MyRecipes.jsx';
import RecipeView from '../roots/RecipeView.jsx';
import Admin from '../roots/Admin.jsx';
import Login from './Login.jsx';
import Signup from './Signup.jsx';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  backgroundColor: "#2e6123",
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

const Navbar = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (user) {
        console.log('User signed in:', user.email);
        setEmail(user.email);
      } else {
        console.log('No user signed in');
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      if (email) {
        const db = getFirestore();
        const q = query(collection(db, 'users'), where('email', '==', email));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          console.log('User data:', doc.data());
          setIsAdmin(doc.data().isAdmin);
        });
      }
      setLoading(false);
    };
    fetchUserData();
  }, [email]);

  useEffect(() => {
    if (isAdmin) {
      navigate('/admin');
    }
  }, [isAdmin, navigate]);

  const handleLogout = async () => {
    const auth = getAuth();
    await signOut(auth);
    alert('Log out successfully');
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const renderContent = () => {
    if (location.pathname.split('/').length > 2) {
      switch (location.pathname.split('/')[1]) {
        case 'recipeView':
          return <RecipeView />;
        default:
          return null;
      }
    } else {
      switch (location.pathname) {
        case '/login':
          return <Login />;
        case '/signup':
          return <Signup />;
        case '/':
          return <Home />;
        case '/recipes':
          return <Recipes />;
        case '/myRecipes':
          return <MyRecipes />;
        case '/recipeView':
          return <RecipeView />;
        case '/admin':
          return <Admin />;
        default:
          return <Home />;
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Add a loading indicator
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <Typography variant="h3" noWrap component="div" style={{ marginBottom: '.75vh', marginTop: '.75vh' }}>
              Flavor Fusion
            </Typography>
            <img src="/websitelogo.png" alt="Recipe App Logo" style={{ marginRight: '8px', marginLeft: '12px', height: '55px' }} />
          </Box>
          {user ? (
            <Button
              onClick={handleLogout}
              variant="contained"
              sx={{
                backgroundColor: 'white',
                color: '#2e6123',
                '&:hover': {
                  backgroundColor: '#f5f5f5',
                },
              }}
            >
              Log out
            </Button>
          ) : (
            <>
              <Button
                component={Link}
                to="/login"
                variant="contained"
                sx={{
                  backgroundColor: 'white',
                  color: '#2e6123',
                  '&:hover': {
                    backgroundColor: '#f5f5f5',
                  },
                  mr: 1,
                }}
              >
                Login
              </Button>

              <Button
                component={Link}
                to="/signup"
                variant="contained"
                sx={{
                  backgroundColor: 'white',
                  color: '#2e6123',
                  '&:hover': {
                    backgroundColor: '#f5f5f5',
                  },
                }}
              >
                Sign up
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {isAdmin ? (
            <ListItem disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
                component={Link}
                to="/admin"
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <AdminPanelSettingsIcon />
                </ListItemIcon>
                <ListItemText primary="Admin Page" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ) : (
            <>
              <ListItem disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                  }}
                  component={Link}
                  to="/"
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    <HomeIcon />
                  </ListItemIcon>
                  <ListItemText primary="Home" sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                  }}
                  component={Link}
                  to="/recipes"
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    <RestaurantMenuIcon />
                  </ListItemIcon>
                  <ListItemText primary="Recipes" sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                  }}
                  component={Link}
                  to="/myRecipes"
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    <BookIcon />
                  </ListItemIcon>
                  <ListItemText primary="My Recipes" sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                  }}
                  component={Link}
                  to="/recipeView"
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    <VisibilityIcon />
                  </ListItemIcon>
                  <ListItemText primary="Recipe View" sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            </>
          )}
        </List>
      </Drawer>
      <Box style={{ background: "#f5f2f2" }} component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <div>{renderContent()}</div>
      </Box>
    </Box>
  );
};

export default Navbar;
