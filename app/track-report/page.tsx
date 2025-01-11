'use client';

import { ReportTracker } from '@/components/report/ReportTracker';

export default function TrackReportPage() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)]  bg-neutral-950 items-center justify-center">
      {/* gradient background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 -right-1/4 w-3/4 h-3/4 rounded-full bg-blue-500/5 blur-[100px]" />
        <div className="absolute -bottom-1/4 -left-1/4 w-3/4 h-3/4 rounded-full bg-red-500/5 blur-[100px]" />
        <div className="absolute inset-x-0 top-0 h-96 bg-gradient-to-b from-blue-600/20 to-transparent blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-center">
        <div className="w-full max-w-5xl">
          <ReportTracker />
        </div>
      </div>
    </div>
  );
}
