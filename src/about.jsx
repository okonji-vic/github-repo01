import React from "react";
import { Link, useLocation } from "react-router-dom";



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
    const { repo } = location.state || {};
  
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  
    const currentItems = repos.slice(indexOfFirstItem, indexOfLastItem);
  
    const totalPages = Math.ceil(repos.length / itemsPerPage);
  
    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);
  
    return (
      <div>
  
        {/* Display details for a single repo if `repo` is provided */}
        {repo ? (
          <div
            style={{
              backgroundColor: "#090a19",
              textAlign: "left",
              padding: "10px",
              margin: "20px auto",
              borderRadius: "5px",
              maxWidth: "600px",
            }}
          >
            <h2>About Repository</h2>
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
            <p>Creation Date: {repo.created_at.slice(0, -10)}</p>
            <p>Time: {repo.created_at.slice(11, -1)}</p>
            <p>
              <strong></strong>{" "}
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
              <div
                key={filteredRepo.id}
                style={{
                  backgroundColor: "#090a19",
                  textAlign: "center",
                  padding: "3vw 10vw",
                  margin: "3vw auto",
                  borderRadius: "20vw",
                  fontSize: "2.4vw",
                  maxWidth: "50vw",
                }}
              >
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
                <p>Creation Date: {filteredRepo.created_at.slice(0, -10)}</p>
                <p>Time: {filteredRepo.created_at.slice(11, -1)}</p>
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

  export default About;