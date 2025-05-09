const User = require("../models/user"); 
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Create a JWT token
const createToken = (user) => {
    return jwt.sign(
      { id: user._id, role: user.role, brand: user.brand },
      process.env.JWT_SECRET, { expiresIn: "1d" }
    );
  };
  

// Register a new user
exports.register = async (req, res) => {
    const { name, email, password, role, brand } = req.body;
    
    try {
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: 'User already exists' });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            brand,
            role: role || 'brand_user', 
        });
        
        const token = createToken(newUser);
        console.log("Token payload during registration:", {
        id: newUser._id,
        role: newUser.role,
        brand: newUser.brand,
        });


        const { _id, name: userName, email: userEmail, brand: userBrand, role: userRole } = newUser;
        
        res.status(201).json({
            user: { _id, name: userName, email: userEmail, brand: userBrand, role: userRole },
            token,
        });
        
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
    
}

// Login a user
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Wrong email or password entered.' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Wrong email or password entered.' });

        const token = createToken(user);
        console.log("Token payload during login:", {
          id: user._id,
          role: user.role,
          brand: user.brand,
        });
        

        const { _id, name, email: userEmail, brand, role } = user;

        res.status(200).json({
            user: { _id, name, email: userEmail, brand, role },
            token,
          });
        } catch (error) {
          res.status(400).json({ error: error.message });
        }
      
};
