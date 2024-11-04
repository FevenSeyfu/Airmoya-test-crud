let services = [];

module.exports = {
    getAllServices: () => services,
    createService: (service) => {
        services.push(service);
        return service;
    },
    updateService: (id, updatedService) => {
        const index = services.findIndex(service => service.id === id);
        if (index !== -1) {
            services[index] = { ...services[index], ...updatedService };
            return services[index];
        }
        return null;
    },
    deleteService: (id) => {
        const index = services.findIndex(service => service.id === id);
        if (index !== -1) {
            return services.splice(index, 1)[0];
        }
        return null;
    }
};
