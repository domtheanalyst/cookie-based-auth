const bcrypt = require('bcrypt');

// const jwt = require('jsonwebtoken');

const {v4:uuidv4} = require('uuid');

const User = require('../models/user.model');

const session = {};

async function httpLogin(req, res) {

    try {

        const { email, password } = req.body;

        //find user by email

        const user = await User.findOne({ email });

        if (!user) {

            return res.status(401).json({ message: "Invalid email or password!" })

        }

        // valid password

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {

            return res.status(401).json({ message: "Invalid email or password!" })
        }


        // generate session token and expiration duration

        const sessionToken = uuidv4();

        const expiresAt = new Date().setFullYear(new Date().getFullYear() + 1);
        ;

        // store session token in state

        session[sessionToken] = {
            expiresAt, 
            userId: user._id,
        }
        
        // Respond with cookie

        res.cookie('auth-cookie', sessionToken, {maxAge:expiresAt});

        res.status(200).json({ message: "Welcome! This is your dashboard."})
       

    } catch (err) {

        console.log(err);

        res.status(500).json({ message: "server error" })

    }
}


function httpsProtected(req, res){

    const sessionToken = req.cookies['auth-cookie'];

    if(!sessionToken){

        return res.status(401).json({message:"Access denied!"});
    }

    const currentSession = session?.[sessionToken];

    if(!currentSession){

        return res.status(401).json({message:"Access denied"});
    }

    if(currentSession?.['expiresAt'] < new Date()){

        return res.status(401).json({message:"Token is expired!"})
    }

    res.status(200).json({message:"Access granted!"});

}


// Export modules

module.exports = {

    httpLogin,

    httpsProtected,
};