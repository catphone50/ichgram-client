import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import styles from "./Search.module.css";
import { fetchSearchResults } from "../../store/features/search/searchActions";
import { useDispatch, useSelector } from "react-redux";
import avatar from "../../assets/icons/benutzer.svg";

const Search = ({ closeSearch }) => {
  const { register, watch } = useForm();
  const [results, setResults] = useState([]);
  const searchQuery = watch("query", "");
  const dispatch = useDispatch();

  const { error } = useSelector((state) => ({
    error: state.search.error,
  }));

  const fetchResults = async (query) => {
    if (query.trim() === "") {
      setResults([]);
      return;
    }

    try {
      const response = await dispatch(fetchSearchResults(query));
      const data = response.payload;
      setResults(data || []);
    } catch (error) {
      console.error("Error fetching search results:", error);
      setResults([]);
    }
  };

  React.useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchResults(searchQuery);
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  return (
    <div className={styles.modalBackdrop} onClick={closeSearch}>
      <div className={styles.container} onClick={(e) => e.stopPropagation()}>
        <p className={styles.title}>Search</p>
        <div className={styles.inputContainer}>
          <input
            type="text"
            placeholder="Search..."
            {...register("query")}
            className={styles.input}
          />
        </div>

        <div className={styles.results}>
          {results.length > 0 &&
            results.map((user) => (
              <Link
                to={`/profile/${user._id}`}
                key={user._id}
                className={styles.resultItem}
                onClick={closeSearch}
              >
                <img
                  src={user.avatar || avatar}
                  alt={user.username}
                  className={styles.avatar}
                />
                {user.username}
              </Link>
            ))}
          {error && <p className={styles.error}>{error.message}</p>}
        </div>
      </div>
    </div>
  );
};

export default Search;
