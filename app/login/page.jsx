"use client";

import React, { useState } from "react";
import Image from "next/image";
import { User, Lock, Mail } from "lucide-react";
import { usePathname } from "next/navigation";

export default function AuthForm() {
  const pathname = usePathname();
  const isRegister = pathname.includes("register");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isRegister ? "/api/auth/register" : "/api/auth/login";

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();
      alert(data.message || (isRegister ? "पंजीकरण सफल!" : "लॉगिन सफल!"));
    } catch (err) {
      alert("कुछ गलती हुई है। कृपया पुनः प्रयास करें।");
    }
  };

  return (
    <section
      className={`flex justify-center items-center min-h-screen bg-gray-50 p-0 sm:p-0 md:p-6`}
    >
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg overflow-hidden p-4 sm:p-6 md:p-8">
        {/* Brand logo and site title */}
        <div className="flex flex-col items-center justify-center mb-4">
          <a href="/" className="flex flex-col items-center">
            <Image
              src="/logo.png"
              alt="Hmarduniya Logo"
              width={80}
              height={80}
              className="rounded-full mb-2 object-contain"
            />
            <div className="text-center">
              <div className="font-bold text-lg">Hmarduniya</div>
              <div className="text-xs text-gray-500">
                हमारी दुनिया - ताज़ा समाचार
              </div>
            </div>
          </a>
        </div>

        <header className="mb-4 text-center">
          <h1 className="text-2xl font-bold text-gray-800">
            {isRegister ? "पंजीकरण करें" : "लॉगिन करें"}
          </h1>
          <p className="text-sm text-gray-500">
            {isRegister
              ? "अपना नया खाता बनाएं और खबरें पढ़ें"
              : "अपने खाते में लॉगिन करें"}
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegister && (
            <div className="relative">
              <User className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="पूरा नाम"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          )}

          <div className="relative">
            <Mail className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
            <input
              type="email"
              placeholder="ईमेल"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
            <input
              type="password"
              placeholder="पासवर्ड"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-semibold transition"
          >
            {isRegister ? "खाता बनाएं" : "लॉगिन करें"}
          </button>
        </form>

        <p className="text-sm text-center mt-4 text-gray-600">
          {isRegister ? (
            <>
              पहले से खाता है?{" "}
              <a href="/login" className="text-indigo-600 hover:underline">
                लॉगिन करें
              </a>
            </>
          ) : (
            <>
              नया खाता बनाना चाहते हैं?{" "}
              <a href="/register" className="text-indigo-600 hover:underline">
                पंजीकरण करें
              </a>
            </>
          )}
        </p>
      </div>
    </section>
  );
}
