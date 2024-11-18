const jwt = require('jsonwebtoken');
const { getLogger } = require('./logger');

const logger = getLogger('utils/jwtUtils');

let { JWT_SECRET } = process.env;
const { API_JWT_EXPIRY = '15m' } = process.env;

async function getJwtSecret() {
    if (!JWT_SECRET) {
        logger.info('A JWT secret does not exist - generating a new secret.');
        // TODO move to a server init function
        const random = (await import('crypto-random-string')).default;
        JWT_SECRET = random({ length: 10 });
    }
    return JWT_SECRET;
}

const jwtSign = async (user) => {
    const jwtSecret = await getJwtSecret();
    return jwt.sign(
        { user },
        jwtSecret,
        { expiresIn: API_JWT_EXPIRY }
    );
};

const jwtVerify = async (signedJwt) => {
    try {
        const jwtSecret = await getJwtSecret();
        const { user } = jwt.verify(signedJwt, jwtSecret);
        return user;
    } catch(error) {
        logger.debug('Invalid JWT token', error);
        return null;
    }
};

module.exports = { jwtSign, jwtVerify };
