import React, { useState } from 'react';
import { TextField, IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { useDispatch } from 'react-redux';
import { searchUsers } from './reducer';

export const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const dispacth = useDispatch();


    const handleChange = ({ target: { value } }) => {
        setSearchTerm(value);
    }

    const handleClick = () => {
        dispacth(searchUsers(searchTerm));
    }

    return (
        <>
            <TextField
                variant='outlined'
                value={searchTerm}
                onChange={handleChange}
                placeholder='Search user by name' />
            <IconButton onClick={handleClick}>
                <SearchIcon color='primary' />
            </IconButton>
        </>
    );
}