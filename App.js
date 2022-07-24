import React from 'react';
import Header from './components/Header/Header';
import './App.css';
import SimpleBottomNavigation from './components/MainNav';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Container } from '@mui/system';
import Popular from './Pages/Popular/Popular';
import Movies from './Pages/Movies/Movies';
import Tv from './Pages/Tv/Tv';
import Search from './Pages/Search/Search';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="App">
        <Container>
          <Routes>
            <Route path='/' element={<Popular />} />
            <Route path='/movies' element={<Movies />} />
            <Route path='/tv' element={<Tv />} />
            <Route path='/search' element={<Search />} />
          </Routes>
        </Container>
      </div>

      <SimpleBottomNavigation />
    </BrowserRouter>
  );
}

export default App;
