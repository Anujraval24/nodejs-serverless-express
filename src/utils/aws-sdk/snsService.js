// Import aws-sdk for SNS
import { PublishCommand as _PublishCommand, SNSClient as _SNSClient } from '@aws-sdk/client-sns';
import SNS from 'sns-mobile';

// To publish a message on mobile
const PublishCommand = _PublishCommand;

// Client object of SNS
const SNSClient = _SNSClient;

// Configure SNS Client for your selected region from AWS Console
const snsClient = new SNSClient({ region: process.env.AWS_SNS_REGION });

// Sample Object
// const obj = {
// 	to: '911234567890',
// 	text: 'Hello from AWS SNS',
// };

const sendSms = async (obj) => {
	let recipients = [];
	if (Array.isArray(obj.to)) {
		recipients = recipients.concat(obj.to);
	} else if (typeof obj.to === 'string') {
		const mobileArray = obj.to.split(',');
		recipients = recipients.concat(mobileArray);
	}
	for (let i = 0; i < recipients.length; i++) {
		const params = {
			Message: obj.text /* required */,
			PhoneNumber: recipients[i], //PHONE_NUMBER, in the E.164 phone number structure
		};
		// send message using SNS Client
		await snsClient.send(new PublishCommand(params));
	}
};

const sendNotification = async (data) => {
	const SNS_KEY_ID = process.env.SNS_SECRETACCESSKEY;
	const SNS_ACCESS_KEY = process.env.SNS_ACCESSKEYID;

	var ARN = process.env.SNS_ARN;

	const myApp = new SNS({
		platform: SNS.SUPPORTED_PLATFORMS.ANDROID,
		// If using iOS change uncomment the line below
		// and comment out SUPPORTED_PLATFORMS.ANDROID the one above
		// platform: SUPPORTED_PLATFORMS.IOS,
		region: process.env.SNS_REGION,
		apiVersion: '2010-03-31',
		accessKeyId: SNS_ACCESS_KEY,
		secretAccessKey: SNS_KEY_ID,
		platformApplicationArn: ARN,
	});

	myApp.on('userAdded', function (endpointArn, deviceId) {
		console.log(
			'\nSuccessfully added device with deviceId: ' + deviceId + '.\nEndpointArn for user is: ' + endpointArn,
		);
	});

	exports.register = function (req, res) {
		let deviceId = data['deviceId'];

		console.log('\nRegistering user with deviceId: ' + deviceId);

		myApp.addUser(deviceId, null, function (err, endpointArn) {
			if (err) {
				console.log(err);
				return res.status(500).json({
					status: 'not ok',
				});
			}

			res.status(200).json({
				status: 'ok',
			});
		});
	};
};

export default { sendSms, sendNotification };
