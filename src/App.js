//imports...
import { BrowserRouter } from 'react-router';
import { Navigate } from 'react-router';
import { Route } from 'react-router';
import { Routes } from 'react-router';
//pages
import Home from './pages/Home';
//styles
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
