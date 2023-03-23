import { Avatar, Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Header from '../../components/User/Header/Header';
import * as userService from '../../services/userService';

function Profile() {
	const { token } = JSON.parse(localStorage.getItem('user'));
	const [profileData, setProfileData] = useState({});
    console.log(profileData.email)
	const handleProfile = (e) => {
		const { name, value } = e.target;
		var vl = {
			name: value
		};
		console.log(vl);
	};
	const getUserProfile = async () => {
		try {
			const response = await userService.getUserService(token);
            console.log(response)
			if (response.status === 'Success') {
				setProfileData(response.user);
			}
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		getUserProfile();
	}, []);
	return (
		<>
			<Header />

			<Box
				sx={{
					width: '100%',
					height: '650px',
					border: '1px solid rgb(223, 227, 235)'
					// display: 'flex',
					// flexDirection:'column',
					// justifyContent: 'space-between',
					// alignItems: 'center',
				}}>
				<Box
					sx={{
						width: '100%',
						height: '65px',
						backgroundColor: 'white'
					}}>
					<span
						className="commen-font"
						style={{
							fontSize: '1.3rem',
							margin: '25px',
							fontWeight: '600',
							color: 'rgb(0, 145, 174)'
						}}>
						Profile
					</span>
				</Box>
				<Box
					sx={{
						width: '100%',
						height: '90%',
						display: 'flex',
						marginTop: '10px',

						backgroundColor: 'green'
					}}>
					<Box
						sx={{
							width: '15%',
							height: '100%',
							backgroundColor: 'white',
							border: '1px solid grey'
						}}></Box>
					<Box
						sx={{
							width: '85%',
							height: '100%',
							backgroundColor: 'white',
							border: '1px solid grey'
						}}>
						<Box
							sx={{
								width: '100%',
								height: '70px',
								borderBottom: '1px solid grey',
								display: 'flex'
							}}>
							<Box
								sx={{
									width: '60px',
									height: '100%',
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center'
								}}>
								<Avatar />
							</Box>
							<Box
								sx={{
									width: '60px',
									height: '100%',
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center'
								}}>
								Abeesh
							</Box>
						</Box>
						<Box
							sx={{
								width: '100%',
								height: '500px',
								display: 'flex',
								flexDirection: 'column',
								justifyContent: 'center',
								alignItems: 'center'
							}}>
							<Box sx={{ borderBottom: '1px solid grey', width: '98%', height: '250px' }}>
								<Box sx={{ height: '15px', width: '100%' }}>User Information</Box>
								<Box sx={{ height: '100%', width: '100%' }}>
									<table className="table-detailview">
										<tbody>
											<tr>
												<td className="dview-label">Username</td>
												<td>
													<input
														className="profile-input"
														name="username"
														value={profileData?.username}
														onBlur={handleProfile}
													/>
												</td>
												<td className="dview-label">User Type</td>
												<td>
													<input className="profile-input" disabled />
												</td>
											</tr>
											<tr>
												<td className="dview-label">Email</td>
												<td>
													<input className="profile-input" value={profileData?.email} disabled />
												</td>
												<td className="dview-label">Contact number</td>
												<td>
													<input className="profile-input" onBlur={handleProfile} />
												</td>
											</tr>
											<tr>
												<td className="dview-label">First Name</td>
												<td>
													<input
														className="profile-input"
														name="firstname"
														onBlur={handleProfile}
													/>
												</td>
												<td className="dview-label">Last Name</td>
												<td>
													<input className="profile-input" name="lastname" onBlur={handleProfile} />
												</td>
											</tr>
										</tbody>
									</table>
								</Box>
							</Box>
							<Box sx={{ width: '98%', height: '250px' }}>
								<Box sx={{ height: '15px', width: '100%' }}>Company Information</Box>
								<Box sx={{ height: '100%', width: '100%' }}>
									<table className="table-detailview">
										<tbody>
											<tr>
												<td className="dview-label">Company</td>
												<td>
													<input className="profile-input" />
												</td>
												<td className="dview-label">Contact Number</td>
												<td>
													<input className="profile-input" name="mobile" />
												</td>
											</tr>
											<tr>
												<td className="dview-label">Email</td>
												<td>
													<input className="profile-input" />
												</td>
												<td className="dview-label">Address</td>
												<td>
													<input className="profile-input" />
												</td>
											</tr>
											<tr>
												<td className="dview-label">Username</td>
												<td>
													<input className="profile-input" />
												</td>
												<td className="dview-label">User Type</td>
												<td>
													<input className="profile-input" />
												</td>
											</tr>
										</tbody>
									</table>
								</Box>
							</Box>
						</Box>
					</Box>
				</Box>
			</Box>
		</>
	);
}

export default Profile;
