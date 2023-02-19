const BASE_URL = 'http://localhost:3000/api';

export const PropertiesAPI = {
    getProperties: function () {
        return fetch(`${BASE_URL}/properties`);
    },
};
