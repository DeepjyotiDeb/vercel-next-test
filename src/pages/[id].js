import { ObjectId } from 'mongodb';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import clientPromise from '../libs/mongodb';

// "638c28092b9f7f9a1a250ba2"
export default function Post(props) {
  //   console.log('props', props.post[0]);
  const [post, setPost] = useState({
    title: props.post[0].title,
    body: props.post[0].body,
  });
  return (
    <div>
      <p>Header Text:</p>
      {post.title && <p>{post.title}</p>}
      {post.body && <p>{post.body}</p>}
    </div>
  );
}

export async function getStaticPaths() {
  if (process.env.SKIP_BUILD_STATIC_GENERATION) {
    return {
      paths: [],
      fallback: 'blocking',
    };
  }
  const client = await clientPromise;
  const db = client.db('trpctest');
  const allPosts = await db.collection('Post').find({}).toArray();
  const paths = allPosts.map((post) => ({
    params: { id: post._id.toString() },
  }));

  return {
    paths,
    fallback: false, // can also be true or 'blocking'
  };
}

export async function getStaticProps(context) {
  const { id } = context.params;
  const client = await clientPromise;
  const db = client.db('trpctest');
  const allPosts = await db
    .collection('Post')
    .find({ _id: { $in: [ObjectId(id)] } })
    .toArray();

  return {
    props: { post: JSON.parse(JSON.stringify(allPosts)) },
  };
}
