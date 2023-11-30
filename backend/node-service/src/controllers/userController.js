const jwt = require('jsonwebtoken');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');



//generating token
const generateToken = (id) => {
	return jwt.sign({id}, process.env.JWT_SECRET, {
		expiresIn: '30d',
	})
}
//registering user
const registerUser = asyncHandler(async (req, res) => {
	const { name, email, password } = req.body;

	if(!name || !email || !password) {
		res.status(400);
		throw new Error('Please enter all fields');
	}

	const userExists = await User.findOne({email});

	if(userExists){
		res.status(400);
		throw new Error('User already exists');
	}

	//hashing the password
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, salt);

	//creating a user
	const user = await User.create({
		name,
		email,
		password: hashedPassword,
	});

	if (user) {
		res.status(201).json({
			_id:user._id,
			name:user.name,
			email:user.email,
			token:generateToken(user._id),
		});
	} else {
		res.status(400);
		throw new Error('invalid user data');
	}
});


//login user after registration
    const loginUser = asyncHandler(async (req, res) => {

        const { email, password } = req.body;
        const user = await User.findOne({ email });
       
        if (user && (await bcrypt.compare(password, user.password))) {
            res.json({
              _id: user.id,
              name: user.name,
              email: user.email,
              token: generateToken(user._id),
            })
          } else {
            res.status(400)
            throw new Error('Invalid credentials')
          }

    })


//updating user
const updateUser = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  const { name, email } = req.body;

  const user = await User.findById(userId);

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  user.name = name || user.name;
  user.email = email || user.email;

  const updatedUser = await user.save();

  res.json({
    _id: updatedUser._id,
    name: updatedUser.name,
    email: updatedUser.email,
    createdAt: updatedUser.createdAt,
  });
});


module.exports = {
  registerUser,
  loginUser,
  updateUser,
  
};
