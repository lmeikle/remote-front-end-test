import { useEffect, useState } from 'react';
import { PropertiesAPI } from './PropertiesAPI';

export const useProperties = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(undefined);
    const [error, setError] = useState(undefined);

    useEffect(() => {
        setLoading(true);
        setData(undefined);
        setError(undefined);

        PropertiesAPI.getProperties()
            .then((response) => response.json())
            .then((data) => {
                setLoading(false);
                setData(data);
            })
            .catch((e) => {
                setLoading(false);
                setError(e);
            });
    }, []);

    return {
        loading,
        data,
        error,
    };
};
