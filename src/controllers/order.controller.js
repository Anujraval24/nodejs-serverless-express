import { SQS, config } from 'aws-sdk';

// Configure the region
config.update({ region: process.env.AWS_REGION });

// Create an SQS service object
const sqs = new SQS({ apiVersion: '2012-11-05' });
const AWS_SQS_URL = process.env.AWS_SQS_URL;

import { errorLogger } from '../utils';

const postOrder = async (req, res) => {
	try {
		const { userEmail, itemName, itemPrice, itemsQuantity } = req.body;
		const orderData = {
			userEmail,
			itemName,
			itemPrice,
			itemsQuantity,
		};

		const sqsOrderData = {
			MessageAttributes: {
				userEmail: {
					DataType: 'String',
					StringValue: orderData.userEmail,
				},
				itemName: {
					DataType: 'String',
					StringValue: orderData.itemName,
				},
				itemPrice: {
					DataType: 'Number',
					StringValue: orderData.itemPrice,
				},
				itemsQuantity: {
					DataType: 'Number',
					StringValue: orderData.itemsQuantity,
				},
			},
			MessageBody: JSON.stringify(orderData),
			MessageDeduplicationId: userEmail,
			MessageGroupId: 'UserOrders',
			QueueUrl: AWS_SQS_URL,
		};

		// Send the order data to the SQS queue
		const sendSqsMessage = await sqs.sendMessage(sqsOrderData).promise();

		res.status(200).send({
			success: true,
			data: sendSqsMessage,
			message: 'Thank you for your order. Check you inbox for the confirmation email.',
		});
	} catch (error) {
		errorLogger(error.message, req.originalUrl, req.ip);

		res.status(400).send({
			success: false,
			message: error.message,
		});
	}
};

export default { postOrder };
