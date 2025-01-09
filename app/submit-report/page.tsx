import { ReportWizard } from '@/components/report/ReportWizard';

export default function SubmitReport() {
  return (
    <div className="relative min-h-screen bg-black selection:bg-sky-500/20 overflow-hidden">
      {/* gradient background */}
      <main className="relative px-6 pt-32">
        <div className="mx-auto max-w-3xl">
          <div className="flex flex-col items-center text-center">
            <div className="h-[2rem] w-auto px-2 mb-4 flex items-center justify-center  bg-gradient-to-r from-blue-700 to-red-700 bg-[length:200%_200%] animate-policeSirenGradient rounded-3xl  ">
              <img
                src="/iWitnessLogo.png"
                alt="Logo"
                className="h-full w-auto object-contain"
              />
              <span className="text-white text-sm mr-2">
                Secure & Anonymous
              </span>
            </div>
            <h1 className="mt-8 bg-gradient-to-t from-blue-700 to-white/80 bg-clip-text text-5xl font-bold tracking-tight text-transparent">
              Submit Report
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400 ">
              Share your findings, anonymously and securely. Report any
              suspicious activity, crimes, or incidents that may have occurred.
            </p>
          </div>
          <div className="mt-16 bg-zinc-900/50 rounded-2xl border border-white/5 p-6">
            {/* report wizard */}
            <ReportWizard />
          </div>
        </div>
      </main>
    </div>
  );
}
