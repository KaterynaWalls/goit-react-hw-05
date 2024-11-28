import React, {useState} from 'react';
import PropTypes from "prop-types";
import s from "./SearchBar.module.css";

const SearchBar = ({ onSubmit}) => {
    const [inputValue, setInputValue] = useState("");
    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };
    const handleFormSubmit =(e)=> {
        e.preventDefault();
        const trimmedQuery = inputValue.trim();

        if (!trimmedQuery) {
            onSubmit("");
            setInputValue("");
            return;

        }
        onSubmit(trimmedQuery);
        setInputValue("");
    }
    return (
        <form className={s.form} onSubmit={handleFormSubmit}>
          <input
            className={s.input}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Let's find your blockbuster!"
            aria-label="Movie search input"
          />
          <button className={s.btnSearch} type="submit">
            Search
          </button>
        </form>
      );
    };
    
    SearchBar.propTypes = {
      onSubmit: PropTypes.func.isRequired, 
    };
    
    export default SearchBar;
