import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";

function Login() {
    const history = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const signIn = e => {
        e.preventDefault();

        //firebase login

        auth
            .signInWithEmailAndPassword(email, password)
            .then(auth => {
                history("/");
            })
            .catch(error => alert(error.message));
    };

    const register = e => {
        e.preventDefault();

        auth
            .createUserWithEmailAndPassword(email, password)
            .then(auth => {
                // it successfully created a new user with email and password
                if (auth) {
                    history("/");
                }
            })
            .catch(error => alert(error.message));
    };

    return (
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
            <div className='login mx-auto max-w-lg'>

                <h1 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">
                    flipfashion.
                </h1>
                <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
                    We provide best fashionable trendy outfit suggestions.
                </p>
                <form className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8">
                    <p className="text-center text-lg font-medium">Sign in to your account</p>
                    <div>
                        <label htmlFor="email" className="sr-only">Email</label>
                        <div className="relative">
                            <input type='email' value={email} onChange={e => setEmail(e.target.value)} className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm" placeholder="Enter email" id="email" />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="password" className="sr-only">Password</label>
                        <div className="relative">
                            <input type='password' value={password} onChange={e => setPassword(e.target.value)} className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm" placeholder="Enter password" id="password" />  </div></div>

                    <button type='submit' onClick={signIn} className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-lg font-medium text-white">Sign In</button>
                    <p className="text-center text-sm text-gray-500">
                        No account?
                        <a className="underline w-full text-blue-700 rounded-lg px-5 py-3 cursor-pointer" href='#' onClick={register}>Sign up</a>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Login;