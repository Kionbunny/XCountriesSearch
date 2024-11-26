/** @format */
import axios from "axios";
import "./App.css";
import { useEffect, useState } from "react";

const App = () => {
  const [search, setSearch] = useState(""); // Stores user search input
  const [countries, setCountries] = useState([]); // Stores fetched country data
  const [isLoading, setIsLoading] = useState(false); // Loading state for API calls
  const [error, setError] = useState(""); // Error state for API errors

  useEffect(() => {
    fetchCountries();
  }, []);

  // Function to fetch country data from the API
  const fetchCountries = async () => {
    setIsLoading(true); // Start loading
    setError(""); // Clear previous errors

    try {
      const response = await axios.get("https://restcountries.com/v3.1/all");
      setCountries(response.data); // Save countries to state
    } catch (error) {
      setError("Failed to fetch countries. Please try again later.");
      console.error("Error fetching countries:", error);
    } finally {
      setIsLoading(false); // End loading
    }
  };

  // Filter countries based on search input
  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="app">
      <h1 className="header">Country Search App</h1>

      <input
        type="text"
        placeholder="Search for countries..."
        value={search}
        className="searchInput"
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Show loading message */}
      {isLoading && <p className="loading">Loading countries...</p>}

      {/* Show error message if API call fails */}
      {error && <p className="error">{error}</p>}

      {/* Show filtered countries */}
      <div className="countryGrid">
        {filteredCountries.length > 0 ? (
          filteredCountries.map((country) => (
            <div key={country.cca3} className="countryCard">
              <img
                src={country.flags.png}
                alt={`${country.name.common} flag`}
                className="flag"
              />
              <p className="countryName">{country.name.common}</p>
            </div>
          ))
        ) : (
          !isLoading && <p className="noResults">No countries found.</p>
        )}
      </div>
    </div>
  );
};

export default App;
