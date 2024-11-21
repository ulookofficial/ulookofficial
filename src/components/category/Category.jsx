import { useNavigate } from "react-router";

// Category Data
const category = [
    { image: 'https://cdn-icons-png.flaticon.com/256/8174/8174424.png', name: 'men' },
    { image: '../img/shop.png', name: 'women' },
    { image: '../img/apparel.png', name: 'combos' },
    { image: 'https://cdn-icons-png.flaticon.com/256/7648/7648246.png', name: 'children' },
    { image: '../img/summer-clothing.png', name: 'inners' },
    { image: 'https://cdn-icons-png.flaticon.com/256/10686/10686553.png', name: 'footwear' },
    { image: '../img/watch.png', name: 'watches' },
    { image: '../img/earrings.png', name: 'accessories' }
];

const Category = () => {
    const navigate = useNavigate();
    
    return (
        <div className="mt-10">
            {/* Heading */}
            <div className="text-center mb-5">
                <h2 className="text-2xl font-semibold text-gray-900">Shop by Category</h2>
            </div>

            {/* Category Section */}
            <div className="flex flex-wrap justify-center gap-6">
                {category.map((item, index) => (
                    <div
                        key={index}
                        className="w-24 h-24 lg:w-32 lg:h-32 bg-pink-500 hover:bg-pink-400 rounded-lg shadow-md overflow-hidden flex flex-col items-center justify-center cursor-pointer transition-all transform duration-300 hover:scale-105"
                        onClick={() => navigate(`/category/${item.name}`)}
                        aria-label={`View ${item.name} category`}
                    >
                        {/* Image */}
                        <img 
                            src={item.image}
                            alt={item.name}
                            className="w-12 h-12 lg:w-16 lg:h-16 object-contain"
                            loading="lazy"
                        />
                        {/* Category Name */}
                        <h3 className="mt-2 text-sm lg:text-lg font-medium text-white capitalize">{item.name}</h3>
                    </div>
                ))}
            </div>

            {/* Scrollbar Hidden Style */}
            <style dangerouslySetInnerHTML={{ __html: `
                .hide-scroll-bar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
                .hide-scroll-bar::-webkit-scrollbar {
                    display: none;
                }
            ` }} />
        </div>
    );
}

export default Category;
