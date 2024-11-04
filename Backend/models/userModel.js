const users = [];

module.exports = {
    findUserByEmail: (email) => users.find(user => user.email === email),
    createUser: (user) => {
        users.push(user);
        return user;
    }
};
