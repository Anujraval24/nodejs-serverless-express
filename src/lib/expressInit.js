import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import compression from 'compression';
import { Consumer } from 'sqs-consumer';
import { SQS } from 'aws-sdk';

import { errorLogger, sendEmail } from '../utils';

/** Initialize Express Server */
export const server = express();

/** Environment config */
dotenv.config({ path: 'src/config/.env' });

/* Config SES/SQS Service */
const AWS_SQS_URL = process.env.AWS_SQS_URL;
const AWS_SQS_SERVICE = new SQS({ apiVersion: '2012-11-05' });

const expressInit = (server) => {
	return new Promise((resolve, reject) => {
		/** Middlewares */
		// CORS
		server.use(cors({ origin: true, credentials: true }));
		// API LOG
		server.use(morgan('dev'));
		// XSS Attack Security
		server.use(helmet());
		// Compress Requests
		server.use(compression());

		/* Create our consumer */
		const sqsApp = Consumer.create({
			queueUrl: AWS_SQS_URL,
			handleMessage: async (message) => {
				const sqsMessage = JSON.parse(message.Body);
				const html = `<p>Hi ${sqsMessage.userEmail}.</p. <p>Your order of ${sqsMessage.itemsQuantity} ${sqsMessage.itemName} has been received and is being processed.</p> <p> Thank you for shopping with us! </p>`;
				sendEmail(sqsMessage.userEmail, html, 'SQS Order Service');
			},
			sqs: AWS_SQS_SERVICE,
		});

		sqsApp.on('error', (error) => {
			errorLogger(error.message);
			console.error(error.message);
		});

		sqsApp.on('processing_error', (error) => {
			errorLogger(error.message);
			console.error(error.message);
		});

		console.log('SQS - Emails service is running');
		sqsApp.start();

		resolve();
	});
};

export default expressInit;
