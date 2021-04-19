import * as api from '../api';
import {AUTH} from '../constants/actionTypes'


export const signin = (formData,history) =>async (dispatch)=> {
    try {
        //log in the user

        const {data} =await api.signIn(formData);
        dispatch({type:AUTH,data});

       history.push('/');

    } catch (error) {
        console.log(error.message);
    }
};


export const signup = (formData,history) =>async (dispatch)=> {
    try {
        //sign up the uesr
        
        const {data} = await api.signUp(formData);

        dispatch({type:AUTH,data});
        
       history.push('/');

    } catch (error) {
        console.log(error.message);
    }
}

