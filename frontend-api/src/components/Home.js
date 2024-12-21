import React, { useState, useEffect } from 'react';
function Home() {
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = () => {
      fetch('http://127.0.0.1:5000')
        .then((response) => response.json())
        .then((data) => {
          setData(data);
        })
        .catch((e) => console.log(e));
    };
    fetchData();
  }, []);
  return (
    <div className='App'>
      <header className='App-header'>
        <h1>Consuming API from Postgresql and Flask.</h1>
      </header>
      <main>
        {data &&
          data.map((element, index) => {
            return (
              <div key={element.id}>
                <img src={element.cover_image} alt={element.book_name} />
                <p>{element.book_name}</p>
                <p>{element.author}</p>
              </div>
            );
          })}
      </main>
    </div>
  );
}

export default Home;
