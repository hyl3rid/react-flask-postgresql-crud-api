function Header(props) {
  function logMeOut() {
    fetch('http://127.0.0.1:5000/logout', {
      method: 'POST',
    })
      .then((response) => response.json())
      .then((data) => {
        props.token();
      })
      .catch((error) => {
        console.log(error.response);
      });
  }

  return (
    <header>
      <button onClick={logMeOut}>Logout</button>
    </header>
  );
}

export default Header;
