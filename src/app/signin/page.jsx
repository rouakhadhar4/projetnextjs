'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Si le toast "Sign In Successfully" doit apparaître, afficher le toast
    if (localStorage.getItem('signInSuccess')) {
      toast.success('Sign In Successfully');
      localStorage.removeItem('signInSuccess'); // Supprime après affichage
    }
  }, []);

  const validateForm = () => {
    if (!email || !password) {
      alert('Both email and password are required.');
      return false;
    }

    // Validation du format de l'email
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address.');
      return false;
    }

    return true;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      return;
    }

    const user = JSON.parse(localStorage.getItem('user'));

    if (!user) {
      alert('No user found, please sign up first.');
      return;
    }

    if (user.email === email && user.password === password) {
      alert('Signed in successfully!');
      localStorage.setItem('signInSuccess', true); // Indicate success
      router.push('/home'); // Redirige vers la page d'accueil
    } else {
      alert('Incorrect email or password!');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-semibold text-center mb-6">Sign In</h1>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="button"
            onClick={handleSubmit}
            className="w-full bg-black text-white p-3 rounded-lg hover:bg-gray-800 transition duration-300"
          >
            Sign In
          </button>
        </form>
        
        <p className="text-center text-sm text-blue-500 mt-4">
          Forgot your password?{' '}
          <a href="/forgot-password" className="text-blue-500 hover:underline">
            Reset here
          </a>
        </p>

        <p className="text-center text-sm text-blue-500 mt-4">
          Don't have an account?{' '}
          <a href="/signup" className="text-blue-500 hover:underline">
            Sign Up
          </a>
        </p>
      </div>
      
      <ToastContainer />
    </div>
  );
}

