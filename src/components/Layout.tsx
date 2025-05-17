"use client";

import React, { useState } from "react";
import Link from "next/link";
import { HiMenu, HiX } from "react-icons/hi";

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

// Sidebar for desktop
function Sidebar() {
  return (
    <aside className="hidden lg:block w-56 bg-white border-r">
      <nav className="mt-6">
        <Link
          href="/patterns"
          className="block px-4 py-2 text-gray-600 hover:bg-gray-100">
          Patterns
        </Link>
        <Link
          href="/flows/builder"
          className="block px-4 py-2 text-gray-600 hover:bg-gray-100">
          Flows Builder
        </Link>
        <Link
          href="/flows"
          className="block px-4 py-2 text-gray-600 hover:bg-gray-100">
          All Flows
        </Link>
        <Link
          href="/admin"
          className="block px-4 py-2 text-gray-600 hover:bg-gray-100">
          Admin
        </Link>
      </nav>
    </aside>
  );
}

// Header component
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

// Pattern Card component
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function PatternCard({ pattern }: { pattern: any }) {
  return (
    <div className="border bg-white rounded-md shadow-sm overflow-hidden">
      {pattern.screenshots[0] && (
        <img
          src={pattern.screenshots[0]}
          alt={pattern.title}
          className="h-40 w-full object-cover"
        />
      )}
      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-800">{pattern.title}</h3>
        <p className="mt-1 text-gray-600 text-sm truncate">
          {pattern.description}
        </p>
      </div>
    </div>
  );
}

// Main Layout: header, sidebar, content, footer
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="pt-16 flex flex-1">
        <Sidebar />
        <main className="flex-grow bg-gray-50 pt-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
