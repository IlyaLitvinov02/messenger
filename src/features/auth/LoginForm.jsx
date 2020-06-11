import React from 'react';
import { useForm } from 'react-hook-form';
import { Button, TextField, ListItem } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { signIn } from './reducer';

export const LoginForm = () => {
    const { handleSubmit, register, errors } = useForm();
    const dispatch = useDispatch();

    const onSubmit = ({ email, password }) => {
        dispatch(signIn(email, password));
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <ListItem>
                <TextField
                    label='Email'
                    name='email'
                    type='email'
                    inputRef={register({ required: true })}
                    variant="outlined"
                    error={errors.email}
                    helperText='Email is required' />
            </ListItem>
            <ListItem>
                <TextField
                    label='Password'
                    name='password'
                    type='password'
                    inputRef={register({ required: true })}
                    variant="outlined"
                    error={errors.password}
                    helperText='Password is required' />
            </ListItem>
            <ListItem>
                <Button type='submit'>Log in</Button>
            </ListItem>
        </form>
    );
}