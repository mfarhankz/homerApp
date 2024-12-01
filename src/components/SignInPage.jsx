import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Loader, Eye, EyeOff } from 'lucide-react';
import ReCAPTCHA from "react-google-recaptcha";

export default function Component() {
    const { login, errorMessage } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [captchaValue, setCaptchaValue] = useState(null);

    const handleSignIn = async (e) => {
        e.preventDefault();
        /*if (!captchaValue) {
            alert("Please complete the CAPTCHA");
            return;
        }*/
        setIsLoading(true);
        await login(email, password);
        setIsLoading(false);
        navigate('/');
    };

    const handleCaptchaChange = (value) => {
        setCaptchaValue(value);
    };

    return (
        <div className="min-h-screen flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8 bg-homer-beige">
            <span className="absolute top-8 left-4 text-homer-homer-34">homer</span>
            <div className="mb-8 text-center font-semibold text-homer-blue flex flex-col px-4 pt-16">
                <div className="whitespace-nowrap text-lg sm:text-xl md:text-2xl">We are currently in private beta mode,</div>
                <div className="whitespace-nowrap text-lg sm:text-xl md:text-2xl">but we are aiming to make the HOMER</div>
                <div className="whitespace-nowrap text-lg sm:text-xl md:text-2xl">open to all TRREB licensed agents.</div>
            </div>
            <div className="max-w-sm w-full space-y-8  rounded-xl">
                <h1 className="text-2xl font-bold text-homer-blue text-center">Sign in</h1>
                <form className="mt-8 space-y-6" onSubmit={handleSignIn}>
                    <div>
                        <label htmlFor="email" className="block text-homer-blue-16">
                            Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="relative">
                        <label htmlFor="password" className="block text-homer-blue-16 mb-1">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                required
                                className="block w-full px-3 py-2 pr-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 flex items-center px-3"
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? (
                                    <EyeOff className="h-5 w-5 text-gray-500" />
                                ) : (
                                    <Eye className="h-5 w-5 text-gray-500" />
                                )}
                            </button>
                        </div>
                    </div>
                    {/* <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                id="remember-me"
                                name="remember-me"
                                type="checkbox"
                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                            />
                            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                Remember me
                            </label> 
                        </div>
                    </div>*/}
                    {/* <div className="flex justify-center">
                        <ReCAPTCHA
                            sitekey="YOUR_RECAPTCHA_SITE_KEY"
                            onChange={handleCaptchaChange}
                        />
                    </div> */}
                    <div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="group relative w-full flex items-center justify-center py-2 px-4 border button-blue border-transparent text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
                        >
                            {isLoading ? (
                                <Loader className="animate-spin mr-2" />
                            ) : (
                                'Sign In'
                            )}
                        </button>
                    </div>
                </form>
                {errorMessage && <p className="text-red-500 text-sm text-center" role="alert">{errorMessage}</p>}
            </div>
        </div>
    );
}