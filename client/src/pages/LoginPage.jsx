import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStateContext } from '../contexts/ContextProvider';
import login_video from "../assets/videos/login_video.mp4";
import { login } from "../utils/connect.js"
import './LoginPage.sass';

function LoginPage() {
    const listElement = useRef(null);
    const { setLogin } = useStateContext();
    const navigate = useNavigate();
    const registerText = "hello1";
    const loginText = "Salute to the great Wang Zhipeng.";
    const dashboardUrl = "";

    const handleSignup = () => {
        listElement.current.classList.remove('bounceRight');
        listElement.current.classList.add('bounceLeft');
        setTimeout(() => {
            listElement.current.classList.remove('bounceLeft');
            listElement.current.classList.add('bounceRight');
        }, 1000)
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
            if(data == "error") {
                alert("Wrong username or password!")
            }
            else {
                const id = data
                navigate('/main');
            }
        })
    };

    const sumbitSignupForm = () => {
        const signupEmail = document.querySelector('#signup-email').value;
        const signupPassword = document.querySelector('#signup-password').value;
    };

    return (
        <section className="user">
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
                            <input type="email" placeholder="Email" className="forms_field-input" id="signup-email" required />
                            </div>
                            <div className="forms_field">
                            <input type="password" placeholder="Password" className="forms_field-input" id="signup-password" required />
                            </div>
                            <div className="forms_field">
                            <input type="password" placeholder="Confirm Password" className="forms_field-input" id="signup-password" required />
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