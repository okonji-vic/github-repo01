import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';

// Simulating an external URL content handler
function ExternalPage({ url }) {
  return (
    <div>
      <h1>Loaded External Content</h1>
      <p>This page simulates loading content from: {url}</p>
    </div>
  );
}

// Home Page Component
function Home() {
  return (
    <div>
      <h1>Home Page</h1>
      <Link to="/external-link">Go to External Page</Link>
    </div>
  );
}

// External Link Handler
function ExternalLinkHandler() {
  const navigate = useNavigate();
  
  // Simulate external URL logic
  const externalUrl = "https://example.com";
  
  React.useEffect(() => {
    // Mocking internal rendering for external content
    setTimeout(() => navigate(`/loaded-content?url=${encodeURIComponent(externalUrl)}`), 1000);
  }, [navigate, externalUrl]);
  
  return <p>Redirecting to the external page...</p>;
}

// Main App Component
function App2() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/external-link" element={<ExternalLinkHandler />} />
        <Route path="/loaded-content" element={<ExternalPage url="https://example.com" />} />
      </Routes>
    </Router>
  );
}

export default App2;

function Navigation() {

  return (
    <section className='nav-container'>
    <NavLink to = '/'
  className='nav-link'
  style={({isActive}) => isActive ? {color: 'aqua', backgroundColor: 'black', border: '0.5px solid white', borderRadius: '5px'} : {color: 'white', backgroundColor: 'rgb(55,55,105)', border: 'none', borderRadius: '5px'}}
  >
  <h4>Rating</h4>
  </NavLink>
  <NavLink 
  className='nav-link'
  style={({isActive}) => isActive ? {color: 'aqua', backgroundColor: 'black', border: '0.5px solid white', borderRadius: '5px'} : {color: 'white', backgroundColor: 'rgb(55,55,105)', border: 'none', borderRadius: '5px'}}
  to = '/assignment2'>
    <h4>Grids</h4>
  </NavLink>
  <NavLink 
  className='nav-link'
  style={({isActive}) => isActive ? {color: 'aqua', backgroundColor: 'black', border: '0.5px solid white', borderRadius: '5px'} : {color: 'white', backgroundColor: 'rgb(55,55,105)', border: 'none', borderRadius: '5px'}}
  to = '/discountapp'>
    <h4>Discount</h4>
  </NavLink>
  <NavLink
  className='nav-link'
  style={({isActive}) => isActive ? {color: 'aqua', backgroundColor: 'black', border: '0.5px solid white', borderRadius: '5px'} : {color: 'white', backgroundColor: 'rgb(55,55,105)', border: 'none', borderRadius: '5px'}}
  to = '/form'>
    <h4>Form</h4>
  </NavLink>
    </section>
  )
}