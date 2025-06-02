import jwt from 'jsonwebtoken';

// Takes a user ID (id) as input.
// Uses jwt.sign() to create a token with:
// A payload: { id } → this means the token will carry the user’s ID.
// A secret key: process.env.JWT_SECRET → used to sign the token securely.
// An expiration time: 30d → token will be valid for 30 days.
//The signature is a secure code generated using your JWT_SECRET. It ensures nobody can fake or modify the token without knowing your secret.

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: '30d'})
};

export default  generateToken