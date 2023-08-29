import React from 'react'
import { Button } from 'react-bootstrap'
import './style.css'

const Login = () => {

    const googleAuth = () => {
        window.open(
            `http://localhost:8080/auth/google/callback`,
            "_self"
        );
    }

    
    return (
        <>
            <div className='loginPage'>
                <Button className='googleButton' variant="white" onClick={googleAuth}>
                    <img className='googleImg' src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png" alt='' />
                    Sing in with Google
                </Button >
            </div>
        </>
    )
}

export default Login