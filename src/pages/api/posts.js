import clientPromise from '../../libs/mongodb';

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db('trpctest');
    switch (req.method) {
      case 'GET':
        const allPosts = await db.collection('Post').find({}).toArray();
        res.json({ status: 200, data: allPosts });
        break;
    }
  } catch (error) {
    console.log(error);
  }
}
