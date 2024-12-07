import './App.css'
import GitHubRepos2 from './repos2'
import React from 'react';
import { Routes, Route, Link, useLocation} from 'react-router-dom';


function App() {
  return (
    
      <Routes>
        <Route path="/" element={<GitHubRepos2 />} />
        <Route path="/about" element={<About />} />
      </Routes>
  );
}


function About() {
  const location = useLocation();
  const { repo } = location.state || {};

  if (!repo) {
    return <p>No repository data available</p>;
  }

  return (
    <div>
      <h1>About Repository</h1>
      <p><strong>Name:</strong> {repo.name}</p>
      <p><strong>Fullname:</strong>{repo.full_name}</p>
      <p><strong>Owner:</strong>{repo.owner.login}</p>
      <p><strong>Description:</strong> {repo.description || "No description available"}</p>
      <p>
        <strong>URL:</strong>{" "}
        
        <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
          click for more details...
        </a>
        
      </p>
      <Link to="/">Back to Repositories</Link>
    </div>
  );
}



export default App;
