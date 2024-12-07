import { useState, useEffect } from "react";
import {ClipLoader} from "react-spinners";
import { Link } from "react-router-dom";

function GitHubRepos2() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [inputValue, setInputValue] = useState("");
  const [inputValue2, setInputValue2] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [username, setUsername] = useState("okonji-vic");
  const [search, setSearch] = useState("");

  const handleSubmit = () => {
    if (inputValue && !isNaN(inputValue)) {
      setItemsPerPage(Number(inputValue));
    }
    if (inputValue2.trim()) {
      setUsername(inputValue2);
    }
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

  useEffect(() => {
    setLoading(true);
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
  }, [username]);

  if (loading) return (
  <div className="spinner">
  <ClipLoader color="#36d7b7" size={50} />
  </div>
  );

  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>My GitHub Repositories</h1>
      <div>
        <label>
          Items per page:{" "}
          <input
            type="number"
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
        <button onClick={handleSubmit}>Submit</button>
      </div>
      <br />
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search Repositories"
      />
      <ul>
        {filteredRepos.length === 0 && <p>No repositories found for {search}</p>}
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
