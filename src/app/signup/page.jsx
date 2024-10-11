'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignUp() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const router = useRouter();

  const validateForm = () => {
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      alert('All fields are required.');
      return false;
    }

    // Validation du format de l'email
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address.');
      return false;
    }

    // Validation de la longueur du mot de passe (exemple: au moins 6 caractères)
    if (password.length < 6) {
      alert('Password must be at least 6 characters long.');
      return false;
    }

    // Validation du mot de passe et de la confirmation
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return false;
    }

    return true;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      const user = { firstName, lastName, email, password };
      localStorage.setItem('user', JSON.stringify(user));
      alert('User signed up successfully!');
      router.push('/signin');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-semibold text-center mb-6">Sign Up</h1>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="mb-4">
            <input
              type="text"
              placeholder="First Name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Last Name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
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
          <div className="mb-4">
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
            Sign Up
          </button>
        </form>
        <p className="text-center text-sm text-blue-500 mt-4">
  Forgot your password?{' '}
  <a href="/forgot-password" className="text-blue-500 hover:underline">
    Reset here
  </a>
</p>

        <p className="text-center text-sm text-blue-500 mt-4">
          Already have an account?{' '}
          <a href="/signin" className="hover:underline">
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
}

