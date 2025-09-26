import express from 'express';
import "dotenv/config";
import cookieParser from 'cookie-parser';

import authRoutes from './routes/auth.route.js';  
import userRoutes from './routes/user.route.js';
import chatRoutes from './routes/chat.route.js';

import {connectDB} from './lib/db.js';


const app = express();
const PORT_SERVER = process.env.PORT


// app.get('/api/auth/signup', (req, res) => {
//   res.send('Sign Up');
// });

// app.get('/api/auth/login', (req, res) => {
//     res.send('Log In');
// });

// app.get('/api/auth/logout', (req, res) => {
//     res.send('Log Out');
// }); 
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/chat', chatRoutes);



app.listen(PORT_SERVER, () => {
  console.log(`Server is running on port ${PORT_SERVER}`);
  connectDB();
});