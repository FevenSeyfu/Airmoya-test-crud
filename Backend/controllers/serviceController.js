import { getCollection, saveCollection } from '../storage/localStorage.js';

export const getAllServices = (req, res) => {
    const services = getCollection('services');
    res.status(200).json(services);
};

export const createService = (req, res) => {
    const newService = { id: Date.now().toString(), ...req.body };
    const services = getCollection('services');
    services.push(newService);
    saveCollection('services', services);
    res.status(201).json(newService);
};

export const updateService = (req, res) => {
    const { id } = req.params;
    const services = getCollection('services');
    const index = services.findIndex(service => service.id === id);
    if (index !== -1) {
        services[index] = { ...services[index], ...req.body };
        saveCollection('services', services);
        res.status(200).json(services[index]);
    } else {
        res.status(404).json({ error: 'Service not found.' });
    }
};

export const deleteService = (req, res) => {
    const { id } = req.params;
    const services = getCollection('services');
    const index = services.findIndex(service => service.id === id);
    if (index !== -1) {
        const deletedService = services.splice(index, 1);
        saveCollection('services', services);
        res.status(200).json(deletedService[0]);
    } else {
        res.status(404).json({ error: 'Service not found.' });
    }
};