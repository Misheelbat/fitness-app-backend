import express, { Request, Response } from 'express';
import cors from 'cors';
import pool from './db';
import { accountsRouter } from './routes/accounts/accounts.router';
import { workoutsRouter } from './routes/workouts/workout.router';

const app = express();

//middleware
app.use(cors());
app.use(express.json());

//routes
app.use('/accounts', accountsRouter);
app.use('/workouts', workoutsRouter);

app.listen(5000, () => {
	console.log('listening on PORT 5000');
});
