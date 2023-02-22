import express from 'express';
import cors from 'cors';

import { accountsRouter } from './routes/accounts/accounts.router';
import { workoutsRouter } from './routes/workouts/workout.router';
import { exerciseRouter } from './routes/exercises/exercise.router';

const app = express();

//middleware
app.use(cors());
app.use(express.json());

//routes
app.use('/accounts', accountsRouter);
app.use('/workouts', workoutsRouter);
app.use('/exercises', exerciseRouter);

app.listen(5000, () => {
	console.log('listening on PORT 5000');
});
