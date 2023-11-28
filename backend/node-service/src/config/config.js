const mongoose = require('mongoose');
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://kishushubonifacembogho:cabon12345@cabon.mo5f37c.mongodb.net/ask-about-coding-languages?retryWrites=true&w=majority';






const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  tls: true,
  tlsAllowInvalidHostnames: true,
  
};





/*const conn = await mongoose.connect(process.env.MONGODB_URI, 
	{ useNewUrlParser: true, 
		useUnifiedTopology: true 
	})
  .then(() => {
    console.log(`Connected to MongoDB: ${conn.connection.host}`.cyan.underline.bold));
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });*/
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(MONGODB_URI)
        console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold)
    }
    catch (err) {
        console.error(err)
        process.exit(1)
    }
}

module.exports = connectDB
