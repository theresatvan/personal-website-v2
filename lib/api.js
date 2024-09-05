import { GraphQLClient } from 'graphql-request';

const spaceID = process.env.CONTENTFUL_SPACE_ID;
const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN;

const endpoint = `https://graphql.contentful.com/content/v1/spaces/${spaceID}`;

const client = new GraphQLClient(endpoint, {
  headers: {
    authorization: `Bearer ${accessToken}`,
  },
});

export default client;
