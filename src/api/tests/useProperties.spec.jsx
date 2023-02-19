import { act, renderHook, waitFor } from '@testing-library/react';
import fetch from 'jest-mock-fetch';
import { useProperties } from '../useProperties';

describe('useProperties', () => {
    afterEach(() => {
        fetch.reset();
    });

    it('should return loading is true when waiting for a response from the server', async () => {
        const { result } = renderHook(() => useProperties());

        expect(result.current).toMatchObject({
            loading: true,
            data: undefined,
            error: undefined,
        });
    });

    it('should return response data', async () => {
        const { result } = renderHook(() => useProperties());

        const mockData = [
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
        ];

        act(() => {
            fetch.mockResponse({
                json: () => mockData,
            });
        });

        await waitFor(() => {
            expect(result.current).toMatchObject({
                loading: false,
                data: mockData,
                error: undefined,
            });
        });
    });

    it('should return an error message when the server returns an error', async () => {
        const { result } = renderHook(() => useProperties());

        act(() => {
            fetch.mockError('some error');
        });

        await waitFor(() => {
            expect(result.current).toMatchObject({
                loading: false,
                data: undefined,
                error: 'some error',
            });
        });
    });
});
