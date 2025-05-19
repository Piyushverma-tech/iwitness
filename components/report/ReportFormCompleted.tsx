'use client';
import { ReportData } from '@/app/types/reportData';
import { useState } from 'react';

interface ReportSubmittedProps {
  data: ReportData;
  onComplete: (data: ReportData) => void;
}

export function ReportSubmitted({ data }: ReportSubmittedProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(reportId);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const reportId = data.reportId || 'ERROR-ID-NOT-FOUND';

  return (
    <div className="text-center space-y-6">
      <div className="flex flex-col items-center">
        <div className="bg-green-500/10 rounded-full p-3">
          <svg
            className="w-16 h-16 text-green-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 className="mt-4 text-xl font-medium text-white">
          Report Submitted
        </h3>
        <p className="mt-2 text-sm text-zinc-400">
          Your report has been securely transmitted to law enforcement
        </p>
      </div>

      <div className="bg-zinc-800/50 rounded-lg p-6 max-w-md mx-auto">
        <h4 className="text-white font-medium mb-2">Your Report ID</h4>
        <div className="bg-zinc-900 rounded p-3">
          <code className="text-sky-400">{reportId}</code>
          <button
            onClick={copyToClipboard}
            className="ml-2 text-xs bg-zinc-700 hover:bg-zinc-600 text-white py-1 px-2 rounded"
            aria-label="Copy report ID"
          >
            {copied ? (
              <span className="flex items-center">
                <svg
                  className="w-4 h-4 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Copied
              </span>
            ) : (
              <span className="flex items-center">
                <svg
                  className="w-4 h-4 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                  />
                </svg>
                Copy
              </span>
            )}
          </button>
        </div>
        <p className="mt-2 text-sm text-zinc-400">
          Save this ID to check your report status or communicate securely with
          law enforcement
        </p>
      </div>

      <div className="pt-4">
        <button
          onClick={() => (window.location.href = '/')}
          className="inline-flex items-center justify-center rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-500"
        >
          Return to Home
        </button>
      </div>
    </div>
  );
}
