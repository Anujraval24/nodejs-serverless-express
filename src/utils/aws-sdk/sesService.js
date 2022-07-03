import { SES } from 'aws-sdk';
// require('dotenv').config({
// 	path: '../../config/.env',
// });

const SES_CONFIG = {
	accessKeyId: process.env.AWS_ACCESS_KEY_ID,
	secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
	region: process.env.AWS_REGION,
};

const AWS_SES = new SES(SES_CONFIG);

const sendEmail = (recipientEmail, body, subject) => {
	const params = {
		Source: process.env.AWS_SES_EMAIL,
		Destination: {
			ToAddresses: [recipientEmail],
		},
		ReplyToAddresses: [],
		Message: {
			Body: {
				Html: {
					Charset: 'UTF-8',
					Data: body,
				},
			},
			Subject: {
				Charset: 'UTF-8',
				Data: subject,
			},
		},
	};
	return AWS_SES.sendEmail(params).promise();
};

export default sendEmail;

/* module.exports = { sendEmail };
(async () => {
	const data = await sendEmail('testaws@mailinator.com', 'test-aws');
	console.log('data', data);
})();*/
