import React, { useEffect, useRef } from "react";

const Testimonial = () => {
    const scrollContainerRef = useRef(null); // Ref for the scrollable container

    useEffect(() => {
        const scrollContainer = scrollContainerRef.current;
        if (!scrollContainer) return;

        let scrollInterval;

        const startAutoScroll = () => {
            scrollInterval = setInterval(() => {
                if (scrollContainer.scrollLeft + scrollContainer.offsetWidth >= scrollContainer.scrollWidth) {
                    // Reset to the beginning when reaching the end
                    scrollContainer.scrollTo({ left: 0, behavior: "smooth" });
                } else {
                    // Scroll to the next position
                    scrollContainer.scrollBy({ left: 300, behavior: "smooth" }); // Scrolls by 300px (width of one card)
                }
            }, 2000); // Delay of 2 seconds
        };

        startAutoScroll();

        // Cleanup the interval on unmount
        return () => clearInterval(scrollInterval);
    }, []);

    return (
        <section className="text-gray-600 body-font py-20 bg-gradient-to-r from-pink-600 to-pink-300">
            <div className="container px-5 py-10 mx-auto text-center">
                {/* Heading */}
                <h1 className="text-4xl font-bold text-white mb-4">Testimonals</h1>
                
                {/* Horizontal Scrolling Container */}
                <div
                    ref={scrollContainerRef} // Attach ref to this container
                    className="overflow-x-auto no-scrollbar flex gap-4"
                >
                    {/* Testimonial 1 */}
                    <div className="w-[300px] text-center bg-white rounded-lg shadow-xl p-6 flex-shrink-0">
                        <img
                            alt="testimonial"
                            className="w-32 h-32 mb-4 object-cover object-center rounded-full mx-auto border-4 border-pink-500"
                            src="../img/IMG-20241118-WA0003.jpg"
                        />
                        <h2 className="text-gray-900 font-medium title-font text-lg uppercase">Syed Shahid Pasha</h2>
                        <p className="text-gray-500">CEO and Founder</p>
                    </div>

                    {/* Testimonial 2 */}
                    <div className="w-[300px] text-center bg-white rounded-lg shadow-xl p-6 flex-shrink-0">
                        <img
                            alt="testimonial"
                            className="w-32 h-32 mb-4 object-cover object-center rounded-full mx-auto border-4 border-pink-500"
                            src="https://www.devknus.com/img/gawri.png"
                        />
                        <h2 className="text-gray-900 font-medium title-font text-lg uppercase">Syed Muskan</h2>
                        <p className="text-gray-500">Co-founder</p>
                    </div>

                    {/* Testimonial 3 */}
                    <div className="w-[300px] text-center bg-white rounded-lg shadow-xl p-6 flex-shrink-0">
                        <img
                            alt="testimonial"
                            className="w-32 h-32 mb-4 object-cover object-center rounded-full mx-auto border-4 border-pink-500"
                            src="../img/mohammad.jpg"
                        />
                        <h2 className="text-gray-900 font-medium title-font text-lg uppercase">Shaik Mohammad Pasha</h2>
                        <p className="text-gray-500">Product Manager</p>
                    </div>

                    {/* Testimonial 4 */}
                    <div className="w-[300px] text-center bg-white rounded-lg shadow-xl p-6 flex-shrink-0">
                        <img
                            alt="testimonial"
                            className="w-32 h-32 mb-4 object-cover object-center rounded-full mx-auto border-4 border-pink-500"
                            src="../img/hussain.jpg"
                        />
                        <h2 className="text-gray-900 font-medium title-font text-lg uppercase">Syed Hussain</h2>
                        <p className="text-gray-500">CMO</p>
                    </div>
                    
                    {/* Testimonial 5 */}
                    <div className="w-[300px] text-center bg-white rounded-lg shadow-xl p-6 flex-shrink-0">
                        <img
                            alt="testimonial"
                            className="w-32 h-32 mb-4 object-cover object-center rounded-full mx-auto border-4 border-pink-500"
                            src="../img/farooq.jpg"
                        />
                        <h2 className="text-gray-900 font-medium title-font text-lg uppercase">Syed Farooq</h2>
                        <p className="text-gray-500">CSO</p>
                    </div>
                    
                    {/* Testimonial 6 */}
                    <div className="w-[300px] text-center bg-white rounded-lg shadow-xl p-6 flex-shrink-0">
                        <img
                            alt="testimonial"
                            className="w-32 h-32 mb-4 object-cover object-center rounded-full mx-auto border-4 border-pink-500"
                            src="../img/fareed.jpg"
                        />
                        <h2 className="text-gray-900 font-medium title-font text-lg uppercase">Syed Fareed</h2>
                        <p className="text-gray-500">Manager</p>
                    </div>
                    
                    {/* Testimonial 7 */}
                    <div className="w-[300px] text-center bg-white rounded-lg shadow-xl p-6 flex-shrink-0">
                        <img
                            alt="testimonial"
                            className="w-32 h-32 mb-4 object-cover object-center rounded-full mx-auto border-4 border-pink-500"
                            src="../img/sameer.jpg"
                        />
                        <h2 className="text-gray-900 font-medium title-font text-lg uppercase">Shaik Sameer</h2>
                        <p className="text-gray-500">COO</p>
                    </div>
                    
                    {/* Testimonial 8 */}
                    <div className="w-[300px] text-center bg-white rounded-lg shadow-xl p-6 flex-shrink-0">
                        <img
                            alt="testimonial"
                            className="w-32 h-32 mb-4 object-cover object-center rounded-full mx-auto border-4 border-pink-500"
                            src="../img/shaheed.jpg"
                        />
                        <h2 className="text-gray-900 font-medium title-font text-lg uppercase">Shaik Shaheed</h2>
                        <p className="text-gray-500">CIO</p>
                    </div>
                    
                    {/* Testimonial 9 */}
                    <div className="w-[300px] text-center bg-white rounded-lg shadow-xl p-6 flex-shrink-0">
                        <img
                            alt="testimonial"
                            className="w-32 h-32 mb-4 object-cover object-center rounded-full mx-auto border-4 border-pink-500"
                            src="../img/kanta.jpg"
                        />
                        <h2 className="text-gray-900 font-medium title-font text-lg uppercase">Shrikanteshwar Reddy</h2>
                        <p className="text-gray-500">CTO</p>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Testimonial;
