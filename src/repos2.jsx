import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navigation from "./Navigation";
import "./App.css";

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
    const originalRepos = [...repos];

    let reposCopy = [...originalRepos];

    if (sortType === "") {
      setRepos(originalRepos);
    } else if (sortType === "a-z") {
      reposCopy.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortType === "z-a") {
      reposCopy.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortType === "newest") {
      reposCopy.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    } else if (sortType === "oldest") {
      reposCopy.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
    } else if (sortType === "updated") {
      reposCopy.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
    } else if (sortType === "leastupdated") {
      reposCopy.sort((a, b) => new Date(a.updated_at) - new Date(b.updated_at));
    } else if (sortType === "moststars") {
      reposCopy.sort((a, b) => b.stargazers_count - a.stargazers_count);
    } else if (sortType === "leaststars") {
      reposCopy.sort((a, b) => a.stargazers_count - b.stargazers_count);
    } else if (sortType === "mostforks") {
      reposCopy.sort((a, b) => b.forks_count - a.forks_count);
    } else if (sortType === "leastforks") {
      reposCopy.sort((a, b) => a.forks_count - b.forks_count);
    } else if (sortType === "description") {
      reposCopy = reposCopy.filter((repo) => repo.description !== null);
    } else if (sortType === "hasforks") {
      reposCopy = reposCopy.filter((repo) => repo.forks_count > 0);
    } else if (sortType === "noforks") {
      reposCopy = reposCopy.filter((repo) => repo.forks_count === 0);
    }  else if (sortType === "noissues") {
      reposCopy = reposCopy.filter((repo) => repo.open_issues_count === 0);
    } else if (sortType === "hasprojects") {
      reposCopy = reposCopy.filter((repo) => repo.has_projects === true);
    }  else if (sortType === "hasdownloads") {
      reposCopy = reposCopy.filter((repo) => repo.has_downloads === true);
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
      <h1>
        {username.toUpperCase()}'S <span>GITHUB</span> REPOSITORIES{" "}
      </h1>
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
        <button onClick={handleSubmit} className="button1">
          Submit
        </button>
      </div>
      <br />

      <select onChange={(e) => sortRepos(e.target.value)}>
        <option value="">Sort Repositories</option>
        <option value="a-z">A-Z</option>
        <option value="z-a">Z-A</option>
        <option value="newest">Newest</option>
        <option value="oldest">Oldest</option>
        <option value="updated">Recently Updated</option>
        <option value="leastupdated">Least Updated</option>
        <option value="moststars">Most Stars</option>
        <option value="leaststars">Least Stars</option>
        <option value="mostforks">Most Forks</option>
        <option value="leastforks">Least Forks</option>
        <option value="description">Description</option>
        <option value="hasforks">Has Forks</option>
        <option value="noforks">No Forks</option>
        <option value="noissues">No Issues</option>
        <option value="hasprojects">Has Projects</option>
        <option value="hasdownloads">Has Downloads</option>
      </select>

      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search Repositories"
      />

      <ul>
        {filteredRepos.length === 0 && search.length != 0 && (
          <p style={{ color: "red" }}>No repositories found for {search}</p>
        )}
        {currentItems.length === 0 && inputValue2.length > 0 && (
          <p style={{ color: "red" }}>
            No repositories found for username {inputValue2}
          </p>
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
