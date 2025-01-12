import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home.js';
import Add from './components/Add.js';
import Manage from './components/Manage.js';

import Header from './components/Header.js';
import useToken from './hooks/useToken.js';
import Login from './components/Login.js';
import Profile from './components/Profile.js';

function App() {
  const { token, removeToken, setToken } = useToken();

  return (
    <BrowserRouter>
      {token && <Header token={removeToken} />}
      {!token && token !== '' && token !== undefined ? (
        <Login setToken={setToken} />
      ) : (
        <Routes>
          <Route index element={<Home />} />
          <Route path='add' element={<Add />} />
          <Route path='manage' element={<Manage />} />
          <Route
            exact
            path='/profile'
            element={<Profile token={token} setToken={setToken} />}
          ></Route>
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;
