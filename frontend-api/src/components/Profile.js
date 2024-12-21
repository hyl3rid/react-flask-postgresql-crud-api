import { useState } from 'react';

function Profile(props) {
  const [profileData, setProfileData] = useState(null);
  function getData() {
    fetch('http://127.0.0.1:5000/profile', {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + props.token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const res = data;
        res.access_token && props.setToken(res.access_token);
        setProfileData({
          profile_name: res.name,
          about_me: res.about,
        });
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
        }
      });
  }

  return (
    <div>
      <button onClick={getData}>Get Data</button>
      {profileData && (
        <div>
          <p>Profile name: {profileData.profile_name}</p>
          <p>About me: {profileData.about_me}</p>
        </div>
      )}
    </div>
  );
}

export default Profile;
