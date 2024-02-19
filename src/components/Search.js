import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';

const Search = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const handleSearch = async e => {
        e.preventDefault();

        if (searchQuery === '') return;

        navigate(`search/${searchQuery}`);
    }

    return (
        <form className='search' onSubmit={handleSearch}>
            <input type='text' placeholder='Search for products' value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
            <button type='submit'>
                <FaSearch />
            </button>
        </form>
    );
}

export default Search;