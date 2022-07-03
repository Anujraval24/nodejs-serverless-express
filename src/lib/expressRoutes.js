import { orderRoute, userRoute } from '../routes';

const expressRoutes = (server) => {
	return new Promise((resolve, reject) => {
		// Routes
		server.use('/users', userRoute);
		server.use('/order', orderRoute);

		/** Default Route */
		server.use('/', (req, res) => {
			res.status(200).send({
				success: true,
				message: 'Node JS Serverless Express API',
				data: [],
				totalCount: null,
			});
		});

		resolve();
	});
};

export default expressRoutes;
