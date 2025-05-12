'use client';

import { useState } from 'react';
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [response, setResponse] = useState(null);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setResponse(null);

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });

      const result = await res.json();
      setResponse(result);

      if (result.status) {
        // TODO: Redirect or store token/session
        console.log('User logged in:', result.data);
        setTimeout(() => {
        router.push("/note");
      }, 500);
      toast.success(result?.message || "Signup successful!");
      }
    } catch (err) {
      toast.error(err.message || "Signup failed. Please try again.");  
      console.error('Login error:', err);
      setResponse({
        code: 500,
        status: false,
        message: 'Client-side error occurred.',
      });
    }
  };

  return (
    <form onSubmit={handleLogin} className="max-w-md mx-auto p-4 border rounded">
      <h2 className="text-xl font-bold mb-4">Login</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 border mb-3"
        required
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2 border mb-3"
        required
      />

      <button
        type="submit"
        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
      >
        Login
      </button>

      {response && (
        <p className={`mt-3 text-sm ${response.status ? 'text-green-600' : 'text-red-600'}`}>
          {response.message}
        </p>
      )}
    </form>
  );
}
