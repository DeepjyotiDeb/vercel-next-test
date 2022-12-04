import { ObjectId } from 'mongodb';
import clientPromise from '../../libs/mongodb';

export default async function handler(req, res) {
  try {
    const { id } = req.query;
    // console.log('id', id);
    const client = await clientPromise;
    const db = client.db('trpctest');
    switch (req.method) {
      case 'GET':
        const allPosts = await db
          .collection('Post')
          .find({ _id: { $in: [ObjectId(id)] } })
          .toArray();
        // console.log('all posts', allPosts);
        res.json({ status: 200, data: allPosts });
        break;
    }
  } catch (error) {
    console.log(error);
  }
}
