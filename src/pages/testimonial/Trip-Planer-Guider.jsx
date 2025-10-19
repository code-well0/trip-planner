import React from "react";
import { useNavigate } from "react-router-dom";
import CustomCarousel from "./CustomerCarousel";
import { useTheme } from "../../contexts/ThemeContext";


// Static guide data (replace with API later if needed)
const guides = [
  {
    name: "Aarav Mehta",
    expertise: "Himalayan Treks",
    bio: "Certified mountain guide with 10+ years of experience leading treks in the Indian Himalayas.",
    img: "https://randomuser.me/api/portraits/men/51.jpg",
  },
  {
    name: "Sophia ",
    expertise: "Backpacker",
    bio: "Clean UI, easy to use, and perfect for organizing trips with friends!",
    img: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    name: "James Carter",
    expertise: "African Safaris",
    bio: "Wildlife expert and safari guide, specializing in Kenya and Tanzania national parks.",
    img: "https://randomuser.me/api/portraits/men/34.jpg",
  },
  {
    name: "Meera",
    expertise: "🐾Family Planner",
    bio: "Helped me organize a family trip without any stress. Kids loved the experience!",
    img: " https://randomuser.me/api/portraits/women/17.jpg",
  },
  {
    name: "Mei Lin",
    expertise: "East Asia Tours",
    bio: "Licensed guide for Japan, China, and South Korea. Loves sharing local traditions and cuisine.",
    img: "https://randomuser.me/api/portraits/women/43.jpg",
  },
  {
    name: "David",
    expertise: "🏖️ Solo Explorer",
    bio: "Managing my budget on the go was super easy. This app is a must-have!",
    img: "https://randomuser.me/api/portraits/men/17.jpg",
  },
  {
    name: "Rahul",
    expertise: "🐾 Adventure Enthusiast",
    bio: "I loved how smooth the planning process was. Highly recommend this app!",
    img: "https://randomuser.me/api/portraits/men/74.jpg",
  },
];

const TravelGuides = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  const handleguide = (guideName) => {
    navigate("/guides", { state: { selectedGuideId: guideName } });
  };

  return (
    <section className="w-full py-20">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <div className="mb-16">
          <h2
            className={`text-3xl md:text-4xl font-bold mb-6 transition-all duration-300 ${isDarkMode ? "text-white" : "text-gray-900"
              }`}
          >
            What Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
              Travellers Say
            </span>

          </h2>
          <p
            className={`text-lg max-w-2xl mx-auto leading-relaxed transition-all duration-300 ${isDarkMode ? "text-gray-300" : "text-gray-600"
              }`}
          >
            Connect with experienced local guides who will make your journey truly unforgettable.
          </p>
        </div>

        {/* Directly show carousel */}
        <CustomCarousel
          guides={guides}
          viewprofilehandle={handleguide}
          isHome={true}
        />
      </div>
    </section>
  );
};

export default TravelGuides;