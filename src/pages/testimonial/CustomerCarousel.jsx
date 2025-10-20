import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";

// import "./styles/CustomCarousel.css";


const AUTO_SLIDE_INTERVAL = 3500; // milliseconds

const CustomCarousel = ({ guides, viewprofilehandle, isHome = false }) => {
	const { theme } = useTheme();
	const isDarkMode = theme === 'dark';
	const [currentIndex, setCurrentIndex] = useState(0);
	const prevSlide = () => {
		setCurrentIndex((prev) => (prev - 1 + guides.length) % guides.length);
	};

	const nextSlide = () => {
		setCurrentIndex((prev) => (prev + 1) % guides.length);
	};

	// Auto-move effect
	useEffect(() => {
		const timer = setInterval(nextSlide, AUTO_SLIDE_INTERVAL);
		return () => clearInterval(timer);
	}, [currentIndex, guides.length]);

	return (
		<div className="carousel-container relative flex flex-col items-center">
			{/* Left button */}
			<button
				aria-label="Previous"
				onClick={prevSlide}
				className={`absolute left-0 top-1/2 transform -translate-y-1/2 z-10 backdrop-blur-md shadow-lg p-3 rounded-full transition-all duration-300 ${isDarkMode
					? "bg-white/10 border border-white/20 hover:bg-white/20 hover:border-white/40"
					: "bg-white/80 border border-gray-200 hover:bg-white hover:border-blue-300"
					} cursor-pointer`}
			>
				<ChevronLeft
					className={`w-6 h-6 ${isDarkMode ? "text-white" : "text-gray-700"}`}
				/>
			</button>
			{/* Cards */}
			<div className="carousel-track flex justify-center items-center">
				{guides.map((guide, index) => {
					let position = "hidden";
					if (index === currentIndex) position = "center";
					else if (index === (currentIndex + 1) % guides.length)
						position = "right";
					else if (index === (currentIndex - 1 + guides.length) % guides.length)
						position = "left";

					return (
						<div
							key={index}
							className={`${position} w-[280px] sm:w-[300px] h-[400px] flex items-center justify-center text-center flex-col hover:-translate-y-[10px] backdrop-blur-md rounded-2xl p-6 ${isDarkMode
								? "bg-black/30 border border-white/20 hover:border-white/40"
								: "bg-white/30 border-2 border-gray-300 hover:border-blue-500"
								} ${position === "center" ? "scale-100" : "scale-90 opacity-80"
								} card`}
						>
							<div className="card-image">
								<img
									src={guide.img || "/assets/default-card.jpg"}
									alt={guide.name || "Card image"}
									loading="eager"
									className="w-full h-48 object-cover rounded-lg"
								/>
							</div>
							<div className="card-info">
								<h3
									className={`${isDarkMode ? "text-white" : "!text-gray-900"} font-semibold mt-1`}
								>
									{guide.name}
								</h3>
								<p className="expertise text-blue-400">{guide.expertise}</p>
								<p
									className={`bio text-[14px] my-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-800'
										}`}
								>
									{guide.bio}
								</p>

								<button
									aria-label="Search"
									className={`view-btn ${isHome
										? "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-purple-600 hover:to-blue-700 p-2 rounded-full text-white text-sm"
										: "bg-gradient-to-r from-[#db2777] to-[#ec4899] hover:from-[#be185d] hover:to-[#db2777]"
										}`}
									onClick={() => viewprofilehandle(guide)}
								>
									View Profile
								</button>
							</div>
						</div>
					);
				})}
			</div>

			{/* Right button */}
			<button
				aria-label="Next"
				onClick={nextSlide}
				className={`absolute right-0 top-1/2 transform -translate-y-1/2 z-10 backdrop-blur-md shadow-lg p-3 rounded-full transition-all duration-300 ${isDarkMode
					? "bg-white/10 border border-white/20 hover:bg-white/20 hover:border-white/40"
					: "bg-white/80 border border-gray-200 hover:bg-white hover:border-blue-400"
					} cursor-pointer`}
			>
				<ChevronRight
					className={`w-6 h-6 ${isDarkMode ? "text-white" : "text-gray-700"}`}
				/>
			</button>

			{/* Navigation dots BELOW cards */}
			<div className="flex justify-center mt-6 space-x-2">
				{guides.map((_, index) => (
					<button
						key={index}
						onClick={() => setCurrentIndex(index)}
						className={`w-3 h-3 rounded-full transition-all duration-300 ${currentIndex === index
							? "bg-blue-500 scale-110"
							: isDarkMode
								? "bg-gray-500"
								: "bg-gray-300"
							}`}
					/>
				))}
			</div>
		</div>
	);
};

export default CustomCarousel;