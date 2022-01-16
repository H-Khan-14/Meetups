import Head from 'next/head';
import { useRouter } from 'next/router';
import NewMeetUpForm from '../components/meetups/NewMeetupForm';

function NewMeetUp() {
  const router = useRouter();
  async function addMeetUpHandler(enteredMeetUpData) {
    const response = await fetch('/api/new-meetup', {
      method: 'POST',
      body: JSON.stringify(enteredMeetUpData),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    console.log(data);

    router.push('/');
  }

  return (
    <>
      <Head>
        <title>Add a New Meetup</title>
        <meta
          name="description"
          content="Add your own meetups and create amaxing memories!"
        />
      </Head>
      <NewMeetUpForm onAddMeetup={addMeetUpHandler} />
    </>
  );
}

export default NewMeetUp;
