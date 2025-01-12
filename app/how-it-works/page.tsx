import { type FC } from 'react';
import Link from 'next/link';
import { SiLetsencrypt } from 'react-icons/si';
import { IoShieldCheckmark } from 'react-icons/io5';
import { MdNoteAlt } from 'react-icons/md';

interface ProcessStepProps {
  step: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  isLast?: boolean;
}

interface SecurityFeatureProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const ProcessStep: FC<ProcessStepProps> = ({
  step,
  title,
  description,
  icon,
  isLast = false,
}) => (
  <div className="relative flex gap-8">
    <div className="flex flex-col items-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-red-600 shadow-xl">
        {icon}
      </div>
      {!isLast && (
        <div className="mt-4 h-full w-0.5 bg-gradient-to-b from-blue-600/50 to-transparent" />
      )}
    </div>
    <div className="flex-1 pb-12">
      <div className="group relative overflow-hidden rounded-2xl bg-white/5 p-8 shadow-2xl backdrop-blur-sm transition-all hover:bg-white/10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-purple-600/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <div className="relative">
          <span className="inline-flex items-center rounded-full bg-blue-600/10 px-3 py-1 text-sm font-medium text-blue-400">
            Step {step}
          </span>
          <h3 className="mt-4 text-2xl font-bold text-white">{title}</h3>
          <p className="mt-3 text-lg leading-relaxed text-zinc-400">
            {description}
          </p>
        </div>
      </div>
    </div>
  </div>
);

const SecurityFeature: FC<SecurityFeatureProps> = ({
  title,
  description,
  icon,
}) => (
  <div className="group relative">
    <div className="absolute -inset-px rounded-3xl bg-gradient-to-r from-blue-600 to-red-600 opacity-0 blur transition duration-300 group-hover:opacity-50 " />
    <div className="relative flex flex-col items-center rounded-3xl bg-zinc-900/90 p-8 text-center transition-transform duration-300 hover:-translate-y-1">
      <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-red-600 shadow-xl">
        {icon}
      </div>
      <h3 className="mt-6 text-xl font-bold text-white">{title}</h3>
      <p className="mt-4 text-zinc-400">{description}</p>
    </div>
  </div>
);

const HeroPattern: FC = () => (
  <div className="absolute inset-0 -z-10 overflow-hidden">
    <svg
      className="absolute left-[50%] top-0 h-[48rem] w-[128rem] -translate-x-1/2 stroke-blue-600/10 [mask-image:radial-gradient(64rem_34rem_at_center,white,transparent)]"
      aria-hidden="true"
    >
      <defs>
        <pattern
          id="grid"
          width="80"
          height="80"
          x="-80"
          y="-80"
          patternUnits="userSpaceOnUse"
        >
          <path d="M.5 80V.5H80" fill="none" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" strokeWidth="0" fill="url(#grid)" />
    </svg>
  </div>
);

const HowItWorks: FC = () => {
  const steps = [
    {
      step: '01',
      title: 'Submit Your Report',
      description:
        'Fill out our secure form with as much detail as possible. No personal information is required. You can include photos, videos, or documents if available.',
      icon: (
        <svg
          className="h-8 w-8 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
          />
        </svg>
      ),
    },
    {
      step: '02',
      title: 'Encryption & Anonymization',
      description:
        'Your report is immediately encrypted using military-grade protocols. All identifying metadata is stripped from your submission, including IP address and device information.',
      icon: (
        <svg
          className="h-8 w-8 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
          />
        </svg>
      ),
    },
    {
      step: '03',
      title: 'Verification & Routing',
      description:
        'Our system verifies the reports jurisdiction and automatically routes it to the appropriate law enforcement agency. The entire process maintains your anonymity.',
      icon: (
        <svg
          className="h-8 w-8 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
      ),
    },
    {
      step: '04',
      title: 'Secure Communication Channel',
      description:
        'If needed, law enforcement can communicate with you through our encrypted platform using your anonymous report ID. You maintain control over the conversation.',
      icon: (
        <svg
          className="h-8 w-8 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
      ),
    },
  ];

  const securityFeatures = [
    {
      title: 'End-to-End Encryption',
      description: 'All data is encrypted in transit and at rest',
      icon: (
        <SiLetsencrypt className="text-white text-3xl" aria-hidden="true" />
      ),
    },
    {
      title: 'No Logs Policy',
      description: 'We never store IP addresses or user metadata',
      icon: (
        <IoShieldCheckmark className="text-white text-3xl" aria-hidden="true" />
      ),
    },
    {
      title: 'Regular Audits',
      description: 'Independent security firms verify our systems',
      icon: <MdNoteAlt className="text-white text-3xl" aria-hidden="true" />,
    },
  ];

  return (
    <div className="relative min-h-screen  bg-zinc-950">
      <HeroPattern />

      <div className="relative">
        <div className="absolute inset-x-0 top-0 h-96 bg-gradient-to-b from-blue-600/20 to-transparent blur-3xl" />

        <main className="relative mx-auto max-w-7xl px-6 pt-20 pb-32">
          {/* Hero Section */}
          <div className="relative rounded-3xl bg-white/5 p-8 backdrop-blur-sm lg:p-16">
            <div className="mx-auto max-w-3xl text-center">
              <div className="inline-flex items-center rounded-full bg-white/5 p-1.5 pr-4 backdrop-blur-sm">
                <span className="mr-3 rounded-full bg-blue-600 px-3 py-1.5 text-xs font-medium text-white">
                  New
                </span>
                <span className="text-sm text-zinc-300">
                  Explore our enhanced reporting system
                </span>
              </div>

              <h1 className="mt-8 font-bold tracking-tight">
                <span className="block text-4xl text-white sm:text-6xl">
                  How{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                    iWitness
                  </span>
                </span>
                <span className="mt-2 block text-4xl text-white sm:text-6xl">
                  Works
                </span>
              </h1>

              <p className="mt-6 text-lg leading-relaxed text-zinc-400">
                Learn how we protect your identity while ensuring your report
                reaches the right authorities through our secure and anonymous
                reporting system.
              </p>
            </div>
          </div>

          {/* Process Section */}
          <div className="mt-32 relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-full w-full bg-gradient-to-r from-blue-600/20  to-red-500/20 blur-3xl" />
            </div>

            <div className="relative">
              <div className="mx-auto max-w-4xl">
                {steps.map((step, idx) => (
                  <ProcessStep
                    key={step.step}
                    {...step}
                    isLast={idx === steps.length - 1}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Security Features */}
          <div className="mt-40">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Enterprise-Grade Security
              </h2>
              <p className="mt-4 text-lg text-zinc-400">
                Your safety and anonymity are our top priorities. Our platform
                is built with the highest security standards.
              </p>
            </div>

            <div className="mx-auto mt-20 grid max-w-5xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {securityFeatures.map((feature) => (
                <SecurityFeature key={feature.title} {...feature} />
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-40">
            <div className="relative isolate overflow-hidden rounded-3xl bg-gradient-to-b from-blue-600/20 to-purple-600/20 px-6 py-24 text-center shadow-2xl sm:px-16">
              <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white">
                Ready to Make a Difference?
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-zinc-300">
                Start your anonymous report today and help create a safer
                community for everyone.
              </p>
              <div className="mt-10 flex items-center justify-center gap-6">
                <Link
                  href="/submit-report"
                  className="relative inline-flex items-center justify-center overflow-hidden rounded-full bg-white px-8 py-3 text-sm font-medium text-zinc-900 transition-all duration-300 hover:bg-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-zinc-900"
                >
                  Start Anonymous Report
                  <svg
                    className="ml-2 h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 12h14M12 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default HowItWorks;
