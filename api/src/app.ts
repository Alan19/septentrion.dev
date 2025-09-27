import express from 'express';
import {errorHandler} from './middlewares/errorHandler';
import routes from "./routes";
import path from "path";
import bodyParser from 'body-parser';
import cors from "cors";
import logger from "morgan";
import cookieParser from "cookie-parser";

const app = express();

// Middlewares
app.use(express.json());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', routes);

// Global error handler (should be after routes)
app.use(errorHandler);

export default app;