import React from 'react';
import { FaSearch } from 'react-icons/fa';

const Search = () => {
    const handleSearch = async e => {
        e.preventDefault();
    }

    return (
        <form className='search' onSubmit={handleSearch}>
            <input type='text' placeholder='Search for products' />
            <button type='submit'>
                <FaSearch />
            </button>
        </form>
    );
}

export default Search;