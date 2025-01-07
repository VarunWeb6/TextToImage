import Frontend from './components/frontend'; // Correcting import name
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Frontend />} /> {/* Add the element prop */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
