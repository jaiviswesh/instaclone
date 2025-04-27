import React, { useEffect, useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import axios from 'axios';
import { toast } from 'sonner';
import { Link, useNavigate } from 'react-router-dom';
import { Loader2, Instagram } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthUser } from '@/redux/authSlice';

const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: ""
    });
    const [loading, setLoading] = useState(false);
    const { user } = useSelector(store => store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const loginHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.post('http://localhost:8000/api/v1/user/login', input, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            if (res.data.success) {
                dispatch(setAuthUser(res.data.user));
                navigate("/");
                toast.success(res.data.message);
                setInput({
                    email: "",
                    password: ""
                });
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user, navigate])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
            <div className="flex flex-col w-full max-w-md">
                {/* Main login card */}
                <div className="bg-white p-8 border border-gray-300 mb-4 rounded">
                    <div className="flex justify-center mb-8">
                        {/* Instagram logo - using text as placeholder, you can replace with an image */}
                        <div className="flex items-center">
                            <Instagram className="h-6 w-6 mr-2" />
                            <h1 className="text-3xl font-serif">Instagram</h1>
                        </div>
                    </div>

                    <form onSubmit={loginHandler} className="flex flex-col gap-3">
                        <Input
                            type="text"
                            name="email"
                            placeholder="Phone number, username, or email"
                            value={input.email}
                            onChange={changeEventHandler}
                            className="focus-visible:ring-transparent bg-gray-50 text-sm py-2 px-3 border border-gray-300 rounded"
                        />
                        <Input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={input.password}
                            onChange={changeEventHandler}
                            className="focus-visible:ring-transparent bg-gray-50 text-sm py-2 px-3 border border-gray-300 rounded"
                        />
                        
                        {loading ? (
                            <Button disabled className="mt-2 bg-blue-400 hover:bg-blue-400 text-white font-semibold py-1 rounded">
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Please wait
                            </Button>
                        ) : (
                            <Button 
                                type="submit" 
                                className="mt-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 rounded"
                            >
                                Log in
                            </Button>
                        )}
                    </form>

                    <div className="flex items-center my-4">
                        <div className="flex-1 h-px bg-gray-300"></div>
                        <p className="mx-4 text-gray-500 text-sm font-semibold">OR</p>
                        <div className="flex-1 h-px bg-gray-300"></div>
                    </div>

                    <div className="flex justify-center items-center gap-2 mb-4">
                        <Instagram className="h-4 w-4 text-blue-900" />
                        <a href="#" className="text-blue-900 font-semibold text-sm">Log in with Facebook</a>
                    </div>

                    <div className="text-center">
                        <a href="#" className="text-xs text-blue-900">Forgot password?</a>
                    </div>
                </div>

                {/* Sign up option */}
                <div className="bg-white p-6 border border-gray-300 rounded text-center">
                    <p className="text-sm">
                        Don't have an account? <Link to="/signup" className="text-blue-500 font-semibold">Sign up</Link>
                    </p>
                </div>

                {/* App download section */}
                <div className="text-center mt-4">
                    <p className="text-sm mb-4">Get the app.</p>
                    <div className="flex justify-center gap-4">
                        <a href="#" className="block">
                            <img src="/api/placeholder/136/40" alt="Download on App Store" className="h-10" />
                        </a>
                        <a href="#" className="block">
                            <img src="/api/placeholder/136/40" alt="Get it on Google Play" className="h-10" />
                        </a>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="mt-8 text-xs text-gray-500 max-w-md">
                <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mb-4">
                    <a href="#" className="text-gray-500">Meta</a>
                    <a href="#" className="text-gray-500">About</a>
                    <a href="#" className="text-gray-500">Blog</a>
                    <a href="#" className="text-gray-500">Jobs</a>
                    <a href="#" className="text-gray-500">Help</a>
                    <a href="#" className="text-gray-500">API</a>
                    <a href="#" className="text-gray-500">Privacy</a>
                    <a href="#" className="text-gray-500">Terms</a>
                    <a href="#" className="text-gray-500">Top Accounts</a>
                    <a href="#" className="text-gray-500">Locations</a>
                    <a href="#" className="text-gray-500">Instagram Lite</a>
                    <a href="#" className="text-gray-500">Contact Uploading & Non-Users</a>
                </div>
                <div className="flex justify-center gap-4">
                    <select className="bg-transparent text-gray-500 text-xs">
                        <option>English</option>
                        <option>Spanish</option>
                        <option>French</option>
                    </select>
                    <span>© 2025 Instagram from Meta</span>
                </div>
            </div>
        </div>
    );
}

export default Login;