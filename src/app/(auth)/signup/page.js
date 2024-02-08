"use client"

import { useAuth } from '../../../lib/context/AuthContext';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FiChevronLeft } from 'react-icons/fi';

const SignUp = () => {
    const [data, setData] = useState({
        email: '',
        password: ''
    });

    // Use the signUp method from the AuthContext
    const { signUp } = useAuth();
    const router = useRouter();

    const handleRegistration = async (e) => {
        e.preventDefault();
        try {
            await signUp(data.email, data.password);
            router.push('/request/create');
        } catch (error) {
            console.log(error.message);
        }
        console.log(data);
    };

    // Destructure data from the data object
    const { ...allData } = data;

    // Disable submit button until all fields are filled in
    const canSubmit = [...Object.values(allData)].every(Boolean);

    return (
        <div className="flex items-center justify-center">
            <div className="w-full max-w-sm rounded-lg border border-gray-200 bg-white p-4 py-8 shadow-md dark:border-gray-700 dark:bg-gray-800 sm:p-6 sm:py-10 md:p-8 md:py-14">
                <form action="" onSubmit={handleRegistration} className="group">
                    <h5 className="mb-2 text-center text-2xl font-medium text-gray-900 dark:text-white sm:text-3xl sm:font-semibold">
                        Register
                    </h5>
                    <p className="text-md mb-8 text-center">
                        Fill in the form below to create a new account
                    </p>
                    <div className="mb-5">
                        <label
                            htmlFor="email"
                            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Your email
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            className="valid:[&:not(:placeholder-shown)]:border-green-500 [&:not(:placeholder-shown):not(:focus):invalid~span]:block invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-400 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 placeholder-gray-300 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400"
                            autoComplete="off"
                            required
                            pattern="[a-z0-9._+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                            placeholder="name@company.com"
                            onChange={(e) => {
                                setData({
                                    ...data,
                                    email: e.target.value
                                });
                            }}
                        />
                        <span className="mt-1 hidden text-sm text-red-400">
                            Please enter a valid email address.{' '}
                        </span>
                    </div>
                    <div className="mb-5">
                        <label
                            htmlFor="password"
                            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Your password
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="••••••••"
                            className="valid:[&:not(:placeholder-shown)]:border-green-500 [&:not(:placeholder-shown):not(:focus):invalid~span]:block invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-400 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 placeholder-gray-300 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400"
                            pattern=".{8,}"
                            required
                            onChange={(e) => {
                                setData({
                                    ...data,
                                    password: e.target.value
                                });
                            }}
                        />
                        <span className="mt-1 hidden text-sm text-red-400">
                            Password must be at least 8 characters.{' '}
                        </span>
                    </div>

                    <button
                        type="submit"
                        disabled={!canSubmit}
                        className="mb-8 mt-2 w-full rounded-lg bg-green-600 px-5 py-3 text-center text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:cursor-not-allowed disabled:bg-gradient-to-br disabled:from-gray-100 disabled:to-gray-300 disabled:text-gray-400 group-invalid:pointer-events-none group-invalid:bg-gradient-to-br group-invalid:from-gray-100 group-invalid:to-gray-300 group-invalid:text-gray-400 group-invalid:opacity-70"
                    >
                        Create account
                    </button>
                    <div className="text-md flex items-center justify-center text-center font-medium text-gray-500 dark:text-gray-300">
                        <NextLink
                            href="/login"
                            className="flex w-32 items-center justify-between text-gray-500 hover:text-gray-800 hover:underline dark:text-gray-200 dark:hover:text-white"
                        >
                            <FiChevronLeft className="text-xl" /> Login Instead
                        </NextLink>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignUp;