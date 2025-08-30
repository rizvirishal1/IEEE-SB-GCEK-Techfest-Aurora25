//imports...
import { BrowserRouter } from 'react-router';
import Layout from "./layout/Layout";
import { Navigate } from 'react-router';
import { Route } from 'react-router';
import { Routes } from 'react-router';
//pages
import Home from './pages/home/Home.js';
//styles
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Layout><Home /></Layout>} />
          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
