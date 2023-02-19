import React from 'react';
import { useProperties } from '../../api/useProperties';
import PropertyCard from '../PropertyCard';
import './PropertyListing.scss';

const PropertyListing = () => {
    const { loading, data, error } = useProperties();

    return (
        <div className="PropertyListing">
            {loading && <div className="message">Loading...</div>}
            {data?.length === 0 && <div className="message">No results found</div>}
            {data?.length > 0 && (
                <ul>
                    {data.map((property, index) => (
                        <li key={index}>
                            <PropertyCard {...property} />
                        </li>
                    ))}
                </ul>
            )}
            {error && <div className="error">{error}</div>}
        </div>
    );
};

export default PropertyListing;
