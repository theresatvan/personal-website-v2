import client from '../../lib/api';
import Image from 'next/image';
import { BLOCKS } from '@contentful/rich-text-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

const POST_QUERY = `
  query {
    testPostCollection(where: { postId: 1 }, limit: 1) {
      items {
        postId
        title
        date
        body {
          json 
          links {
            assets {
              block {
                sys {
                  id
                }
                url
                title
              }
            }
          }
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
  const asset = body.links.assets.block[0];

  const options = {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: (node) => {
        if (node.data.target.sys.id === asset.sys.id) {
          return (
            <Image
              src={asset.url}
              alt={asset.title || 'Image'}
              width={500}
              height={60}
            />
          );
        }
      },
    },
  };

  return (
    <div>
      <h1>{title}</h1>
      <p>{new Date(date).toLocaleDateString()}</p>
      <div>{documentToReactComponents(body.json, options)}</div>
    </div>
  );
}
