import { ReportWizard } from '@/components/report/ReportWizard';

export default function SubmitReport() {
  return (
    <div className="relative min-h-screen bg-neutral-950 selection:bg-sky-500/20 overflow-hidden">
      {/* gradient background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 -right-1/4 w-3/4 h-3/4 rounded-full bg-blue-500/5 blur-[100px]" />
        <div className="absolute -bottom-1/4 -left-1/4 w-3/4 h-3/4 rounded-full bg-red-500/5 blur-[100px]" />
        <div className="absolute inset-x-0 top-0 h-96 bg-gradient-to-b from-blue-600/20 to-transparent blur-3xl" />
      </div>

      <main className="relative px-6 pt-32">
        <div className="mx-auto max-w-3xl">
          <div className="flex flex-col items-center text-center">
            <div className="h-[2rem] w-auto px-4 mb-4 flex items-center justify-center  bg-gradient-to-r from-blue-700 to-red-700 bg-[length:200%_200%] animate-policeSirenGradient rounded-3xl  ">
              <span className="text-white text-sm px-2">
                Secure & Anonymous
              </span>
            </div>
            <h1 className="mt-8 bg-gradient-to-b from-white to-white/60 bg-clip-text text-5xl font-bold tracking-tight text-transparent">
              Submit Report
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400 ">
              Share your findings, anonymously and securely. Report any
              suspicious activity, crimes, or incidents that may have occurred.
            </p>
          </div>
          <div className="mt-10 p-6">
            {/* report wizard */}
            <ReportWizard />
          </div>
        </div>
      </main>
    </div>
  );
}
