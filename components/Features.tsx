import { Bot, Shield, UserMinus } from 'lucide-react';

export default function Features() {
  const features = [
    {
      title: 'AI-Powered Reporting',
      description:
        'Our app uses AI-driven analytics to streamline report submission, ensure accurate categorization.',
      icon: Bot,
      gradient: 'from-blue-500 to-indigo-500',
      bgGradient: 'from-blue-500/10 to-indigo-500/10',
    },
    {
      title: 'Secure Encryption',
      description:
        'Protect your identity with state-of-the-art encryption that ensures your data remains private.',
      icon: Shield,
      gradient: 'from-red-500 to-pink-500',
      bgGradient: 'from-red-500/10 to-pink-500/10',
    },
    {
      title: 'Anonymous Reporting',
      description:
        'Report incidents safely without revealing your identity to ensure your safety.',
      icon: UserMinus,
      gradient: 'from-amber-500 to-orange-500',
      bgGradient: 'from-amber-500/10 to-orange-500/10',
    },
  ];

  return (
    <div className="grid gap-8 sm:grid-cols-3">
      {features.map((feature, index) => (
        <div
          key={index}
          className="group relative rounded-3xl bg-neutral-900/50 backdrop-blur-sm border border-neutral-800/50 p-8 transition-all duration-300 hover:bg-neutral-800/50"
        >
          {/* Animated background gradient */}
          <div
            className={`absolute inset-0 bg-gradient-to-br ${feature.bgGradient} opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100`}
          />

          {/* Content */}
          <div className="relative flex flex-col items-center text-center">
            {/* Icon */}
            <div className={`relative mb-6`}>
              {/* Icon background with rotating border */}
              <div
                className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} rounded-xl blur-lg opacity-50 group-hover:opacity-100 transition-opacity duration-500`}
              />
              <div
                className={`relative flex items-center justify-center w-16 h-16 bg-neutral-900 rounded-xl border border-neutral-800/50 group-hover:border-neutral-700/50 transition-colors`}
              >
                <feature.icon className="w-8 h-8 text-white opacity-75 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>

            {/* Title */}
            <h3 className="text-lg font-semibold text-white mb-3 group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-neutral-400 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
              {feature.title}
            </h3>

            {/* Description */}
            <p className="text-sm leading-relaxed text-neutral-400 group-hover:text-neutral-300 transition-colors">
              {feature.description}
            </p>

            {/* Hover indicator */}
            <div
              className="absolute -bottom-px left-1/2 -translate-x-1/2 w-0 h-1 bg-gradient-to-r group-hover:w-1/2 transition-all duration-300 opacity-0 group-hover:opacity-100 rounded-full blur-sm"
              style={{
                backgroundImage: `linear-gradient(to right, transparent, ${feature.gradient.split(' ')[1]}, transparent)`,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
