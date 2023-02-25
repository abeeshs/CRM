import React, { useEffect, useState } from 'react';
import OTPInput, { ResendOTP } from 'otp-input-react';
import { Box, Container } from '@mui/system';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import * as authService from '../../services/authService';
import { authSlice } from '../../features/auth/adminAuthSlice';
import { useNavigate } from 'react-router-dom';
import { setUserToken } from '../../features/auth/userAuthSlice';

function VarifyOTP() {
	const dispatch = useDispatch();
	const [OTP, setOTP] = useState('');
	const [userEmail, setUserEmail] = useState();
	const [error, setError] = useState('');
	const [desableButton, setDesableButton] = useState('');
	const navigate = useNavigate();

	const { otpEmail } = useSelector((state) => state.userOTPLogin);
	console.log(otpEmail);
	const getUserEmail = () => {
		setUserEmail(otpEmail);
	};
	//submit otp 
	const handleSubmit = async () => {
		if (OTP > 3) {
			const response = await authService.userVerifyOTP(OTP, userEmail);
			console.log(response);
			if (response.message === 'Loggin Success') {
				dispatch(setUserToken({ token: response.token, username: response.username }));
				navigate('/contacts');
				console.log({ response });
			} else if (response == 'Incorrect otp') {
				console.log({ response });
				setError(response);
				setTimeout(() => {
					setError(null);
					setOTP('');
				}, 4000);
			} else {
			}
		} else {
			setError('Please enter OTP');
			console.log('Enter valid otp');
		}
	};

	//resend otp
	const resendOTP = async()=>{
		const response = await authService.userVerifyOTP(OTP, userEmail);
		if (response.message === 'Loggin Success') {
			dispatch(setUserToken({ token: response.token, username: response.username }));
			navigate('/contacts');
			console.log({ response });
		} else if (response == 'Incorrect otp') {
			console.log({ response });
			setError(response);
			setTimeout(() => {
				setError(null);
				setOTP('');
			}, 4000);
		} else {
		}

	}

	useEffect(() => {
		getUserEmail();
	}, []);

	return (
		<>
			<Container component="main" maxWidth="xs">
				<Box
					sx={{
						display: 'flex',
						marginTop: '25vh',
						justifyContent: 'center',
						flexDirection: 'column',
						alignItems: 'center',
						backgroundColor: 'white',
						boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
					}}>
					<p>
						{' '}
						<b style={{ fontSize: '25px' }}> OTP Verification</b>
					</p>
					<div
						style={{
							width: '300px',
							justifyContent: 'center',
							alignItems: 'center',
							textAlign: 'center',
							fontSize: '14px'
						}}>
						<p style={{ color: 'red' }}>{error ? error : ''}</p>
						<p>
							An OTP has been sent to your entered email <b>{userEmail}</b>
						</p>
						<p className="p3">Enter your Code here</p>
					</div>

					<div className="verifyDiv">
						<div className="otpElements">
							<div className={error ? 'validation-error' : ''} style={{ width: 'fit-content' }}>
								<OTPInput
									value={OTP}
									onChange={setOTP}
									autoFocus
									OTPLength={4}
									otpType="number"
									disabled={false}
									secure={false}
								/>
							</div>
							<p className="p3">Didn't receive the code?</p>
							<ResendOTP onResendClick={() => resendOTP()} />
							{/* <p className="resend">Resend</p> */}
						</div>
						{/* <button type="submit">Verify</button> */}
						<Button
							onClick={() => handleSubmit()}
							disabled={desableButton}
							sx={{ mt: 3 }}
							className="login-btn"
							type="submit"
							fullWidth
							variant="contained">
							Verify
						</Button>
						<Box sx={{ textAlign: 'center', cursor: 'pointer' }}>
							<p onClick={() => navigate('/')}>Cancel</p>
						</Box>
					</div>
				</Box>
			</Container>
		</>
	);
}

export default VarifyOTP;
