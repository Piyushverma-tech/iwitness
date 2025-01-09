import Features from '@/components/Features';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="relative px-6 pt-32 flex items-center justify-center">
      <div className="max-auto max-w-5xl">
        {/* hero section */}
        <div className="flex flex-col items-center text-center">
          <img
            src="/iWitnessLogo.png"
            alt="Logo"
            className="h-28 w-auto object-contain"
          />
          {/* <div className="h-[2.5rem] w-auto px-4 mb-4 flex items-center justify-center  bg-gradient-to-r from-blue-700 to-red-700 bg-[length:200%_200%] animate-policeSirenGradient rounded-3xl ">
            <span className="text-white text-sm">
              Secure & Anonymous Reporting
            </span>
          </div> */}
          <h1 className=" bg-gradient-to-r from-white to-blue-700 bg-clip-text text-5xl font-bold tracking-tight text-transparent sm:text-7xl">
            Report Incident
            <span className="block bg-gradient-to-r from-red-600 to-white bg-clip-text text-transparent">
              Protect Identity
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400">
            iWitness bridges the gap between communities and authorities. Submit
            reports, track progress, and access resources—all while protecting
            your identity. Together, lets create safer neighborhoods.
          </p>

          <div className="mt-10 flex items-center justify-center flex-col sm:flex-row gap-4">
            <Link href={'/submit-report'}>
              <button className="group relative flex h-12 items-center gap-2 rounded-md px-6 text-sm font-medium  bg-gradient-to-br from-red-500 to-red-600/50 text-white transition-all hover:from-red-500 hover:to-red-500/50 ">
                Make Anonymous Report
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-5 h-5  transition-transform group-hover:translate-x-1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </Link>

            <Link href={'/how-it-works'}>
              <button className="group relative flex h-12 items-center gap-2 rounded-md border px-6 text-sm font-medium text-white transition-all hover:text-red-400">
                How it Works
              </button>
            </Link>
          </div>
        </div>

        {/* features section */}
        <div>
          <Features />
        </div>

        {/* {stats section} */}
        <div className="mt-40 group relative overflow-hidden rounded-2xl bg-zinc-900 p-8 transition-all hover:bg-zinc-800/80">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-red-500/10 transition-opacity group-hover:opacity-100" />
          <div className="relative grid gap-y-8 sm:grid-cols-3">
            {[
              { value: '10k+', label: 'Reports filed' },
              { value: '100%', label: 'Anonymous Rate' },
              { value: '24/7', label: 'Support Available' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-white">
                  {stat.value}
                </div>
                <div className="mt-1 text-sm text-zinc-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
        {/* trust badge */}
        <div className="mt-40 mb-20 flex justify-center ">
          <div className="inline-flex items-center gap-3 rounded-full bg-zinc-900 px-5 py-2 text-sm text-zinc-400">
            <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
            Designed in Collaboration with Law Enforcement Experts
          </div>
        </div>
      </div>
    </main>
  );
}
