import nodemailer from 'nodemailer';
import Mailgen from 'mailgen';

export const emailOtpSender = async(email)=>{
    try{
        //Creating random otp number
			const OTP = Math.floor(1000 + Math.random() * 9000).toString();

			//configuring nodemailer sender data
			const config = {
				service: 'gmail',
				auth: {
					user: process.env.EMAIL,
					pass: process.env.PASSWORD
				}
			};

			// create reusable transporter object using the default SMTP transport
			let transporter = nodemailer.createTransport(config);

			// Using mailgen creating a better mail format
			const MailGenerator = new Mailgen({
				theme: 'default',
				product: {
					name: 'Stezga',
					link: 'https://mailgen.js/'
				}
			});

			const response = {
				body: {
					intro: `Enter ${OTP} to varify your email address and sign in to your account`
				}
			};

			const mail = MailGenerator.generate(response);

			const message = {
				from: process.env.EMAIL, // sender address
				to: email, // list of receivers
				subject: 'OTP for login', // Subject line
				html: mail
			};

			// sending mail
			const result = await transporter.sendMail(message);
            console.log({result})
            return {OTP,result};

    }catch(err){
        console.log(err)
    }
}