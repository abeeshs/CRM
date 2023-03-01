import { Box, Button } from '@mui/material';
import React, { useState } from 'react';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Overview from './Overview';
import Scheduling from './Scheduling';
import Invitation from './Invitation';


function NewMeeting() {
	const [users, setUsers] = useState([]);
	const [activeStep, setActiveStep] = useState(0);
	const [meetings,setMeetings]=useState()
	const steps = ['OVERVIEW', 'SCHEDULING', 'AUTOMATION'];
	const nextStep = () => {
		if (activeStep <2) setActiveStep((prev) => prev + 1);
	};
	const prevStep = () => {
		if (activeStep > -1) setActiveStep((prev) => prev - 1);
	};

	return (
		<>
			<Box sx={{ width: '100%', height: '100%' }}>
				<Box
					sx={{
						// position:"absolute",
						// top:"0px",
						// height:"200px",
						// overflow:"hidden",
						// right:"0",
						// left:"0"

						width: '100%',
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
						position: 'fixed'
					}}>
					<Box
						sx={{
							paddingLeft: '15px',
							width: '20%',
							height: '80%',
							justifyContent: 'center',
							display: 'grid',
							placeContent: 'center',
							backgroundColor: 'white'
						}}>
						<span style={{ fontSize: '18px' }}>Create one-on-one meeting</span>
					</Box>
					<Box
						sx={{
							height: '80%',
							backgroundColor: 'white',
							zIndex: '6',
							width: '60%',
							paddingTop: '15px'
						}}>
						<Stepper activeStep={activeStep} alternativeLabel>
							{steps.map((label) => (
								<Step key={label} sx={{ color: 'green' }}>
									<StepLabel
										sx={{
											fontFamily: 'Lexend Deca Helvetica, Arial, sans-serif',
											color: '#33475b',
											fontWeight: '600',
											fontSize: '11px'
										}}>
										{label}
									</StepLabel>
								</Step>
							))}
						</Stepper>
					</Box>
					<Box
						sx={{
							paddingRight: '15px',
							width: '20%',
							height: '80%',
							display: 'grid',
							placeContent: 'center',
							backgroundColor: 'white'
						}}>
						<span style={{ fontSize: '18px' }}>Step {activeStep+1} of 3 </span>
					</Box>
				</Box>
			{activeStep===0?<Overview setMeetings={setMeetings}/> :activeStep===1?  <Scheduling setMeetings={setMeetings} />:<Invitation setMeetings={setMeetings}/>}

			</Box>
			<footer
				style={{
					position: 'absolute',
					left: 0,
					bottom: 0,
					right: 0,
					width: '100%'
				}}>
				<div
					style={{
						display: 'flex',
						justifyContent: 'space-between',
						backgroundColor: 'white',
						border: '1px solid grey'
					}}>
					<div
						style={{
							width: '150px',
							height: '80%',
							justifyContent: 'center',

							textAlign: 'center'
						}}>
						{activeStep > 0 ? (
							<p onClick={() => prevStep()} style={{ fontSize: '18px',cursor:'pointer',color: "#33475b" }}>
								Back{' '}
							</p>
						) : (
							<p style={{ fontSize: '18px',cursor:'pointer',color: "#33475b" }}>Cancel </p>
						)}
					</div>

					<div
						style={{
							width: '150px',
							height: '60px',
							alignItems: 'center',
							justifyContent: 'center'
						}}>
						<Button
							onClick={() => nextStep()}
							className="meeting-btn"
							style={{ color: 'white', margin: '8px' }}
							varient="contained">
							Next
						</Button>
					</div>
				</div>
			</footer>
		</>
	);
}

export default NewMeeting;
