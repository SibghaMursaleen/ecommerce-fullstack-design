require('dotenv').config();
console.log('PORT:', process.env.PORT);
console.log('MONGODB_URI:', process.env.MONGODB_URI ? 'LOADED' : 'NOT LOADED');
console.log('JWT_SECRET:', process.env.JWT_SECRET ? 'LOADED' : 'NOT LOADED');
