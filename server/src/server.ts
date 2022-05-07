import express from 'express'
import cors from 'cors'
import { routes } from './routes';

const app = express();
app.use(cors())
app.use(express.json());
app.use(routes)

//POST, GET, PATCH, PUT, DELETE




app.listen(process.env.PORT || 3333, () => {
    console.log('Server is running')
})
