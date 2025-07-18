"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-[#0d132f] text-white py-10 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-sm text-white/50 text-center md:text-left">
          &copy; {new Date().getFullYear()} Linkify. All rights reserved.
        </p>

        <nav className="flex flex-wrap justify-center gap-6 text-sm font-medium">
          <Link href="/about" className="hover:text-blue-400 transition-colors">
            About
          </Link>
          <Link href="/terms" className="hover:text-blue-400 transition-colors">
            Terms
          </Link>
          <Link href="/privacy" className="hover:text-blue-400 transition-colors">
            Privacy
          </Link>
          <Link href="/contact" className="hover:text-blue-400 transition-colors">
            Contact
          </Link>
        </nav>
      </div>
    </footer>
  );
}
