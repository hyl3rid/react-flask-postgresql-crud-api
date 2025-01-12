import { useState } from 'react';

function Login(props) {
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });

  function logMeIn(event) {
    fetch('http://127.0.0.1:5000/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: loginForm.email,
        password: loginForm.password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        props.setToken(data.access_token);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
        }
      });

    setLoginForm({
      email: '',
      password: '',
    });

    event.preventDefault();
  }

  function handleChange(event) {
    const { value, name } = event.target;
    setLoginForm((prevNote) => ({
      ...prevNote,
      [name]: value,
    }));
  }

  return (
    <div>
      <h1>Login</h1>
      <p>Username: test, Password: test</p>
      <form action=''>
        <input
          onChange={handleChange}
          type='email'
          text={loginForm.email}
          name='email'
          placeholder='Email'
          value={loginForm.email}
        />
        <input
          onChange={handleChange}
          type='password'
          text={loginForm.password}
          name='password'
          placeholder='Password'
          value={loginForm.password}
        />
        <button onClick={logMeIn}>Submit</button>
      </form>
    </div>
  );
}

export default Login;
