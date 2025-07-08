"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "./AuthProvider";
import { HiMenu, HiX } from "react-icons/hi";

export default function Header() {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className="bg-[#0d132f] text-white px-6 py-4 shadow-md relative z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold tracking-tight">
          Linkinfy
        </Link>

        <nav className="hidden md:flex space-x-6 items-center text-sm font-medium">
          {user ? (
            <>
              <Link href="/dashboard" className="hover:text-blue-400 transition">
                Dashboard
              </Link>
              <Link href={`/${user.username}`} className="hover:text-blue-400 transition">
                Profile
              </Link>
              <button
                onClick={logout}
                className="text-red-400 hover:text-red-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="px-4 py-2 border border-white rounded-full hover:bg-white hover:text-black transition"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="px-4 py-2 bg-white text-[#0d132f] rounded-full hover:bg-blue-100 transition"
              >
                Register
              </Link>
            </>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-white hover:text-blue-400 transition"
        >
          {menuOpen ? <HiX className="w-6 h-6" /> : <HiMenu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Nav Dropdown */}
      {menuOpen && (
        <div className="md:hidden mt-4 bg-[#0f172a] rounded-lg py-4 px-6 space-y-4 text-sm font-medium shadow-lg">
          {user ? (
            <>
              <Link href="/dashboard" className="block hover:text-blue-400" onClick={toggleMenu}>
                Dashboard
              </Link>
              <Link href={`/${user.username}`} className="block hover:text-blue-400" onClick={toggleMenu}>
                Profile
              </Link>
              <button
                onClick={() => {
                  logout();
                  toggleMenu();
                }}
                className="text-red-400 hover:text-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="block hover:text-blue-400" onClick={toggleMenu}>
                Login
              </Link>
              <Link href="/register" className="block hover:text-blue-400" onClick={toggleMenu}>
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
}
