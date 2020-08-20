import express from 'express';
import cors from 'cors';
import routes from './routes';
import dotenv from 'dotenv';

const app = express();

dotenv.config();

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3333);