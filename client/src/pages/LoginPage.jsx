import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStateContext } from '../contexts/ContextProvider';
import login_video from "../assets/videos/login_video.mp4";
import { login, signup } from "../utils/connect.js"
import './LoginPage.sass';
import { Axios } from 'axios';

function LoginPage() {
    const listElement = useRef(null);
    const { setUserId } = useStateContext();
    const navigate = useNavigate();
    const registerText = "Salute to The Great Wang Zhipeng.";
    const loginText = "Salute to The Great Wang Zhipeng.";
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        setIsMobile(window.innerWidth < 1080);
    });

    const handleSignup = () => {
        listElement.current.classList.remove('bounceRight');
        listElement.current.classList.add('bounceLeft');
    };

    const handleLogin = () => {
        listElement.current.classList.remove('bounceLeft');
        listElement.current.classList.add('bounceRight');
    };

    const sumbitLoginForm = async (event) => {
        event.preventDefault();
        const username = document.querySelector('#login-username').value;
        const password = document.querySelector('#login-password').value;
        await login(username, password)
        .then(data => {
            document.querySelector('#login-username').value=""
            document.querySelector('#login-password').value=""
            if(data === "error") {
                alert("Wrong username or password!")
            }
            else {
                setUserId(data)
                navigate('/main');
            }
        })
    };

    const sumbitSignupForm = async (event) => {
        event.preventDefault();
        const username = document.querySelector('#signup-username').value;
        const email = document.querySelector('#signup-email').value;
        const password = document.querySelector('#signup-password').value;
        await signup(username, email, password)
        .then(data => {
            document.querySelector('#signup-username').value = ""
            document.querySelector('#signup-email').value = ""
            document.querySelector('#signup-password').value = ""
            document.querySelector('#confirm-password').value = ""
            if(data === "error") {
                alert("The user name have been signed up !")
            }
            else {
                listElement.current.classList.remove('bounceLeft');
                listElement.current.classList.add('bounceRight');
                alert("Thanks for your sign up !")
            }
        })

    };

    const handleConfirmPasswordChange = (event) => {
        const signupPassword = document.querySelector('#signup-password').value;
        const confirmPassword = event.target.value;
    
        setPasswordsMatch(signupPassword === confirmPassword);
    
        // 如果密码匹配，则移除错误类
        if (signupPassword === confirmPassword) {
            document.querySelector('#confirm-password').classList.remove('error');
        } else {
            document.querySelector('#confirm-password').classList.add('error');
        }
    };

    return (
        <section className="user">
            {
                (!isMobile) &&
                <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                    <video
                        src={login_video}
                        type="video/mp4"
                        loop
                        controls={false}
                        muted
                        autoPlay
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                </div>
            }

            <div className="user_options-container">
                <div className="user_options-text">
                    <div className="user_options-unregistered">
                        <h2 className="user_unregistered-title">Don't have an account ?</h2>
                        <p className="user_unregistered-text">{registerText}</p>
                        <button className="user_unregistered-signup" id="signup-button" onClick={handleSignup} type="button">Sign up</button>
                    </div>

                    <div className="user_options-registered">
                        <h2 className="user_registered-title">Have an account ?</h2>
                        <p className="user_registered-text">{loginText}</p>
                        <button className="user_registered-login" id="login-button" onClick={handleLogin} type="button">Login</button>
                    </div>
                </div>

                <div className="user_options-forms" id="user_options-forms" ref={listElement}>
                    <div className="user_forms-login">
                        <h2 className="forms_title">Login</h2>
                        <form className="forms_form">
                        <fieldset className="forms_fieldset">
                            <div className="forms_field">
                            <input placeholder="User Name" className="forms_field-input" id="login-username" required autoFocus />
                            </div>
                            <div className="forms_field">
                            <input type="password" placeholder="Password" className="forms_field-input" id="login-password" required />
                            </div>
                        </fieldset>
                        <div className="forms_buttons">
                            <button type="button" className="forms_buttons-forgot" id="reset-password">Forgot password?</button>
                            <input type="submit" value="Log In" className="forms_buttons-action" id="submit-login-form" onClick={sumbitLoginForm} />
                        </div>
                        </form>
                    </div>
                    <div className="user_forms-signup">
                        <h2 className="forms_title">Sign Up</h2>
                        <form className="forms_form">
                        <fieldset className="forms_fieldset">
                            <div className="forms_field">
                                <input placeholder="User Name" className="forms_field-input" id="signup-username" required autoFocus />
                            </div>
                            <div className="forms_field">
                                <input placeholder="Email" className="forms_field-input" id="signup-email" required autoFocus />
                            </div>
                            <div className="forms_field">
                                <input type="password" placeholder="Password" className="forms_field-input" id="signup-password" required />
                            </div>
                            <div className="forms_field">
                                <input
                                    type="password"
                                    placeholder="Confirm Password"
                                    className={`forms_field-input ${passwordsMatch ? '' : 'error'}`}
                                    id="confirm-password"
                                    required
                                    onChange={handleConfirmPasswordChange}
                                />
                            </div>
                        </fieldset>
                        <div className="forms_buttons">
                            <input type="submit" value="Sign up" className="forms_buttons-action" id="submit-signup-form" onClick={sumbitSignupForm}/>
                        </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default LoginPage;