const { getLogger } = require('../utils/logger');
const { jwtVerify, jwtSign } = require('../utils/jwtUtils');

const logger = getLogger('middleware/authentication');

const getAuthenticationHandler = ({ authRequired }) => {
    return (
        req,
        res,
        next
    ) => {
        (async function() {
            try {
                const authHeader = req.get('x-authorization');
                if (authHeader) {
                    const [ , authToken ] = authHeader.split(' ');
                    const user = await jwtVerify(authToken);
                    req.user = user;
                    // Resign (extend timeout) and place back on the response
                    res.set('x-authorization', await jwtSign(user));
                }
                if (authRequired && !req.user) {
                    res.status(403).send();
                } else {
                    next();
                }
            } catch(error) {
                next(error);
            }
        })();
    };
};

module.exports = { getAuthenticationHandler };
