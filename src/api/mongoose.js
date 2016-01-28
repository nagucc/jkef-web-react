import mongoose from 'mongoose';
import {mongoUrl} from '../config';

mongoose.connect(mongoUrl);
var db = mongoose.connection;
db.on('error', function () {
  throw new Error('unable to connect to database at ' + mongoUrl);
});