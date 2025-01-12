'use client';

import Features from '@/components/Features';
import Link from 'next/link';
import Image from 'next/image';
import { Shield, ArrowRight, Clock, Users, LockKeyhole } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-950 relative">
      {/* Refined background gradients */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute -bottom-1/4 -left-1/4 w-3/4 h-3/4 rounded-full bg-red-500/5 blur-[100px]" />
        <div className="absolute inset-x-0 top-0 h-96 bg-gradient-to-b from-blue-600/20 to-transparent blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative">
        <div className="px-6 py-[4rem] flex items-center justify-center min-h-screen">
          <div className="max-w-6xl w-full space-y-40">
            {/* Hero section */}
            <div className="flex flex-col items-center text-center ">
              {/* Logo */}
              <div className="relative group">
                <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-red-500/20 rounded-full blur-xl" />
                </div>
                <div className="relative p-6">
                  <Image
                    src="/iWitnessLogo.png"
                    alt="Logo"
                    className="h-32 w-auto object-contain group-hover:scale-105 transition-transform duration-500"
                    width={200}
                    height={200}
                    priority
                  />
                </div>
              </div>

              {/* Heading */}
              <div className="space-y-6">
                <h1 className="text-4xl font-bold tracking-tight sm:text-7xl">
                  <span className="bg-gradient-to-r from-white/80 via-white/60 to-blue-600 bg-clip-text text-transparent">
                    Report Incident
                  </span>
                  <span className="block sm:text-[4.2rem] mt-2 bg-gradient-to-r from-red-600 via-white/60 to-white bg-clip-text text-transparent">
                    Protect Identity
                  </span>
                </h1>

                <p className="max-w-2xl sm:text-lg text-sm leading-relaxed text-neutral-400 mx-auto">
                  iWitness bridges the gap between communities and authorities.
                  Submit reports, track progress, and access resources—all while
                  protecting your identity. Together, let&apos;s create safer
                  neighborhoods.
                </p>
              </div>

              {/* Refined buttons */}
              <div className="flex items-center justify-center flex-col sm:flex-row gap-4 pt-6">
                <Link href="/submit-report">
                  <button className="group relative h-14 overflow-hidden rounded-full transition-all duration-300">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-red-600" />
                    <div className="relative flex items-center gap-2 px-8 h-full text-sm font-medium text-white">
                      Make Anonymous Report
                      <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </div>
                  </button>
                </Link>

                <Link href="/how-it-works">
                  <button className="group relative h-14 rounded-full transition-all duration-300 bg-white/5 backdrop-blur-sm border border-blue-600 hover:bg-blue-600">
                    <div className="relative flex items-center px-8 h-full text-sm font-medium text-white">
                      How it Works
                    </div>
                  </button>
                </Link>
              </div>
            </div>

            {/* Features section */}
            <Features />

            {/* Stats section */}
            <div className="relative overflow-hidden rounded-3xl bg-neutral-900/50 backdrop-blur-sm border border-neutral-800/50">
              <div className="grid gap-8 sm:grid-cols-3 p-12">
                {[
                  {
                    value: '10k+',
                    label: 'Reports filed',
                    icon: Shield,
                    gradient: 'from-blue-500 to-indigo-500',
                  },
                  {
                    value: '100%',
                    label: 'Anonymous Rate',
                    icon: LockKeyhole,
                    gradient: 'from-red-500 to-pink-500',
                  },
                  {
                    value: '24/7',
                    label: 'Support Available',
                    icon: Clock,
                    gradient: 'from-amber-500 to-orange-500',
                  },
                ].map((stat, index) => (
                  <div
                    key={index}
                    className="group flex flex-col items-center text-center space-y-4 p-6"
                  >
                    <div className="relative">
                      <div className="relative p-4 rounded-full bg-neutral-800/50 border border-neutral-700/50 group-hover:bg-neutral-800 transition-colors">
                        <stat.icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div
                      className={`text-4xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}
                    >
                      {stat.value}
                    </div>
                    <div className="text-sm text-neutral-400">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Trust badge */}
            <div className="flex justify-center">
              <div className="inline-flex items-center gap-3 rounded-full bg-gradient-to-b from-blue-600/20 to-purple-600/20 backdrop-blur-sm border border-neutral-800/50 px-6 py-3 text-sm text-neutral-400 hover:bg-neutral-800/50 transition-colors">
                <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                <Users className="w-4 h-4 mr-1" />
                Designed in Collaboration with Law Enforcement Experts
              </div>
            </div>
            <span className="flex justify-center items-center text-sm text-white/40">
              © Piyush Verma. All right reserved
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}
