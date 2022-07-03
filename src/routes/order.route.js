import express from 'express';

import { orderController } from '../controllers';

export default express.Router().post('/', orderController.postOrder);
