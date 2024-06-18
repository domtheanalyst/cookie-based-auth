const User = require('../models/user.model');

// register user if not exist

async function httpRegisterUser( req, res ) {

    try {

            const { username, email, password } = req.body;

        // check fields inputs
        if ( !username || !email || ! password ){

            return res.status( 400 ).json(
                
                { message: "Please fill all details" }
            
            );
        }

        // check if  user exists

        const existingUser = await User.findOne( {email} )

        if (existingUser) {

            return res.status(400).json(

                { message: "Email already esists!" }

            );

        }

        // create new user

        const newUser = new User( { username, email, password } );

        const savedUser = await newUser.save();

        // send a success response

        res.status(201).json ( {
            message: "User registered successfully",

            username: savedUser.username,

            email: savedUser.email

        });
        
    } catch (error) {

        console.error(error)

        res.status(500).json({ message: "Server error!"})
        
    }

}

async function httpGetUsers(req, res){

    const users = await User.find({}, '-password')

    res.status(200).json({

        message: "Database accessed successfully",

        user: users
    });

}


module.exports = {

    httpRegisterUser,

    httpGetUsers
    
}