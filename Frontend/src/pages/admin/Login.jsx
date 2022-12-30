import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Linke from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {Link, useNavigate} from 'react-router-dom'
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import *as authService from '../../services/authService'
import { useDispatch } from 'react-redux';
import { setAdminToken } from '../../features/auth/adminAuthSlice';


const theme = createTheme();

export default function SignIn() {
  const dispatch = useDispatch();
	const navigate = useNavigate();

  //Admin login form schema
	const schema = yup.object().shape({	
		email: yup.string().email().required('Email is required'),	
		password: yup.string().min(3).required('Password is required'),
	});

	//setting schema
	const {register,handleSubmit,formState: { errors }} = useForm({
		resolver: yupResolver(schema)
	});

  //form on submit function
	const onSubmit = async (data) => {
		console.log(data);
		const  response = await authService.adminLogin(data)
    console.log("ithu")
		if(response){
      console.log(response)

			dispatch(setAdminToken({ token: response.token, admin: true }));
      
			navigate('/admin')
			
		}
	};

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
          <p>{errors.email?.message}</p>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              {...register('email')}
            />
             <p>{errors.password?.message}</p>
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              {...register('password')}
            />
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >

              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Linke href="#" variant="body2">
                  Forgot password?
                </Linke>
              </Grid>
              <Grid item>
                <Link to='/admin/register' >Don't have an account? Sign Up</Link>
                {/* <Linke href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Linke> */}
              </Grid>
            </Grid>
          </Box>
        </Box>
        
      </Container>
    </ThemeProvider>
  );
}