import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, TextField, ListItem } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { signUp, updateUserName } from './reducer';
import { Redirect } from 'react-router-dom';

export const SignupForm = () => {
    const isAuth = useSelector(state => state.auth.isAuth);
    const { handleSubmit, register, errors } = useForm();
    const dispatch = useDispatch();
    const [step, setStep] = useState(0);

    const onSignUp = async ({ email, password }) => {
        const result = await dispatch(signUp(email, password));
        if (result === 'success') setStep(1);
    }

    const onSubmit = ({name}) => {
        dispatch(updateUserName(name));
        setStep(2);
    }
    


    return (
        step === 0
            ? <form onSubmit={handleSubmit(onSignUp)}>
                <ListItem>
                    <TextField
                        label='Email'
                        name='email'
                        type='email'
                        inputRef={register({ required: true })}
                        variant="outlined"
                        error={!!errors.email}
                        helperText='Email is required' />
                </ListItem>
                <ListItem>
                    <TextField
                        label='Password'
                        name='password'
                        type='password'
                        inputRef={register({ required: true })}
                        variant="outlined"
                        error={!!errors.password}
                        helperText='Password is required' />
                </ListItem>
                <ListItem>
                    <Button type='submit'>Sign up</Button>
                </ListItem>
            </form>
            : step === 1
                ? <form onSubmit={handleSubmit(onSubmit)}>
                    <ListItem>
                        <TextField
                            label='User name'
                            name='name'
                            type='text'
                            inputRef={register({ required: true })}
                            variant="outlined"
                            error={errors.name}
                            helperText='User name is required' />
                    </ListItem>
                    <ListItem>
                        <Button type='submit'>Submit</Button>
                    </ListItem>
                </form>
                : isAuth && step === 2
                && <Redirect to='/main' />


    );
}