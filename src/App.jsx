/** @format */
import axios from "axios";
import "./App.css";
import { useEffect, useState } from "react";
const App = () => {
  const [search, setSearch] = useState("");
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    try {
      const response = await axios.get("https://restcountries.com/v3.1/all");
      setCountries(response.data);
    } catch (error) {
      console.error("something is wrong", error);
    }
  };

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search for countries..."
        value={search}
        className="searchInput"
        onChange={(e) => setSearch(e.target.value)}
      ></input>

      <div className="countryGrid">
        {filteredCountries.map((country) => {
          return (
            <div key={country.cca3} className="countryCard">
              <img
                src={country.flags.png}
                alt={country.name.common}
                className="flag"
              />
              <p className="countryName">{country.name.common}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default App;
