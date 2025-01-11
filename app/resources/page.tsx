import Image from 'next/image';
import React from 'react';

const Resources = () => {
  const resources = [
    {
      id: '1',
      title: 'witness a crime?',
      description:
        'Witnessing a crime can be a distressing experience, but knowing how to react properly can aid law enforcement and ensure your safety. ',
      imageUrl: '/images/witness-to-crime.jpg',
      link: 'https://shorylaw.com/what-should-you-do-if-you-witness-a-crime/',
    },
    {
      id: '2',
      title: 'Road Accidents and How to Help Safely',
      description:
        'When approaching an accident, ensure your safety first, be vigilant of oncoming vehicles, and watch for hazards like fuel spills.',
      imageUrl: '/images/road-safety.jpg',
      link: 'https://firstaidforlife.org.uk/accidents-road-help/',
    },
    {
      id: '3',
      title: 'Situational Awareness',
      description:
        'Maintaining awareness of your surroundings is fundamental to personal safety. This involves recognizing potential hazards and making informed decisions.',
      imageUrl: '/images/personal-safety.jpeg',
      link: 'https://p4companies.com/p4secure/blog/improving-personal-safety-by-practicing-situational-awareness/',
    },
    {
      id: '4',
      title: 'Online safety rules',
      description:
        "Online safety is essential in today's digital age, where individuals face various risks such as cyberbullying, identity theft, and exposure to inappropriate content.",
      imageUrl: '/images/online-safety.jpg',
      link: 'https://www.kaspersky.com/resource-center/preemptive-safety/top-10-preemptive-safety-rules-and-what-not-to-do-online?',
    },
    {
      id: '5',
      title: 'Indian Helpline Numbers',
      description:
        ' Keep a list of emergency contacts readily accessible, including local medical facilities and personal contacts, to expedite communication during crises.',
      imageUrl: '/images/helpline-numbers.jpg',
      link: 'https://indianhelpline.com/',
    },
    {
      id: '6',
      title: 'Emergency precautions ',
      description:
        'Emergency precautions are essential steps to protect yourself and others during unexpected situations. Here are key measures to consider.',
      imageUrl: '/images/emergency-planning.jpg',
      link: 'https://www.safetynotes.net/emergency-preparedness-and-response/',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto  px-4 sm:px-6 lg:px-8 py-8">
      {/* Refined background gradients */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 -right-1/4 w-3/4 h-3/4 rounded-full bg-blue-500/5 blur-[100px]" />
        <div className="absolute -bottom-1/4 -left-1/4 w-3/4 h-3/4 rounded-full bg-red-500/5 blur-[100px]" />
        <div className="absolute inset-x-0 top-0 h-96 bg-gradient-to-b from-blue-600/20 to-transparent blur-3xl" />
      </div>
      {/* Header Section */}
      <header className="text-center mt-8 mb-12">
        <h1 className="text-3xl font-extrabold text-white/80 sm:text-4xl">
          Resources
        </h1>
        <p className="mt-4 text-lg text-gray-400">
          Explore a variety of tools, articles, and services to help you stay
          informed and prepared.
        </p>
      </header>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
        {resources.map((resource) => (
          <div
            key={resource.id}
            className=" rounded-3xl bg-white/5 backdrop-blur-sm border border-neutral-800/50 transition-all duration-300 hover:bg-neutral-800/50 transform hover:-translate-y-1"
          >
            <Image
              height={2000}
              width={2000}
              src={resource.imageUrl}
              alt={resource.title}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-200">
                {resource.title}
              </h2>
              <p className="mt-2 text-gray-400">{resource.description}</p>
              <a
                href={resource.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 px-4 py-2 text-sm font-medium text-blue-400 hover:text-blue-300"
              >
                Learn More
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Resources;
