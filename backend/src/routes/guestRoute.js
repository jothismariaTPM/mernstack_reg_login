import express from 'express';
import { addGuest, deleteGuest, readGuest, readEachGuest, updateGuest } from '../controllers/guestController.js';
//import authUser from '../middleware/authUser.js';

const guestRouter = express.Router();

guestRouter.post('/add',addGuest);
guestRouter.get('/read',readGuest);
guestRouter.get('/read/:id',readEachGuest);
guestRouter.put('/update/:id', updateGuest);
guestRouter.delete('/delete/:id', deleteGuest);

export default guestRouter