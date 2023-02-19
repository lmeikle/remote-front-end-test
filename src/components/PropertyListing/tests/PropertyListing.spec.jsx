import { within } from '@testing-library/dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import * as usePropertiesHooks from '../../../api/useProperties';
import PropertyListing from '../PropertyListing';

describe('PropertyListing', () => {
    it('should render a loading message when loading is true', async () => {
        jest.spyOn(usePropertiesHooks, 'useProperties').mockImplementation(() => ({
            loading: true,
            data: undefined,
            error: undefined,
        }));

        render(<PropertyListing />);

        expect(screen.queryByRole('list')).not.toBeInTheDocument();
        expect(screen.queryByText('No results found')).not.toBeInTheDocument();
        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('should render "no results found" when there are no results', async () => {
        jest.spyOn(usePropertiesHooks, 'useProperties').mockImplementation(() => ({
            loading: false,
            data: [],
            error: undefined,
        }));

        render(<PropertyListing />);

        expect(screen.queryByRole('list')).not.toBeInTheDocument();
        expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
        expect(screen.getByText('No results found')).toBeInTheDocument();
    });

    it('should render a property card for each property', async () => {
        jest.spyOn(usePropertiesHooks, 'useProperties').mockImplementation(() => ({
            loading: false,
            data: [
                {
                    id: 1,
                    bedrooms: 3,
                    summary: '1 Situated moments from the River Thames in Old Chelsea...',
                    displayAddress: '1 CHEYNE WALK, CHELSEA, SW3',
                    propertyType: 'Flat',
                    price: 1950000,
                    branchName: 'M2 Property, London',
                    propertyUrl: '/property-for-sale/property-73864112.html',
                    contactUrl: '/property-for-sale/contactBranch.html?propertyId=73864112',
                    propertyTitle: '3 bedroom flat for sale',
                    mainImage:
                        'https://media.rightmove.co.uk/dir/crop/10:9-16:9/38k/37655/53588679/37655_CAM170036_IMG_01_0000_max_476x317.jpg',
                },
                {
                    id: 2,
                    bedrooms: 1,
                    summary: 'Canary Wharf Apartment',
                    displayAddress: 'Canary Wharf',
                    propertyType: 'Flat',
                    price: 500000,
                    branchName: 'M2 Property, London',
                    propertyUrl: '/property-for-sale/property-73864112.html',
                    contactUrl: '/property-for-sale/contactBranch.html?propertyId=73864112',
                    propertyTitle: '3 bedroom flat for sale',
                    mainImage:
                        'https://media.rightmove.co.uk/dir/crop/10:9-16:9/38k/37655/53588679/37655_CAM170036_IMG_01_0000_max_476x317.jpg',
                },
            ],
            error: undefined,
        }));

        render(<PropertyListing />);

        const propertiesList = screen.getByRole('list');
        const propertyCards = await within(propertiesList).findAllByRole('listitem');
        expect(propertyCards).toHaveLength(2);
    });

    it('should render an error message when provided', async () => {
        jest.spyOn(usePropertiesHooks, 'useProperties').mockImplementation(() => ({
            loading: false,
            data: undefined,
            error: 'some error',
        }));

        render(<PropertyListing />);

        expect(screen.queryByRole('list')).not.toBeInTheDocument();
        expect(screen.queryByText('No results found')).not.toBeInTheDocument();
        expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
        expect(screen.getByText('some error')).toBeInTheDocument();
    });
});
