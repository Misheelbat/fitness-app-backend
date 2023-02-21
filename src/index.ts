import express, { Request, Response } from 'express';
import cors from 'cors';
import pool from './db';

const app = express();

//middleware
app.use(cors());
app.use(express.json());

//routes
app.get('/', (req: Request, res: Response) => {
	res.send('connected');
});

app.get('/accounts', async (req: Request, res: Response) => {
	try {
		const allAccounts = await pool.query('SELECT * FROM accounts');
		res.json(allAccounts.rows);
	} catch (error: any) {
		console.log(error.message);
	}
});

app.get('/accounts/:id', async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const account = await pool.query(
			'SELECT * FROM accounts WHERE account_id = $1',
			[id]
		);
		res.json(account.rows);
	} catch (error: any) {
		console.log(error.message);
	}
});

app.post('/accounts', async (req, res) => {
	try {
		const { name, email, password } = req.body;
		const newAccount = await pool.query(
			'INSERT INTO accounts (name,email,password) VALUES ($1, $2, $3) ',
			[name, email, password]
		);
		res.json(newAccount);
	} catch (error: any) {
		console.log(error.message);
	}
});

app.put('/accounts/:id', async (req, res) => {
	try {
		const { id } = req.params;
		const { name } = req.body;
		const updateAccount = await pool.query(
			'UPDATE accounts SET name = $1 WHERE account_id = $2',
			[name, id]
		);
		res.json('updated Account Info');
	} catch (error: any) {
		console.log(error.message);
	}
});
app.delete('/accounts/:id', async (req, res) => {
	try {
		const { id } = req.params;
		const { name } = req.body;
		const updateAccount = await pool.query(
			'DELETE FROM accounts  WHERE account_id = $1',
			[id]
		);
		res.json('Account Info deleted');
	} catch (error: any) {
		console.log(error.message);
	}
});

app.listen(5000, () => {
	console.log('listening on PORT 5000');
});
