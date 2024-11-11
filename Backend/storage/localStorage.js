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

export const addImage = (image) => {
    const images = getCollection('images');
  
    if (!image.id || !image.path) {
      throw new Error('Invalid image object. Must include id and path.');
    }
  
    images.push(image);
    saveCollection('images', images);
};
  
export const getImages = () => {
    return getCollection('images');
};