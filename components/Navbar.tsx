'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleEmergencyCall = () => {
    if (window.confirm('Do you want to call emergency services?')) {
      window.open('tel:112', '_self');
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full border-b border-white/5 bg-gray-950/40 backdrop-blur-xl z-50">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center ">
              <Link href={'/'} className="flex items-center ">
                <div className="h-[4rem] w-[4rem] flex items-center justify-center">
                  <Image
                    src="/iWitnessLogo.png"
                    alt="Logo"
                    width={200}
                    height={200}
                  />
                </div>
                <span className="text-2xl opacity-0 sm:opacity-100 font-semibold text-white">
                  iWITNESS
                </span>
              </Link>
            </div>

            {/* Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <Link
                href={'/submit-report'}
                className="text-sm text-zinc-400 hover:text-white transition-colors"
              >
                Submit Report
              </Link>
              <Link
                href={'/track-report'}
                className="text-sm text-zinc-400 hover:text-white transition-colors"
              >
                Track Report
              </Link>
              <Link
                href={'/how-it-works'}
                className="text-sm text-zinc-400 hover:text-white transition-colors"
              >
                How It Works
              </Link>
              <Link
                href={'/resources'}
                className="text-sm text-zinc-400 hover:text-white transition-colors"
              >
                Resources
              </Link>
              <Link
                href={'/auth/signin'}
                className="text-sm text-zinc-400 hover:text-white transition-colors"
              >
                Admin/Moderator
              </Link>
            </div>

            {/* Emergency Button */}
            <div className="hidden md:flex items-center space-x-4">
              <Link
                href={''}
                className="text-sm text-zinc-400 hover:text-white transition-colors"
              >
                Contact
              </Link>
              <button
                onClick={handleEmergencyCall}
                className="group flex h-9 items-center gap-2 rounded-full bg-red-500/10 pl-4 pr-5 font-medium text-red-500 ring-1 ring-inset ring-red-500/20 transition-all hover:bg-red-500/20 "
              >
                <span className="h-1.5 w-1.5 rounded-full bg-red-500  animate-pulse" />
                Emergency: 112
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden flex items-center text-white"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 6h18M3 12h18M3 18h18"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu Modal */}
        {isMobileMenuOpen && (
          <div className="fixed top-0 right-0 h-full w-[60%] max-w-sm bg-black/90 backdrop-blur-lg z-50 transition-transform transform translate-x-0">
            <div className="p-6 space-y-6">
              {/* Close Button */}
              <button
                className="absolute top-5 right-5 text-white"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              {/* Links */}
              <div className="space-y-6 bg-black text-center p-4">
                <Link
                  href={'/submit-report'}
                  className="block text-md text-zinc-400 hover:text-white transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Submit Report
                </Link>
                <Link
                  href={'/track-report'}
                  className="block text-md text-zinc-400 hover:text-white transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Track Report
                </Link>
                <Link
                  href={'/how-it-works'}
                  className="block text-md text-zinc-400 hover:text-white transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  How It Works
                </Link>
                <Link
                  href={'/resources'}
                  className="block text-md text-zinc-400 hover:text-white transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Resources
                </Link>
                <Link
                  href={'/auth/signin'}
                  className="block text-md text-zinc-400 hover:text-white transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Admin/Moderator
                </Link>
                <Link
                  href={''}
                  className="block text-md text-zinc-400 hover:text-white transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contact
                </Link>
                <button
                  onClick={handleEmergencyCall}
                  className="w-full flex items-center justify-center gap-2 rounded bg-red-500/10 p-3 font-medium text-red-500 ring-1 ring-inset ring-red-500/20 hover:bg-red-500/20"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
                  Emergency: 112
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
