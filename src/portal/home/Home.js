import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import axios from 'axios';

const Home = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Retrieve the user token from localStorage
    const token = localStorage.getItem("user-token");

    // Only make the API call if the token is available
    if (token) {
      const profileAPI = "https://api.escuelajs.co/api/v1/auth/profile";
      axios
        .get(profileAPI, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          // The response contains the user profile data
          setUserData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching profile data:", error);
        });
    }
  }, []);

  if (!userData) {
    return <div>Loading...</div>; // or any other handling while fetching data
  }

  return (
    <React.Fragment>
      <Container className='py-5'>
        <p>
          <strong>Id:</strong> {userData.id}
        </p>
      </Container>
    </React.Fragment>
  );
};

export default Home;
