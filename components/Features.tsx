import { SiLetsencrypt } from 'react-icons/si';
import { BsIncognito } from 'react-icons/bs';
import { FaRobot } from 'react-icons/fa6';

export default function Features() {
  const features = [
    {
      title: 'AI-Powered Reporting',
      description:
        'Our app uses AI-driven analytics to streamline report submission, ensure accurate categorization.',
      icon: <FaRobot className=" text-3xl text-white" />,
    },
    {
      title: 'Secure Encryption',
      description:
        'Protect your identity with state-of-the-art encryption that ensures your data remains private.',
      icon: <SiLetsencrypt className=" text-3xl text-white" />,
    },
    {
      title: 'Anonymous Reporting',
      description:
        'Report incidents safely without revealing your identity to ensure your safety.',
      icon: <BsIncognito className=" text-3xl text-white" />,
    },
  ];

  return (
    <div className="mt-40 grid gap-6 sm:grid-cols-3">
      {features.map((feature, index) => (
        <div
          key={index}
          className="group relative overflow-hidden rounded-2xl bg-zinc-900 p-8 transition-all hover:bg-zinc-800/80"
        >
          {/* Background Gradient and Hover Effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-800/10 to-red-800/10 opacity-1 transition-opacity group-hover:opacity-100"></div>

          {/* Content Wrapper */}
          <div className="relative z-10 flex flex-col items-center justify-center">
            {/* Icon */}
            <div className="mb-5 inline-flex rounded-xl bg-gradient-to-br from-red-600 to-blue-600 p-3">
              {feature.icon}
            </div>

            {/* Title */}
            <h3 className="mb-3 text-lg font-medium text-white text-center">
              {feature.title}
            </h3>

            {/* Description */}
            <p className="text-sm leading-relaxed text-zinc-400 text-center">
              {feature.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
