import { useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useDispatch } from 'react-redux';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, styled, ThemeProvider } from '@mui/material/styles';
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

	const GoogleButton = styled(Button)({
		backgroundColor: '#ffffff',
		color: '#757575',
		boxShadow: 'none',
		textTransform: 'none',
		'&:hover': {
			backgroundColor: '#ffffff',
			boxShadow: 'none'
		}
	});

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
			<Box
				sx={{
					height: '100vh',
					width: '100%',
					backgroundColor: 'white',
					margin: '0',
					padding: '0',
					fontFamily: 'Montserrat,sans-serif'
				}}>
				<Container
					component="main"
					maxWidth="lg"
					sx={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							boxShadow: '0 16px 22px rgba(0,50,125,.15)',
							width: '450px'
						}}>
						<Typography component="h3" variant="p">
							Welcome to STEZGA
						</Typography>
						<Typography component="h4"paddingTop="5px" variant="p">
							Sign Up
						</Typography>
						<Box
							component="form"
							onSubmit={handleSubmit(onSubmit)}
							noValidate
							sx={{ mt: 1, width: '80%', fontSize: '16px',fontWeight:500 }}>
							<TextField
								margin="normal"
								required
								fullWidth
								id="username"
								label="User Name"
								size="small"
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
								size="small"
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
								size="small"
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
								size="small"
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
								size="small"
								label="Confirm Password"
								type="password"
								id="password"
								autoComplete="current-password"
								error={!!errors.confirmPassword}
								helperText={errors.confirmPassword ? errors.confirmPassword.message : ''}
								{...register('confirmPassword')}
							/>

							<Button
								type="submit"
								fullWidth
								variant="contained"
								sx={{ mt: 3, mb: 2, backgroundColor: '#2b3749 ','&:hover': {
									backgroundColor: 'black',
									boxShadow: 'none'
								} }}
								onClick>
								Sign Up
							</Button>
							<Box
								sx={{
									display: 'flex',
									width: '100%',
									height: '30px',
									justifyContent: 'space-between'
								}}>
								<Box>________________</Box>
								<Box>or</Box>
								<Box>________________</Box>
							</Box>
							<GoogleButton
								type="submit"
								fullWidth
								variant="contained"
								sx={{ mt: 3, mb: 2, backgroundColor: '#2b3749 ' }}>
								Login With google
							</GoogleButton>

							<Grid container>
								<Grid item sx={{ mt: 1, mb: 3 }}>
									<Typography variant="p" color={'#2b3749 '} fontFamily="lato">
										Already have an account?{' '}
										<span style={{ color: 'blue', cursor: 'pointer' }}>Log in</span>
									</Typography>
								</Grid>
							</Grid>
						</Box>
					</Box>
				</Container>
			</Box>
		</ThemeProvider>
	);
}
