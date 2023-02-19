import React from 'react';
import { act, render, screen } from '@testing-library/react';
import { within } from '@testing-library/dom';
import PropertyListing from '../PropertyListing';
import fetch from 'jest-mock-fetch';

describe('PropertyListing', () => {
    afterEach(() => {
        fetch.reset();
    });

    it('should render a loading message whilst waiting for data', async () => {
        render(<PropertyListing />);

        expect(screen.queryByRole('list')).not.toBeInTheDocument();
        expect(screen.queryByText('No results found')).not.toBeInTheDocument();
        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('should render "no results found" when there are no results', async () => {
        render(<PropertyListing />);

        act(() => {
            fetch.mockResponse({
                json: () => [],
            });
        });

        expect(screen.queryByRole('list')).not.toBeInTheDocument();
        expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
        expect(screen.getByText('No results found')).toBeInTheDocument();
    });

    it('should render a property card for each property', async () => {
        render(<PropertyListing />);

        act(() => {
            fetch.mockResponse({
                json: () => [
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
            });
        });

        const propertiesList = screen.getByRole('list');
        const propertyCards = await within(propertiesList).findAllByRole('listitem');
        expect(propertyCards).toHaveLength(2);
    });

    it('should render an error message when the server returns an error', async () => {
        render(<PropertyListing />);

        act(() => {
            fetch.mockError('some error');
        });

        expect(screen.queryByRole('list')).not.toBeInTheDocument();
        expect(screen.queryByText('No results found')).not.toBeInTheDocument();
        expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
        expect(screen.getByText('some error')).toBeInTheDocument();
    });
});
