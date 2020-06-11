import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, TextField, ListItem } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { signUp, updateUserName } from './reducer';

export const SignupForm = () => {
    const { handleSubmit, register, errors } = useForm();
    const dispatch = useDispatch();
    const [step, setStep] = useState(0);

    const onSubmit = async ({ email, password, name }) => {
        // switch (step) {
        //     case 0:
                await dispatch(signUp(email, password));
        //         setStep(1);
        //     case 1:
        //         await dispatch(updateUserName(name));
        //         setStep(2)
        //     default:
        //         throw new Error();
        // }
    }


    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {step === 0
                ? <>
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
                        <Button type='submit'>Sign up</Button>
                    </ListItem>
                </>
                : step === 1
                    ? <>
                        <ListItem>
                            <TextField
                                label='User name'
                                name='name'
                                type='name'
                                inputRef={register({ required: true })}
                                variant="outlined"
                                error={errors.email}
                                helperText='User name is required' />
                        </ListItem>
                        <ListItem>
                            <Button type='submit'>Next step</Button>
                        </ListItem>
                    </>
                    : step === 2
                    && <ListItem>
                        input photo
                    </ListItem>
            }
        </form>
    );
}