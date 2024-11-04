import fs from 'fs';
import path from 'path';

const dbPath = path.resolve('airmoya.json');

const readDB = () => {
    if (!fs.existsSync(dbPath)) {
        fs.writeFileSync(dbPath, JSON.stringify({ users: [], images: [], messages: [], services: [] }));
    }
    const data = fs.readFileSync(dbPath);
    return JSON.parse(data);
};

const writeDB = (data) => {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
};

export const getCollection = (name) => {
    const db = readDB();
    return db[name];
};

export const saveCollection = (name, collection) => {
    const db = readDB();
    db[name] = collection;
    writeDB(db);
};