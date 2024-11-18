async function authenticate(credentials) {
    const { ADMIN_USER, ADMIN_PASS } = process.env;
    return credentials.userName === ADMIN_USER && credentials.password === ADMIN_PASS;
}

module.exports = {
    authenticate
};
