import { getCollection, saveCollection } from '../storage/localStorage.js';

export const findUserByEmail = (email) => {
    const users = getCollection('users');
    return users.find(user => user.email === email);
};

export const createUser = (user) => {
    const users = getCollection('users');
    users.push(user);
    saveCollection('users', users);
    return user;
};