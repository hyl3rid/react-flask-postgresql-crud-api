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
    <>
      <header>
        <a href='/'>Home</a>
        <a href='/manage'>Manage</a>
        <a href='/add'>Add</a>
        <a href='/profile'>Profile</a>
        <button onClick={logMeOut}>Logout</button>
      </header>
      <style>{`
      a {
        padding-right: 10px; 
      }
      `}</style>
    </>
  );
}

export default Header;
