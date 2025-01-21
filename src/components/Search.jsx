import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Search = ({ onSelectImage }) => {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);

  const handleSearch = async (event) => {
    if (event) event.preventDefault();

    const API_KEY = "T3Y4479ahFMbUF7kyqCA9SS5vDlvso6I4Yt49Gka7yLPZiLs0DWdjWtW";
    const endpoint = `https://api.pexels.com/v1/search?query=${query}&per_page=10`;

    try {
      const response = await axios.get(endpoint, {
        headers: {
          Authorization: API_KEY,
        },
      });
      setImages(response.data.photos || []);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch(event);
    }
  };

  return (
    <div className="container text-center">
      <div className="mb-4">
        <input
          type="text"
          className="form-control form-control-lg"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for images"
          onKeyDown={handleKeyDown}
        />
      </div>
      <button type="submit" className="btn btn-primary" onClick={handleSearch}>
        Search
      </button>
      <div className="row mt-4">
        {images.map((image) => (
          <div key={image.id} className="col-6 col-md-4 col-lg-3 mb-3">
            <Link
              to={`/canvas/${image.id}`}
              className="card"
              style={{ cursor: "pointer" }}
            >
              <img
                src={image.src.medium}
                alt={image.photographer}
                className="card-img-top"
              />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
