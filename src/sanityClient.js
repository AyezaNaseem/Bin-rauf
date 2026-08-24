import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: '4gnseu5w',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2024-08-24',
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);