import "./App.css";
import GitHubRepos2 from "./repos2";
import React from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import Navigation from "./Navigation";
import { useState, useEffect } from "react";
import { ClipLoader } from "react-spinners";
import { set } from "zod";

function App() {
  const [inputValue2, setInputValue2] = useState("");
  const [username, setUsername] = useState("okonji-vic");
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [inputValue, setInputValue] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(5);


  useEffect(() => {
    setLoading(true);
    document.title = `GitHub Repositories - ${username}`;
    fetch(`https://api.github.com/users/${username}/repos`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setRepos(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });

      return () => {
        console.log("cleanup");
        setRepos([]);
      }
  }, [username]);

  if (loading)
    return (
      <div className="spinner">
        <ClipLoader color="#36d7b7" size={50} />
      </div>
    );

  if (error) return <p>Error: {error}</p>;

  

  return (
    <Routes>
      <Route
        path="/"
        element={
          <GitHubRepos2
            inputValue2={inputValue2}
            setInputValue2={setInputValue2}
            username={username}
            setUsername={setUsername}
            repos={repos}
            setRepos={setRepos}
            loading={loading}
            setLoading={setLoading}
            error={error}
            setError={setError}
            inputValue={inputValue}
            setInputValue={setInputValue}
            itemsPerPage={itemsPerPage}
            setItemsPerPage={setItemsPerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        }
      />
      <Route
        path="/about"
        element={
          <About
            inputValue2={inputValue2}
            setInputValue2={setInputValue2}
            username={username}
            setUsername={setUsername}
            repos={repos}
            setRepos={setRepos}
            loading={loading}
            setLoading={setLoading}
            error={error}
            setError={setError}
            inputValue={inputValue}
            setInputValue={setInputValue}
            itemsPerPage={itemsPerPage}
            setItemsPerPage={setItemsPerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        }
      />
    </Routes>
  );
}

function About({
  inputValue2,
  setInputValue2,
  username,
  setUsername,
  repos,
  setRepos,
  loading,
  setLoading,
  error,
  setError,
  inputValue,
  setInputValue,
  itemsPerPage,
  setItemsPerPage,
  currentPage,
  setCurrentPage,
}) {
  const location = useLocation();
  const { filteredRepos } = location.state || [];
  const { repo } = location.state || {};
  
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentItems = repos.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(repos.length / itemsPerPage);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);



  return (
    <div>
      <Navigation />

      {/* Display details for a single repo if `repo` is provided */}
      {repo ? (
        <div style={{backgroundColor: '#646cff',
        textAlign: 'left',
        padding: '10px',
        margin: '20px',
        borderRadius: '5px',}}>
          <h2 >About Repository</h2>
          <p>
            <strong>Name:</strong> {repo.name}
          </p>
          <p>
            <strong>Fullname:</strong> {repo.full_name}
          </p>
          <p>
            <strong>Owner:</strong> {repo.owner.login}
          </p>
          <p>
            <strong>Description:</strong>{" "}
            {repo.description || "No description available"}
          </p>
          <p>
            <strong>URL:</strong>{" "}
            <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
              click for more details...
            </a>
          </p>
          
        </div>
        
      ) : (
        // Display all filtered repositories if `filteredRepos` is provided
        <div>
          <h2>All Filtered Repositories</h2>
          {currentItems.map((filteredRepo) => (
            <div key={filteredRepo.id} style={{backgroundColor: '#090a19',
            textAlign: 'left',
            padding: '10vw',
            margin: '20px',
            borderRadius: '20vw',}}>
              <p>
                <strong>Name:</strong> {filteredRepo.name}
              </p>
              <p>
                <strong>Fullname:</strong> {filteredRepo.full_name}
              </p>
              <p>
                <strong>Owner:</strong> {filteredRepo.owner.login}
              </p>
              <p>
                <strong>Description:</strong>{" "}
                {filteredRepo.description || "No description available"}
              </p>
              <p>Creation Date: {filteredRepo.created_at.slice(0,-10)}</p>
              <p>
                <strong></strong>{" "}
                <a
                  href={filteredRepo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  click for more details...
                </a>
              </p>
            </div>
          ))}
        
        <div className="pagination">
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={currentPage === index + 1 ? "active" : ""}
          >
            {index + 1}
          </button>
        ))}
      </div>
      </div>
      )}
      {console.log(repos)}
      {console.log(repo)}
      
      <Link to="/">Back to Repositories</Link>
    </div>
  );
}

export default App;
