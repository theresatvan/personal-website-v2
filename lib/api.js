const TEST_POST_GRAPHQL_FIELDS = `
    sys {
        id
        createdAt
    }
    postId
    title
    body {
        json
        links {
            assets {
                block {
                    sys {
                        id
                    }
                }
                url
                description
            }
        }
    }
    date
`;

async function fetchGraphQL(query, preview = false) {
  return fetch(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${
          preview
            ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
            : process.env.CONTENTFUL_ACCESS_TOKEN
        }`,
      },
      body: JSON.stringify({ query }),
    },
  ).then((response) => response.json());
}
