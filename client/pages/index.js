import axios from 'axios';

const LandingPage = ({ currentUser }) => {
  console.log(currentUser);
  return <h1>Landing Page</h1>;
};

LandingPage.getInitialProps = async () => {
  console.log('In the server');
  try {
    const response = await axios.get('/api/users/currentuser');
    return response.data;
  } catch (err) {
    console.log(err);
    return { currentUser: null };
  }
};

export default LandingPage;
