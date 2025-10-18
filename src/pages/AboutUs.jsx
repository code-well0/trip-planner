import React, { useEffect } from 'react';
import { FaBullseye, FaUsers, FaLightbulb, FaGithub, FaLinkedin } from 'react-icons/fa';

// Placeholder team members
const teamMembers = [
  {
    name: 'Shubrali Jain',
    role: 'Founder & Lead Developer',
    bio: 'The visionary behind YourTripPlanner, Shubrali is passionate about creating seamless travel experiences through technology.',
    image: 'https://avatars.githubusercontent.com/u/99033289?v=4', // A placeholder image
    github: 'https://github.com/code-well0',
    linkedin: 'https://www.linkedin.com/in/shubrali-jain/',
  },
  // Add more team members here if needed
];

const AboutUs = () => {
  useEffect(() => {
    document.title = 'About Us | Your Trip Planner';
  }, []);

  return (
    <div className="bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 animate-fadeIn">
      {/* Header Section */}
      <header
        className="relative bg-cover bg-center py-24 px-8 text-center border-b-4 border-blue-500"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')` }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10">
          <h1 className="text-5xl font-extrabold text-white">About YourTripPlanner</h1>
          <p className="text-xl text-gray-200 mt-4">
            Crafting unforgettable journeys, one trip at a time.
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Our Mission Section */}
        <section className="text-center mb-20">
          <FaBullseye className="text-5xl text-blue-500 mx-auto mb-4" />
          <h2 className="text-4xl font-bold mb-4">Our Mission</h2>
          <p className="text-lg max-w-3xl mx-auto text-gray-600 dark:text-gray-400">
            Our mission is to simplify travel planning by providing intuitive, powerful, and personalized tools. We believe that the joy of travel should begin with the planning, not after the hassle. YourTripPlanner is here to be your trusted companion from the spark of an idea to the final journey home.
          </p>
        </section>

        {/* Why Choose Us Section */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold text-center mb-12">Why Choose Us?</h2>
          <div className="grid md:grid-cols-3 gap-10">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg text-center transition-transform transform hover:-translate-y-2">
              <FaLightbulb className="text-4xl text-yellow-400 mx-auto mb-3" />
              <h3 className="text-2xl font-semibold mb-2">Innovative Tools</h3>
              <p className="text-gray-600 dark:text-gray-400">From AI-powered recommendations to collaborative itineraries and expense tracking, we offer a comprehensive suite of tools for the modern traveler.</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg text-center transition-transform transform hover:-translate-y-2">
              <FaUsers className="text-4xl text-green-400 mx-auto mb-3" />
              <h3 className="text-2xl font-semibold mb-2">User-Centric Design</h3>
              <p className="text-gray-600 dark:text-gray-400">Our platform is designed with you in mind. An intuitive interface makes planning complex trips feel simple and enjoyable.</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg text-center transition-transform transform hover:-translate-y-2">
              <FaBullseye className="text-4xl text-red-400 mx-auto mb-3" />
              <h3 className="text-2xl font-semibold mb-2">Personalized Experience</h3>
              <p className="text-gray-600 dark:text-gray-400">We tailor suggestions to your unique travel style, interests, and budget, ensuring every trip is truly yours.</p>
            </div>
          </div>
        </section>

        {/* Meet the Team Section */}
        <section>
          <h2 className="text-4xl font-bold text-center mb-12">Meet the Team</h2>
          <div className="flex flex-wrap justify-center gap-10">
            {teamMembers.map((member) => (
              <div key={member.name} className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl flex flex-col items-center max-w-sm transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                <img src={member.image} alt={member.name} className="w-36 h-36 rounded-full object-cover border-4 border-blue-500" />
                <h3 className="text-2xl font-bold mt-4">{member.name}</h3>
                <p className="text-blue-500 font-semibold">{member.role}</p>
                <p className="text-gray-600 dark:text-gray-400 mt-2 text-center px-4">{member.bio}</p>
                <div className="flex space-x-6 mt-4 text-2xl">
                  <a href={member.github} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">
                    <FaGithub />
                  </a>
                  <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    <FaLinkedin />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default AboutUs;