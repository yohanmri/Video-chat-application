import express from 'express';
import "dotenv/config";
import authRoutes from './routes/auth.route.js';  
import pageRoutes from './routes/pages.route.js';
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
app.use('/api/auth', authRoutes);

app.use('/api/pages', pageRoutes);


app.listen(PORT_SERVER, () => {
  console.log(`Server is running on port ${PORT_SERVER}`);
  connectDB();
});