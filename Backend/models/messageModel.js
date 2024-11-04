let messages = [];

module.exports = {
    getMessages: () => messages,
    addMessage: (message) => {
        messages.push(message);
        return message;
    }
};