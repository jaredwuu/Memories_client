import React,{useState} from 'react';
import { Avatar, Button, Paper, Grid, Typography, Container} from '@material-ui/core'
import LockOutlineIcon from '@material-ui/icons/LockOpenOutlined';
import useStyles from './style';
import Input from './Input';
import {GoogleLogin} from 'react-google-login';
import Icon from './icon'
import { useDispatch } from 'react-redux';

const Auth = () => {
    const classes = useStyles();
    const [ShowPassword,setShowPassword] = useState(false);
    const [isSignup, setisSignup] = useState(false)
    const dispatch = useDispatch()

    
    const handleShowPassword = ()=>setShowPassword((prevShowPassword) =>!prevShowPassword);

    const handleSubmit = () => {

    };
    const handleChange = () => {

    };

    const switchMode = ()=>{
        setisSignup((preIsSignup)=>!preIsSignup);
        handleShowPassword(false);
    }

    const googleSuccess = async (res)=>{
        const result =res?.profileObj;
        const token = res?.tokenId;
        console.log(result);

        try {
            dispatch({type:'Auth',data:{result,token}});
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
                                <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />

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
