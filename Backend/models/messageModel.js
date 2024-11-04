export let messages = [];

export const getMessages = () => messages;

export const addMessage = (message) => {
    messages.push(message);
    return message;
};