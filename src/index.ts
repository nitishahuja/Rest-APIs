import Express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';
import router from './router';

const app = Express();

app.use(cors({
    credentials: true,
}));


app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());


const server = http.createServer(app);

server.listen(8080, () => {
    console.log('Server is running on port 8080');
});

const MONGO_URI = "mongodb+srv://nitishahuja:lbxFw85PBPYaMXrd@testdb.cm19wdj.mongodb.net/?retryWrites=true&w=majority&appName=TestDB";



mongoose.Promise = Promise;

mongoose.connect(MONGO_URI).then(()=>{
    console.log("connected to mongo")
});

mongoose.connection.on('error', (error: Error) => {
    console.log('Error connecting to MongoDB', error);
});


app.use('/',router());