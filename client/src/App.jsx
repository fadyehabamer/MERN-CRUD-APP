import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainScreen from './MainScreen';
import Update from './Update';
import NotFound from './NotFound';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainScreen />} />
          <Route path="/update/:id" element={<Update />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
