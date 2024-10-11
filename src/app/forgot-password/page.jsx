'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SendVerificationCode() {
  const [email, setEmail] = useState('');
  const router = useRouter();

  const generateCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();  // Génère un code à 6 chiffres
  };

  const handleSendCode = () => {
    if (!email) {
      alert('Please enter an email address.');
      return;
    }

    // Simuler l'envoi du code par email en stockant le code dans le localStorage
    const code = generateCode();
    localStorage.setItem('verificationCode', code);  // Sauvegarde du code
    localStorage.setItem('email', email);  // Sauvegarde de l'email pour plus tard

    alert(`A verification code has been sent to ${email}.`);

    // Redirige vers la page de vérification du code
    // Vérifie si router est défini avant d'utiliser router.push
    if (router) {
      router.push('/verify-code');
    } else {
      console.error("Router is not available.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-semibold text-center mb-6">Send Verification Code</h1>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="mb-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button
            type="button"
            onClick={handleSendCode}
            className="w-full bg-black text-white p-3 rounded-lg hover:bg-gray-800 transition duration-300"
          >
            Send Verification Code
          </button>
        </form>
      </div>
    </div>
  );
}
