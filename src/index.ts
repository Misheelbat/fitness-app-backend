import express from 'express';
import cors from 'cors';
import { accountsRouter } from './routes/account/accounts.router';
import { workoutsRouter } from './routes/workouts/workout.router';
import { exerciseRouter } from './routes/exercises/exercise.router';
import { setsRouter } from './routes/sets/sets.router';
import { sessionRouter } from './routes/session/session.router';
import { authRouter } from './routes/auth/auth.router';

const app = express();
const PORT = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());

//routes
app.use('/', accountsRouter);
app.use('/', authRouter);
app.use('/workouts', workoutsRouter);
app.use('/exercises', exerciseRouter);
app.use('/sets', setsRouter);
app.use('/session', sessionRouter);

app.listen(PORT, () => {
	console.log(`server running on PORT ${PORT}`);
});
