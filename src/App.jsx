//imports...
import { BrowserRouter } from 'react-router';
import Layout from './layout/Layout.jsx';
import { Navigate } from 'react-router';
import { ToastContainer } from 'react-toastify';
import { Route } from 'react-router';
import { Routes } from 'react-router';
import ScrollManager from './utils/ScrollManager.jsx';
//pages
import About from './pages/about/About.jsx';
import Events from './pages/events/Events.jsx';
import EventDetails from './pages/event-details/EventDetails.jsx';
import Home from './pages/home/Home.jsx';
import Register from './pages/register/Register.jsx';
//styles
import './App.css';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ScrollManager />
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/about" element={<Layout><About /></Layout>} />
          <Route path="/events" element={<Layout><Events /></Layout>} />
          <Route path="/event-details/:id" element={<Layout><EventDetails /></Layout>} />
          <Route path="/register" element={<Layout><Register /></Layout>} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
