import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Undangan from './pages/Undangan';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/undangan" element={<Undangan />} />
      </Routes>
    </BrowserRouter>
  );
}
