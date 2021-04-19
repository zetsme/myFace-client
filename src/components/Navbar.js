import { Link as RouterLink, useHistory } from 'react-router-dom';
import { Face } from '@material-ui/icons';
import {
  AppBar,
  Avatar,
  Button,
  Container,
  makeStyles,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { LOGOUT } from '../constants/actionTypes';

const useStyles = makeStyles((theme) => {
  return {
    appBar: {
      marginBottom: theme.spacing(4),
    },
    toolBar: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
    },
    title: {
      textTransform: 'none',
      marginLeft: theme.spacing(1),
    },
    infoContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: theme.spacing(2),
    },
  };
});

const Navbar = () => {
  const auth = useSelector((state) => state.auth);
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const logout = () => {
    dispatch({ type: LOGOUT });
    history.push('/');
  };
  return (
    <AppBar elevation={4} position='static' className={classes.appBar}>
      <Container>
        <Toolbar disableGutters className={classes.toolBar}>
          <Button component={RouterLink} to='/' variant='outlined' color='inherit'>
            <Face fontSize='large' />
            <Typography className={classes.title} variant='h4'>
              myFace
            </Typography>
          </Button>
          {auth?.result ? (
            <div className={classes.infoContainer}>
              <Avatar color='secondary' children={auth.result.name.charAt(0).toUpperCase()} />
              <Typography variant='h5'>{auth.result.name}</Typography>
              <Button variant='contained' color='inherit' onClick={logout}>
                <Typography color='textPrimary'>Log Out</Typography>
              </Button>
            </div>
          ) : (
            <Button variant='contained' color='inherit' component={RouterLink} to='/auth'>
              <Typography color='textPrimary'>Login</Typography>
            </Button>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
