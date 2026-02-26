import { createClient } from '@sanity/client';

export const sanityClient = createClient({
    projectId: 'o24fva91',
    dataset: 'production',
    useCdn: false,
    apiVersion: '2024-01-01',
});
