import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import { registerRequest } from '../../../api/auth';
import Iconify from '../../../components/iconify';
// store
import { authActions } from '../../../store';

// ----------------------------------------------------------------------

export default function RegisterForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleClick = async () => {
    if (firstName.length > 2 && lastName.length > 2 && email.length > 6 && password.length > 8) {
      const res = await registerRequest(firstName, lastName, email, password);

      if (res) {
        toast.success('Account created successfully', {
          autoClose: 2000,
        });
        dispatch(authActions.login());
        localStorage.setItem('token', res.token);
        navigate('/dashboard', { replace: true });
      }
    }
  };

  return (
    <>
      <Stack spacing={3}>
        <TextField
          name="firstName"
          label="First name"
          onChange={handleFirstNameChange}
          value={firstName}
          error={firstName.length < 2}
        />
        <TextField
          name="lastName"
          label="Last name"
          onChange={handleLastNameChange}
          value={lastName}
          error={lastName.length < 2}
        />
        <TextField name="email" label="Email address" onChange={handleEmailChange} value={email} error={email < 6} />
        <TextField
          name="password"
          label="Password"
          onChange={handlePasswordChange}
          value={password}
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
          error={password < 8}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <Checkbox name="remember" label="Remember me" />
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
        Register
      </LoadingButton>
    </>
  );
}
