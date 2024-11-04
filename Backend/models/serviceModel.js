export let services = [];

export const getAllServices = () => services;

export const createService = (service) => {
    services.push(service);
    return service;
};

export const updateService = (id, updatedService) => {
    const index = services.findIndex(service => service.id === id);
    if (index !== -1) {
        services[index] = { ...services[index], ...updatedService };
        return services[index];
    }
    return null;
};

export const deleteService = (id) => {
    const index = services.findIndex(service => service.id === id);
    if (index !== -1) {
        return services.splice(index, 1)[0];
    }
    return null;
};