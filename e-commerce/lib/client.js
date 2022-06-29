import SanityClient from '@sanity/client';
import imageUrlBillder from '@sanity/image-url';

export const client = sanityClient({
    projectid: 'rfpmlxtj',
    dataset: 'production',
    apiVersion: '2022-06-29',
    useCdn: 'true',
    token: process.env.NEXT_PUBLIC_SANITY_TOKEN
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source)