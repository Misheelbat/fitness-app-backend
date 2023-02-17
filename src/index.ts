import express, { Request, Response } from 'express';
const app = express();

app.get('/', (req: Request, res: Response) => {
	res.send('hello world');
});
app.listen(5000, () => {
	console.log('listening on PORT 5000');
});
