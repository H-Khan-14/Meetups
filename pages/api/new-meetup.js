import { MongoClient } from 'mongodb';

async function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body;

    // const { id, image, title, address, description } = data; Appear to no longer need the destructuring

    const client = await MongoClient.connect(
      'mongodb+srv://HKBob:HK078614@cluster0.bvuwm.mongodb.net/meetups?retryWrites=true&w=majority'
    );
    const db = client.db();

    const meetupsCollection = db.collection('meetups');

    const result = await meetupsCollection.insertOne(data);

    console.log(result);

    client.close();

    res.status(201).json({ message: 'Meetup Inserted!' });
  }
}

export default handler;
