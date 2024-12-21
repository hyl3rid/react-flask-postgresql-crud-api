import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Add() {
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

  let navigate = useNavigate();

  const changeHandler = (e, index) => {
    setData((d) => {
      d[index][e.target.name] = e.target.value;
      return [...d];
    });
  };

  const submitHandler = (e, id, index) => {
    e.preventDefault();
    fetch('http://127.0.0.1:5000/update/' + id + '/' + index, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          console.log(data);
        }
      });
  };

  const deleteHandler = (e, id) => {
    e.preventDefault();
    fetch('http://127.0.0.1:5000/delete/' + id, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          setData(data);
        }
      });
  };

  return (
    <div>
      <header className='App-header'>
        <h1>Add books to the API</h1>
        {data &&
          data.map((element, index) => {
            return (
              <>
                <form
                  key={index}
                  onSubmit={(e) => submitHandler(e, element.id, index)}
                >
                  <p>ID: {element.id}</p>
                  <p>Book: {element.book_name}</p>
                  <p>Author: {element.author}</p>
                  <img src={element.cover_image} alt={element.book_name} />
                  <br />
                  <input
                    type='text'
                    name={Object.keys(data[index])[1]}
                    placeholder='Book name'
                    value={data[index].book_name}
                    onChange={(e) => changeHandler(e, index)}
                  />
                  <input
                    type='text'
                    name={Object.keys(data[index])[0]}
                    placeholder='Author'
                    value={data[index].author}
                    onChange={(e) => changeHandler(e, index)}
                  />
                  <input
                    type='text'
                    name={Object.keys(data[index])[2]}
                    placeholder='Cover Image'
                    value={data[index].cover_image}
                    onChange={(e) => changeHandler(e, index)}
                  />
                  <button type='submit'>Update data</button>
                  <button onClick={(e) => deleteHandler(e, element.id)}>
                    Delete
                  </button>
                  <br />
                  <hr />
                </form>
              </>
            );
          })}
      </header>
    </div>
  );
}

export default Add;
