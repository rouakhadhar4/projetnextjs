'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [resetSuccess, setResetSuccess] = useState(null); // null : en attente, true : succès, false : échec
  const router = useRouter();

  const handleResetPassword = () => {
    // Vérifie si les mots de passe correspondent
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match.');
      setResetSuccess(false);
      setTimeout(() => {
        router.push('/signin');  // Redirection après l'erreur
      }, 2000);  // Redirige après 2 secondes pour permettre à l'utilisateur de voir l'erreur
      return;
    }

    // Vérifie si le mot de passe est suffisamment long
    if (newPassword.length < 6) {
      alert('Password must be at least 6 characters long.');
      setResetSuccess(false);
      setTimeout(() => {
        router.push('/signin');  // Redirection après l'erreur
      }, 2000);  // Redirige après 2 secondes
      return;
    }

    // Simule l'enregistrement du nouveau mot de passe (ici nous utilisons localStorage pour la démonstration)
    const user = JSON.parse(localStorage.getItem('user')) || {};
    user.password = newPassword;
    localStorage.setItem('user', JSON.stringify(user));

    // Si tout est correct, indique que la réinitialisation a réussi
    setResetSuccess(true);
    
    // Redirige vers la page de connexion après 2 secondes
    setTimeout(() => {
      router.push('/signin');
    }, 2000);  // Redirection après 2 secondes
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-semibold text-center mb-6">Reset Your Password</h1>
        <div className="mb-4">
          <input
            type="password"
            name="newPassword"
            placeholder="New Password"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="button"
          onClick={handleResetPassword}
          className="w-full bg-black text-white p-3 rounded-lg hover:bg-gray-800 transition duration-300"
        >
          Reset Password
        </button>
        {resetSuccess === true && (
          <div className="mt-4 text-center text-green-500">
            Password has been reset successfully! Redirecting to sign in...
          </div>
        )}
        {resetSuccess === false && (
          <div className="mt-4 text-center text-red-500">
            Failed to reset password. Redirecting to sign in...
          </div>
        )}
      </div>
    </div>
  );
}
