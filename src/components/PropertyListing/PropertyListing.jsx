import React, { useEffect, useState } from 'react';
import { PropertiesAPI } from '../../api/PropertiesAPI';
import PropertyCard from '../PropertyCard';
import './PropertyListing.scss';

const PropertyListing = () => {
    const [propertiesData, setPropertiesData] = useState();
    const [error, setError] = useState();

    useEffect(() => {
        PropertiesAPI.getProperties()
            .then((response) => response.json())
            .then((data) => setPropertiesData(data))
            .catch((e) => setError(e));
    }, []);

    return (
        <>
            {!propertiesData && !error && <div>Loading...</div>}
            {propertiesData?.length === 0 && <div>No results found</div>}
            {propertiesData?.length > 0 && (
                <ul className="PropertyListing">
                    {propertiesData.map((property, index) => (
                        <li key={index}>
                            <PropertyCard {...property} />
                        </li>
                    ))}
                </ul>
            )}
            {error && <div>{error}</div>}
        </>
    );
};

export default PropertyListing;
