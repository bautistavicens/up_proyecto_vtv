const jwt = require('jsonwebtoken');

const jwthHelper = {
    signToken: (payload) => {
        return jwt.sign({payload: payload}, process.env.SECRET_KEY , {expiresIn: '1h'});
    }
}


module.exports = jwthHelper;
