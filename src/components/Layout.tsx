"use client";

import React, { useState } from "react";
import Link from "next/link";
import { HiMenu, HiX } from "react-icons/hi";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
// Mobile Burger Menu
function BurgerMenu() {
  const [open, setOpen] = useState(false);
  return (
    <div className="lg:hidden">
      <button
        onClick={() => setOpen(!open)}
        className="text-gray-600 hover:text-gray-900 focus:outline-none">
        {open ? <HiX size={24} /> : <HiMenu size={24} />}
      </button>
      {open && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md text-center">
          <Link href="/patterns" className="block p-4 hover:bg-gray-100">
            Patterns
          </Link>
          <Link href="/flows/builder" className="block p-4 hover:bg-gray-100">
            Flows Builder
          </Link>
          <Link href="/flows" className="block p-4 hover:bg-gray-100">
            All Flows
          </Link>
          <Link href="/admin" className="block p-4 hover:bg-gray-100">
            Admin
          </Link>
        </div>
      )}
    </div>
  );
}

export function Header() {
  return (
    <header className="bg-white shadow-md fixed w-full z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <Link href="/" className="text-xl font-semibold text-gray-800">
          Bank UX Hub
        </Link>

        <div className="flex items-center space-x-4">
          <div className="hidden lg:flex space-x-4">
            <Link
              href="/patterns"
              className="text-gray-600 hover:text-gray-900">
              Patterns
            </Link>
            <Link
              href="/flows/builder"
              className="text-gray-600 hover:text-gray-900">
              Flows
            </Link>
            <Link href="/admin" className="text-gray-600 hover:text-gray-900">
              Admin
            </Link>
          </div>

          <SignedOut>
            <SignInButton>
              <button className="text-sm px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
                Sign In
              </button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>

          <BurgerMenu />
        </div>
      </div>
    </header>
  );
}

// Footer component
export function Footer() {
  return (
    <footer className="bg-gray-100 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Bank UX Hub. All rights reserved.
      </div>
    </footer>
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}

      <Header />

      {/* Main Content */}
      <main className="pt-16 flex-grow bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} Bank UX Hub. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
