import { Button, Container, makeStyles, Paper, TextField } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Alert } from '@material-ui/lab';
//
import { login, register } from '../actions/authActions';
//
const useStyles = makeStyles((theme) => {
  return {
    form: {
      padding: theme.spacing(2),
      '& > :not(:last-child)': {
        marginBottom: theme.spacing(2),
      },
    },
  };
});
//
const Auth = () => {
  const classes = useStyles();
  const [alertMessage, setAlertMessage] = useState(null);
  const history = useHistory();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const handleInputsChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const [isRegister, setIsRegister] = useState(false);
  useEffect(() => {
    setFormData({ firstName: '', lastName: '', email: '', password: '', confirmPassword: '' });
  }, [isRegister]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setAlertMessage(null);
    if (isRegister) {
      if (formData.password === formData.confirmPassword) {
        const data = {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          password: formData.password,
        };
        dispatch(register(data, history));
      } else {
        setAlertMessage('passwords do not match');
      }
    } else {
      const data = { email: formData.email, password: formData.password };
      dispatch(login(data, history));
    }
  };
  return (
    <Container maxWidth='xs' component='main'>
      <Paper elevation={10}>
        <form className={classes.form} onSubmit={handleSubmit}>
          {isRegister && (
            <>
              <TextField
                value={formData.firstName}
                onChange={handleInputsChange}
                name='firstName'
                label='First Name'
                variant='outlined'
                fullWidth
                required
              />
              <TextField
                value={formData.lastName}
                onChange={handleInputsChange}
                name='lastName'
                label='Last Name'
                variant='outlined'
                fullWidth
                required
              />
            </>
          )}
          <TextField
            value={formData.email}
            onChange={handleInputsChange}
            name='email'
            fullWidth
            required
            label='Email'
            variant='outlined'
          />
          <TextField
            value={formData.password}
            onChange={handleInputsChange}
            name='password'
            fullWidth
            required
            type='password'
            label='Password'
            variant='outlined'
          />
          {isRegister && (
            <TextField
              value={formData.confirmPassword}
              onChange={handleInputsChange}
              name='confirmPassword'
              fullWidth
              required
              type='password'
              label='Confirm Password'
              variant='outlined'
            />
          )}
          <Button type='submit' fullWidth color='primary' variant='contained'>
            {isRegister ? 'Create new Account' : 'Log In'}
          </Button>
          <Button variant='outlined' color='primary' onClick={() => setIsRegister((prev) => !prev)}>
            {isRegister ? 'Already have an account ? Login' : 'Dont have an account ? Register'}
          </Button>
        </form>
      </Paper>
      {alertMessage && <Alert severity='error'>{alertMessage}</Alert>}
    </Container>
  );
};

export default Auth;
