import React, { useState } from 'react';
import { TextField, IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { useDispatch } from 'react-redux';
import { searchUsers, setSearchMode } from './reducer';

export const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const dispatch = useDispatch();


    const handleChange = ({ target: { value } }) => {
        setSearchTerm(value);
    }

    const handleClick = () => {
        dispatch(searchUsers(searchTerm));
        dispatch(setSearchMode(true))
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