import {Router} from 'express';
import { sendMessage } from '../controllers/user-controllers';

export const router = Router();

router.post('/send-message', sendMessage);