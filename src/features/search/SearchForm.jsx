import React from 'react';
import { TextField, IconButton, ListItem } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { useDispatch } from 'react-redux';
import { searchUsers, setSearchMode } from './reducer';
import { useForm } from 'react-hook-form';




export const SearchForm = () => {
    const { register, handleSubmit, errors } = useForm();
    const dispatch = useDispatch();

    const onSubmit = ({ search }) => {
        dispatch(searchUsers(search));
        dispatch(setSearchMode(true));
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <ListItem>
                <TextField
                    name='search'
                    inputRef={register}
                    variant='outlined'
                    placeholder='Search user by name' />
                <IconButton type='submit'>
                    <SearchIcon color='primary' />
                </IconButton>
            </ListItem>
        </form>
    );
}