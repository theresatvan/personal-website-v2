import client from '../../lib/api';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

const POST_QUERY = `
  query {
    testPostCollection(where: { postId: 1 }) {
      items {
        postId
        title
        date
        body {
          json
        }
      }
    }
  }
`;

export default async function Page() {
  const data = await client.request(POST_QUERY);
  console.log(JSON.stringify(data, null, 2));

  const post = data.testPostCollection.items[0];
  const { title, date, body } = post;

  return (
    <div>
      <h1>{title}</h1>
      <p>{new Date(date).toLocaleDateString()}</p>
      <div>{documentToReactComponents(body.json)}</div>
    </div>
  );
}
