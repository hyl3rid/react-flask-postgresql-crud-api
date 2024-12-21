import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Add() {
  const [bookShelf, setBookShelf] = useState({
    bookName: '',
    author: '',
    coverImage: '',
  });

  let navigate = useNavigate();

  const changeHandler = (e) => {
    setBookShelf({ ...bookShelf, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    fetch('http://127.0.0.1:5000/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        bookName: bookShelf.bookName,
        author: bookShelf,
        author,
        coverImage: bookShelf.coverImage,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          return navigate('/');
        }
      });
  };

  const { bookName, author, coverImage } = bookShelf;
  return (
    <div>
      <header className='App-header'>
        <h1>Add books to the API</h1>
        <form onSubmit={submitHandler}>
          <input
            type='text'
            name='bookName'
            placeholder='Book name'
            value={bookName}
            onChange={changeHandler}
          />
          <input
            type='text'
            name='author'
            placeholder='Author'
            value={author}
            onChange={changeHandler}
          />
          <input
            type='text'
            name='coverImage'
            placeholder='Cover Image'
            value={coverImage}
            onChange={changeHandler}
          />
          <button type='submit'>Update data</button>
        </form>
      </header>
    </div>
  );
}

export default Add;
