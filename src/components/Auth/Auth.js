import React,{useState} from 'react';
import { Avatar, Button, Paper, Grid, Typography, Container} from '@material-ui/core'
import LockOutlineIcon from '@material-ui/icons/LockOpenOutlined';
import useStyles from './style';
import Input from './Input';
import {GoogleLogin} from 'react-google-login';
import Icon from './icon'
import { useDispatch } from 'react-redux';
import {useHistory} from 'react-router-dom'
import {signin,signup} from '../../actions/auth'

const initialState = {firstName:'', lastName: '', email:'', password:'',comfirmPassword:''}

const Auth = () => {
    const classes = useStyles();
    const [ShowPassword,setShowPassword] = useState(false);
    const [isSignup, setisSignup] = useState(false);
    const [formData, setFormData] = useState(initialState);
    const dispatch = useDispatch();
    const history = useHistory();

    
    const handleShowPassword = ()=>setShowPassword((prevShowPassword) =>!prevShowPassword);

    const handleSubmit = (e) => {
        e.preventDefault();
        if(isSignup){
            
            dispatch(signup(formData,history));


        }else{
            dispatch(signin(formData,history));

        }
        //console.log(formData);

    };

    const handleChange = (e) => {
        setFormData({...formData,[e.target.name]:e.target.value})

    };

    const switchMode = ()=>{
        setisSignup((preIsSignup)=>!preIsSignup);
        setShowPassword(false);
    }

    const googleSuccess = async (res)=>{
        const result =res?.profileObj;
        const token = res?.tokenId;   
        try {
            dispatch({type:'AUTH',data:{result,token}});

            history.push('/');
        } catch (error) {
            console.log(error);
        }

    }

    const googleFailure=()=>{
        console.log("Google Sign In was unsuccessful");
    }

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlineIcon />
                </Avatar>
                <Typography variant="h5">{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {isSignup && (
                            <>
                                <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                                <Input name="lastName" label="Last Name" handleChange={handleChange} autoFocus half />

                            </>

                        )}
                        <Input name="email" label ="Email Address" handleChange ={handleChange} type ="email" />
                        <Input name ="password" label ="Password" handleChange = {handleChange} type={ShowPassword? "text":"password"} handleShowPassword={handleShowPassword} />
                        {isSignup&&<Input name="confirmPassword" label="Repeat Password" handleChange = {handleChange} type="password" /> }
                        
                        
                        <Button type= "submit" fullWidth variant ="contained" color ="primary" className={classes.submit} > 
                            {isSignup ?'Sign Up' : 'Sign In'}
                        </Button>
                        <GoogleLogin 
                            clientId="1057041269188-nf4fnjf9img1l08iiqgdpm5kjuh6oj0d.apps.googleusercontent.com"
                            render={(renderProps)=>(
                                <Button 
                                    className={classes.googleButton} 
                                    color ="primary" 
                                    fullWidth 
                                    onClick={renderProps.onClick} 
                                    disabled={renderProps.disabled} 
                                    startIcon={<Icon />} 
                                    variant = "contained" 
                                >
                                    Google Sign In
                                </Button>
                            )}
                            onSuccess={googleSuccess}
                            onFailure={googleFailure}
                            cookiePolicy = "single_host_origin"
                        />
                       
                        <Grid container justify="flex-end">
                            <Grid item>
                                <Button onClick={switchMode}>
                                    {isSignup?'Already hava an account? Sign In':"Don't hava an account? Sign Up"}
                                </Button>
                            </Grid>

                        </Grid>
                    </Grid>

                </form>
            </Paper>
        </Container >

    )
}

export default Auth
