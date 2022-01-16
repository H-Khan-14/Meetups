import Head from 'next/head';
import { MongoClient } from 'mongodb';

import MeetUpList from '../components/meetups/MeetupList';

function HomePage(props) {
  return (
    <>
      <Head>
        <title>React Meetups</title>
        <meta name="description" content="Browse through a list of meetups!" />
      </Head>
      <MeetUpList meetups={props.meetups} />
    </>
  );
}

// export async function getServerSideProps(context) {
//   const req = context.req; // request object
//   const res = context.res; // response object

//   // fetch data from and API

//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// }

export async function getStaticProps() {
  const client = await MongoClient.connect(
    'mongodb+srv://HKBob:HK078614@cluster0.bvuwm.mongodb.net/meetups?retryWrites=true&w=majority'
  );
  const db = client.db();

  const meetupsCollection = db.collection('meetups');

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        image: meetup.image,
        address: meetup.address,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 10,
  };
}

export default HomePage;
