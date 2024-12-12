import "./App.css";
import GitHubRepos2 from "./repos2";
import React from "react";
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { ClipLoader } from "react-spinners";
import ErrorComponent from "./errorboundary";
import About from "./about";
import Navigation from "./Navigation";

function App() {
  const [inputValue2, setInputValue2] = useState("");
  const [username, setUsername] = useState("oluwasetemi");
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
        // setInputValue2("");
        // setInputValue("");
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });

    return () => {
      console.log("cleanup");
      setLoading(true);
    };
  }, [username]);

  if (loading)
    return (
      <div className="spinner">
        <ClipLoader color="#36d7b7" size={50} />
      </div>
    );

  if (error) return <p>Error: {error}</p>;

  return (
    <>
    <Navigation />
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
      <Route path="/error" element={<ErrorComponent />} />
      <Route path="*" element={
      <>
        <h1>404: Page Not Found</h1>
      <button><a href="/">Go to Home page</a></button>
      </>
      } />
    </Routes>
    </>
  );
}



export default App;
