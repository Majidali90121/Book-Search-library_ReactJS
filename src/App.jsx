import { useEffect, useState } from "react";
import "./App.css"
function App() {
  const [search, setSearch] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!query) return;

    setLoading(true);

    fetch(`https://openlibrary.org/search.json?q=${query}`)
      .then((res) => res.json())
      .then((data) => {
        setBooks(data.docs.slice(0, 20));
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error: ", err);
        setLoading(false);
      });
  }, [query]);

  function handleSearch() {
    if (!search.trim()) return alert("❗ Please enter book name");
    setQuery(search.trim());
  }

  return (
    <>
    <h1>📚 Book Search App</h1>
      <div className="a">
        <input
          type="text"
          placeholder="Enter book title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className="b">
        {loading ? (
          <p>Loading...</p>
        ) : books.length > 0 ? (
          books.map((book, index) => (
            <div key={index} className="b c">
              <img
                src={
                  book.cover_i
                    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
                    : "https://via.placeholder.com/150x200?text=No+Cover"
                }
                alt={book.title}
                width="120px"
                height="180px"
              />
              <p>
                <strong>{book.title}</strong>
                <br />
                <em>
                  {book.author_name
                    ? book.author_name.join(", ")
                    : "Unknown Author"}
                </em>
              </p>
            </div>
          ))
        ) : (
          query && <p>No books found.</p>
        )}
      </div>
    </>
  );
}

export default App;
