import { useState, useEffect } from 'react';

function GitHubRepos() {
    const [repos, setRepos] = useState([]); // State to store repositories
    const [loading, setLoading] = useState(true); // State to track loading status
    const [error, setError] = useState(null); // State to track errors
    const [currentPage, setCurrentPage] = useState(1);
    const [inputValue, setInputValue] = useState("");
    const [inputValue2, setInputValue2] = useState("");
    const [itemsPerPage, setItemPerPage] = useState('2');
    const [username, setUsername] = useState('okonji-vic');
    const [search, setSearch] = useState('');
  
  
    const handleSubmit = () => {
      setItemPerPage(inputValue);
      setUsername(inputValue2);
    };


  

    
  
  
  
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  
     // GitHub username
    const url = `https://api.github.com/users/${username}/repos`;
  
    const currentItems = repos.slice(indexOfFirstItem, indexOfLastItem);
  
    const totalPages = Math.ceil(repos.length / itemsPerPage);
    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);
  
  
    useEffect(() => {
      fetch(url)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          setRepos(data); // Store the repositories
          setLoading(false);
          console.log(data);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    }, [url]);
  
    if (loading) {
      return <p>Loading...</p>;
    }
  
    if (error) {
      return <p>Error: {error}</p>;
    }
  
    return (
      <div>
        <h1>My Repositories</h1>
        ENTER NUMBER <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} /><br/>ENTER REPOSITORY NAME
        <input type="text" value={inputValue2} onChange={(e) => setInputValue2(e.target.value)} /><br/>
        <button onClick={handleSubmit}>Enter Number</button><br/>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search Repositories"
        />
        
        <br/>

        
        <ul>
          {currentItems
            .filter((repo) => repo.name.toLowerCase().includes(search.toLowerCase()))
            .map((repo) => (
              <li key={repo.id}>
                <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                  {repo.name}
                </a>
              </li>
            ))}
        </ul>
        <div className="pagination">
          {/* Display page numbers */}
          {[...Array(totalPages)].map((_,index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={currentPage === index + 1 ? 'active' : ''}
            >
              {index + 1}
            </button>
          ))}
        </div>
  
      </div>
    );
  }
  
  // function InputPage() {
  //   const [inputValue, setInputValue] = useState("");
  //   const [submittedValue, setSubmittedValue] = useState("");
  
  //   const handleSubmit = () => {
  //     setSubmittedValue(inputValue);
  //   };
  
  //   return (
  //     <div>
  //       <input
  //         type="text"
  //         value={inputValue}
  //         onChange={(e) => setInputValue(e.target.value)}
  //       />
  //       <button onClick={handleSubmit}>Submit</button>
  //       {submittedValue && <p>Submitted Value: {submittedValue}</p>}
  //     </div>
  //   );
  // }
  
export default GitHubRepos;  