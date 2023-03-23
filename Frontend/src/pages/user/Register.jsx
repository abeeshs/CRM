import { useForm } from 'react-hook-form';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Linke from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useDispatch } from 'react-redux';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { setAdminToken } from '../../features/auth/adminAuthSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as authService from '../../services/authService';
import { setUserToken } from '../../features/auth/userAuthSlice';

const theme = createTheme();

export default function Register() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	//Admin register form schema
	const schema = yup.object().shape({
		username: yup.string().required('Username is required'),
		email: yup.string().email().required('Email is required'),
		mobile: yup
			.string()
			.required()
			.matches(/^[789]\d{9}$/, 'Is not in correct format'),
		password: yup
			.string()
			.min(3, 'Password must be at least 3 characters')
			.required('Password is required'),
		confirmPassword: yup
			.string()
			.oneOf([yup.ref('password'), null], "Password Didn't Match")
			.required('Confirm Password is required')
	});

	//setting schema
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm({
		resolver: yupResolver(schema)
	});

	//form on submit function
	const onSubmit = async (data) => {
		const response = await authService.userRegister(data);

		if (response) {
			dispatch(setUserToken({ token: response.token, user: response.user }));
			navigate('/contacts');
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
						alignItems: 'center'
					}}>
					<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h3" variant="p">
						Welcome to CRM
					</Typography>
					<Typography component="h5" variant="p">
						Sign Up
					</Typography>
					<Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
						<TextField
							margin="normal"
							required
							fullWidth
							id="username"
							label="User Name"
							autoComplete="username"
							autoFocus
							error={!!errors.username}
							helperText={errors.username ? errors.username.message : ''}
							{...register('username')}
						/>
						<TextField
							margin="normal"
							required
							fullWidth
							id="email"
							label="Email Address"
							autoComplete="email"
							autoFocus
							error={!!errors.email}
							helperText={errors.email ? errors.email.message : ''}
							{...register('email')}
						/>
						<TextField
							margin="normal"
							required
							fullWidth
							type="number"
							id="mobilenum"
							label="Mobile"
							autoComplete="mobile"
							autoFocus
							error={!!errors.mobile}
							helperText={errors.mobile ? errors.mobile.message : ''}
							{...register('mobile')}
						/>

						<TextField
							margin="normal"
							required
							fullWidth
							label="Password"
							type="password"
							id="password"
							autoComplete="current-password"
							error={!!errors.password}
							helperText={errors.password ? errors.password.message : ''}
							{...register('password')}
						/>

						<TextField
							margin="normal"
							required
							fullWidth
							label="Confirm Password"
							type="password"
							id="password"
							autoComplete="current-password"
							error={!!errors.confirmPassword}
							helperText={errors.confirmPassword ? errors.confirmPassword.message : ''}
							{...register('confirmPassword')}
						/>

						<Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} onClick>
							Sign In
						</Button>
						<Grid container>
							<Grid item sx={{ mt: 3, mb: 2 }}>
								<Link to="/">You have an account? Sign In</Link>
							</Grid>
						</Grid>
					</Box>
				</Box>
			</Container>
		</ThemeProvider>
	);
}
