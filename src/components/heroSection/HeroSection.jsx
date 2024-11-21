import React from 'react';

const HeroSection = () => {
    return (
        <div className="relative">
            {/* Updated Background Image with Parallax Effect */}
            <div 
                className="w-full h-[60vh] lg:h-[80vh] bg-cover bg-center parallax-effect"
                style={{ backgroundImage: "url('../img/hero.png')" }} // Update this path with your new image
                alt="Hero Section"
            >
                {/* Overlay */}
                <div className="absolute inset-0 bg-black opacity-50"></div>

                {/* Content Overlay (Text only) */}
                <div className="absolute inset-0 flex items-center justify-center text-center text-white">
                    <div className="px-4 md:px-10 lg:px-16">
                        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold animate__animated animate__fadeIn animate__delay-1s">
                            Welcome to uLOOK – Where Fashion Meets You!
                        </h1>
                        <p className="mt-4 text-lg md:text-2xl animate__animated animate__fadeIn animate__delay-2s">
                            Explore the latest trends and discover your perfect style.
                        </p>
                    </div>
                </div>
            </div>

            {/* Parallax Effect CSS */}
            <style dangerouslySetInnerHTML={{ __html: `
                .parallax-effect {
                    background-attachment: fixed;
                    background-position: center;
                    background-repeat: no-repeat;
                    background-size: cover;
                }
                .animate__animated {
                    animation-duration: 1s;
                    animation-fill-mode: both;
                }
                .animate__fadeIn {
                    animation-name: fadeIn;
                }
                @keyframes fadeIn {
                    0% { opacity: 0; }
                    100% { opacity: 1; }
                }
            ` }} />
        </div>
    );
}

export default HeroSection;
