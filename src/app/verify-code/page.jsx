'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function VerifyCode() {
  const [code, setCode] = useState(['', '', '', '', '', '']);  // Un tableau de 6 cases
  const [correctCode, setCorrectCode] = useState('');  // Le code stocké dans le localStorage
  const [email, setEmail] = useState('');  // L'email lié à l'utilisateur
  const router = useRouter();

  // Utilisation de useEffect pour récupérer le code et l'email depuis le localStorage
  useEffect(() => {
    const storedCode = localStorage.getItem('verificationCode');
    const storedEmail = localStorage.getItem('email');
    
    // Affichage des valeurs récupérées pour le débogage
    console.log('Stored Code:', storedCode);
    console.log('Stored Email:', storedEmail);

    if (storedCode && storedEmail) {
      setCorrectCode(storedCode.trim());  // Récupère le code stocké et enlève les espaces inutiles
      setEmail(storedEmail);  // Récupère l'e-mail associé
    } else {
      // Si le code ou l'email n'existe pas dans localStorage, redirige vers la page d'envoi du code
      router.push('/send-verification-code');
    }
  }, [router]);

  // Fonction pour rediriger immédiatement vers la réinitialisation du mot de passe
  const handleResetPasswordRedirect = () => {
    // Redirection immédiate vers la page de réinitialisation du mot de passe
    console.log('Redirection vers reset-password');
    router.push('/reset-password');
  };

  const handleChange = (e, index) => {
    const value = e.target.value;

    // Vérifie que la valeur entrée est un chiffre ou vide
    if (/^\d$/.test(value) || value === '') {  
      const newCode = [...code];
      newCode[index] = value;  // Mise à jour du chiffre dans le tableau
      setCode(newCode);

      // Si une valeur est entrée, passe au champ suivant
      if (value !== '' && index < 5) {
        document.getElementById(`input-${index + 1}`).focus();
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-semibold text-center mb-6">Verify Your Code</h1>
        <div className="flex justify-center mb-4">
          {code.map((digit, index) => (
            <input
              key={index}
              id={`input-${index}`}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e, index)}
              className="w-12 h-12 mx-1 text-center text-2xl border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ))}
        </div>
        <button
          type="button"
          onClick={handleResetPasswordRedirect}  // Redirige vers la page de réinitialisation du mot de passe
          className="w-full bg-black text-white p-3 rounded-lg hover:bg-gray-800 transition duration-300"
        >
          Reset Password
        </button>
      </div>
    </div>
  );
}

