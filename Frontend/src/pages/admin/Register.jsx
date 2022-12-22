import { useForm } from 'react-hook-form';
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
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

function Copyright(props) {
	return <Typography variant="body2" color="text.secondary" align="center" {...props}></Typography>;
}

const theme = createTheme();

export default function Register() {
	const schema = yup.object().shape({
		firstname: yup.string().required("First Name is required"),
		lastname: yup.string().required("Last Name is required"),
		email: yup.string().email().required("Email is required"),
		mobile: yup.number().min(10).positive().integer().required("Mobile is required"),
		password: yup.string().min(3).required("Password is required"),
		confirmPassword: yup
			.string()
			.oneOf([yup.ref('password'), null],"Password Don't Match")
			.required("Confirm Password is required")
	});
	const { register, handleSubmit,formState:{errors}} = useForm({
		resolver:yupResolver(schema)
	});

	const onSubmit = (data) => {
		console.log(data);
		
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
					<Typography component="h1" variant="h5">
						Sign Up
					</Typography>
					<Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
						<p>{errors.firstname?.message}</p>
						<TextField
							margin="normal"
							required
							fullWidth
							id="firstname"
							label="First Name"
							autoComplete="firstname"
							autoFocus
							{...register('firstname')}
						/>
						<p>{errors.lastname?.message}</p>
						<TextField
							margin="normal"
							required
							fullWidth
							id="lastname"
							label="Last Name"
							autoComplete="lastname"
							autoFocus
							{...register('lastname')}
						/>
						<p>{errors.email?.message}</p>
						<TextField
							margin="normal"
							required
							fullWidth
							id="email"
							label="Email Address"
							autoComplete="email"
							autoFocus
							{...register('email')}
						/>
						<p>{errors.mobile?.message}</p>
						<TextField
							margin="normal"
							required
							fullWidth
							type='number'
							id="mobilenum"
							label="Mobile"
							autoComplete="mobile"
							autoFocus
							{...register('mobile')}
						/>
						<p>{errors.password?.message}</p>
						<TextField
							margin="normal"
							required
							fullWidth
							label="Password"
							type="password"
							id="password"
							autoComplete="current-password"
							{...register('password')}
						/>
						<p>{errors.confirmPassword?.message}</p>
						<TextField
							margin="normal"
							required
							fullWidth
							label="Confirm Password"
							type="password"
							id="password"
							autoComplete="current-password"
							{...register('confirmPassword')}
						/>

						<Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} onClick>
							Sign In
						</Button>
						<Grid container>
							<Grid item xs>
								<Linke href="#" variant="body2">
									Forgot password?
								</Linke>
							</Grid>
							<Grid item>
								<Link to="/admin/register">Don't have an account? Sign Up</Link>
								{/* <Linke href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Linke> */}
							</Grid>
						</Grid>
					</Box>
				</Box>
				<Copyright sx={{ mt: 8, mb: 4 }} />
			</Container>
		</ThemeProvider>
	);
}
