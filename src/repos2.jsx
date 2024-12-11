import { useState } from "react";
import { Link } from "react-router-dom";
import Navigation from "./Navigation";
import "./App.css";
import { set } from "zod";

function GitHubRepos2({
  inputValue2,
  setInputValue2,
  username,
  setUsername,
  repos,
  setRepos,
  loading,
  setloading,
  error,
  setError,
  inputValue,
  setInputValue,
  itemsPerPage,
  setItemsPerPage,
  currentPage,
  setCurrentPage,

}) {
  
  
  const [search, setSearch] = useState("");


  
  const handleSubmit = () => {
    if (inputValue && !isNaN(inputValue)) {
      setItemsPerPage(Number(inputValue));
    }
    if (inputValue < 1) {
      setItemsPerPage(1);
    }
    if (inputValue2.trim()) {
      setUsername(inputValue2);
    }
  };

  
  const sortRepos = (sortType) => {
    const reposCopy = [...repos];

    if (sortType === "a-z") {
      reposCopy.sort((a, b) => a.name.localeCompare(b.name));
    }
    else if (sortType === "z-a") {
      reposCopy.sort((a, b) => b.name.localeCompare(a.name));
    }
    else if (sortType === "newest") {
       reposCopy.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    }
    else if (sortType === "oldest") {
      reposCopy.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
    }
    else if (sortType === "updated") {
      reposCopy.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
    }
     setRepos(reposCopy);
  };

  const filteredRepos = repos.filter((repo) => {
    if (!search.trim()) return true;
    return repo.name.toLowerCase().includes(search.toLowerCase());
  });


  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentItems = filteredRepos.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredRepos.length / itemsPerPage);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  
  
  return (
    <div>
      <Navigation />
      <h1>{username.toUpperCase()}'S <span>GITHUB</span> REPOSITORIES </h1>
      <div className="signin">
        <label>
          Items per page:{" "}
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter a number"
          />
        </label>
        <br />
        <label>
          GitHub Username:{" "}
          <input
            type="text"
            value={inputValue2}
            onChange={(e) => setInputValue2(e.target.value)}
            placeholder="Enter a username"
          />
        </label>
        <br />
        <button onClick={handleSubmit} className="button1" >Submit</button>
      </div>
      <br />

      <select onChange={(e) => sortRepos(e.target.value)}>
        <option value="">Sort Repositories</option>
        <option value="a-z">A-Z</option>
        <option value="z-a">Z-A</option>
        <option value="newest">Newest</option>
        <option value="oldest">Oldest</option>
        <option value="updated">Recently Updated</option>
      </select>

      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search Repositories"
      />
      
      <ul>
        {filteredRepos.length === 0 && (
          <p style={{color: 'red'}}>No repositories found for {search}</p>
        )}
        {currentItems.map((repo) => (
          <li key={repo.id}>
            <Link to="/about" state={{ repo }}>
              {repo.name}
            </Link>
            {console.log(repo)}
          </li>
        ))}
      </ul>
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
  );
}

export default GitHubRepos2;
