import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SignUp, useClerk, useSignUp } from '@clerk/clerk-react';
import { Loader2 } from 'lucide-react';

const Signup = () => {
  const { signUp, setActive } = useSignUp();
  const { clerk } = useClerk();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await signUp.create({
        identifier: email,
        password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
      setPendingVerification(true);
    } catch (err) {
      console.error(err);
      setError(err.errors?.[0]?.message || 'Signup failed');
    }

    setLoading(false);
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await signUp.attemptEmailAddressVerification({ code });
      if (result.status === 'complete') {
        await setActive({ session: result.createdSessionId });
        navigate('/');
      } else {
        setError('Verification incomplete. Please check the code.');
      }
    } catch (err) {
      console.error(err);
      setError(err.errors?.[0]?.message || 'Verification failed');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white p-4">
      <div className="bg-gray-900 p-6 rounded-xl shadow-lg w-full max-w-md space-y-6">
        <h2 className="text-2xl font-bold text-center">
          {pendingVerification ? 'Verify Your Email' : 'Create an Account'}
        </h2>

        {!pendingVerification ? (
          <form onSubmit={handleSignup} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 rounded bg-gray-800 border border-gray-700 focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 rounded bg-gray-800 border border-gray-700 focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button
              type="submit"
              className="w-full flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
              disabled={loading}
            >
              {loading && <Loader2 className="animate-spin" size={18} />}
              Sign Up
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerify} className="space-y-4">
            <input
              type="text"
              placeholder="Verification Code"
              className="w-full p-3 rounded bg-gray-800 border border-gray-700 focus:outline-none"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
            />
            <button
              type="submit"
              className="w-full flex justify-center items-center gap-2 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded"
              disabled={loading}
            >
              {loading && <Loader2 className="animate-spin" size={18} />}
              Verify Email
            </button>
          </form>
        )}

        {error && (
          <p className="text-red-400 text-sm text-center">{error}</p>
        )}
      </div>
    </div>
  );
};

export default Signup;
