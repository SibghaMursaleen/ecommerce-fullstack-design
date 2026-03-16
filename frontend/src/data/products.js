import iphone from '../assets/iphone.png';
import robotVacuumImg from '../assets/robot-vacuum-mop.png';
import xiaomi from '../assets/xiaomi.jpg';
import gopro from '../assets/Gopro_Cameras.png';
import smartWatch from '../assets/Smart_Watches.png';
import headphones from '../assets/boost_headphones.png';
import laptopImg from '../assets/laptop_highres.png';
import gamingSet from '../assets/gaming-set.png';
import dealPhone from '../assets/deal_smartphone.png';
import furniture from '../assets/wooden_chair_highres.png';
import appliences from '../assets/convection_oven_highres.png';
import smartPhones from '../assets/smart-phones.jpg';
import softChairs from '../assets/velvet_sofa_highres.png';
import officeChair from '../assets/ergonomic_office_chair_highres.png';
import plants from '../assets/potted_plant_highres.png';
import mattress from '../assets/mattress_highres.png';
import kitchenMixtures from '../assets/stand_mixer_highres.png';
import crockery from '../assets/ceramic_dinnerware_highres.png';
import blenders from '../assets/personal_blender_highres.png';
import electricKettle from '../assets/electric_kettle_highres.png';
import cameraImg from '../assets/camera_highres.png';
import mensTshirt from '../assets/mens_tshirt.png';
import mensJacket from '../assets/mens_jacket.png';
import womensDress from '../assets/womens_dress.png';
import runningSneakers from '../assets/running_sneakers.png';
import denimJeans from '../assets/denim_jeans.png';
import casualShirt from '../assets/casual_shirt.png';
import winterCoat from '../assets/winter_coat.png';
import recBlazer from '../assets/blazer_highres.png';
import recJacket from '../assets/light_jacket_highres.png';
import recShorts from '../assets/shorts_highres.png';
import recTshirt from '../assets/striped_tshirt_highres.png';
import curtainRod from '../assets/curtain rod.jpg';
import selfWateringGarden from '../assets/slef-watering-plant.jpg';
import bambooTray from '../assets/bamboo-tray-set.jpg';
import velvetPillows from '../assets/velvet-pillow-set.jpg';
import yogaMat from '../assets/bamboo-yoga-mat.jpg';
import ottomanBench from '../assets/velvet-ottoman-bench.jpg';
import smartAirPurifier from '../assets/smart-air-purifier.jpg';
import copperCookwareSet from '../assets/copper-cookware-set.webp';
import canonCamera from '../assets/canon_camera.png';
import electronicGadgets from '../assets/electronic-gadets.png';
import headsets from '../assets/headsets.png';

const unShuffledProducts = [
    // Electronics (12 items)
    {
        id: 1,
        title: "Apple iPhone 11, 128GB, Product Red",
        category: "Electronics",
        brand: "Apple",
        rating: 4.8,
        price: 449,
        oldPrice: 564,
        image: iphone,
        stock: 120,
        description: "Capture 4K videos and beautiful portraits with the dual-camera system.",
        longDescription: "The Apple iPhone 11 features a transformative dual-camera system.",
        reviews: [], specs: { OS: "iOS", Screen: "6.1\"" },
        isBestSeller: true,
        salesCount: "1.2k+ sold"
    },
    {
        id: 2,
        title: "Xiaomi Redmi Note 9 Pro",
        category: "Electronics",
        brand: "Xiaomi",
        rating: 4.7,
        price: 99,
        oldPrice: 124,
        image: xiaomi,
        stock: 85,
        description: "Qualcomm Snapdragon 720G, massive 5020mAh battery.",
        longDescription: "Exceptional power that lasts up to two days on a single charge.",
        reviews: [], specs: { OS: "Android", Screen: "6.67\"" }
    },
    {
        id: 3,
        title: "GoPro HERO9 Black Action Camera",
        category: "Electronics",
        brand: "GoPro",
        rating: 4.5,
        price: 174,
        oldPrice: 199,
        deal: "Get Free Case",
        image: gopro,
        stock: 45,
        description: "Shoot stunning 5K video with 20MP photos.",
        longDescription: "Waterproof to 33ft, front color display, HyperSmooth 3.0 stabilization.",
        reviews: [], specs: { Video: "5K", Waterproof: "33ft" }
    },
    {
        id: 4,
        title: "Amazfit GTR 3 Smart Watch",
        category: "Electronics",
        brand: "Amazfit",
        rating: 4.5,
        price: 89,
        oldPrice: 99,
        image: smartWatch,
        stock: 220,
        description: "1.39-inch AMOLED display, dual-band GPS.",
        longDescription: "Comprehensive tracking for over 150 built-in sports modes.",
        reviews: [], specs: { Screen: "AMOLED", GPS: "Yes" }
    },
    {
        id: 5,
        title: "Sony Noise Canceling Headlines",
        category: "Electronics",
        brand: "Sony",
        rating: 4.9,
        price: 174,
        oldPrice: 199,
        image: headphones,
        stock: 350,
        description: "Industry-leading noise cancellation technology.",
        longDescription: "Silence the world around you and immerse yourself in pure sound.",
        reviews: [], specs: { Type: "Wireless", NoiseCancelling: "Yes" },
        isBestSeller: true,
        salesCount: "2.5k+ sold"
    },
    {
        id: 6,
        title: "HP Spectre x360 Touchscreen Laptop",
        category: "Electronics",
        brand: "HP",
        rating: 5,
        price: 699,
        oldPrice: 774,
        image: laptopImg,
        stock: 65,
        description: "Intel Core i7-1165G7, 16GB RAM, OLED display.",
        longDescription: "Stunning 14-inch OLED touch display.",
        reviews: [], specs: { CPU: "i7-1165G7", RAM: "16GB", SSD: "512GB" }
    },
    {
        id: 7,
        title: "PlayStation 5 Gaming Bundle",
        category: "Electronics",
        brand: "Sony",
        rating: 5,
        price: 249,
        oldPrice: 274,
        deal: "Buy 1 Get 1 Free",
        image: gamingSet,
        stock: 15,
        description: "Next-gen gaming with ultra-high-speed SSD.",
        longDescription: "Experience incredibly fast loading with an ultra-high-speed SSD.",
        reviews: [], specs: { Resolution: "4K", Storage: "825GB" }
    },
    {
        id: 8,
        title: "Professional DSLR Camera (Canon)",
        category: "Electronics",
        brand: "Canon",
        rating: 4.8,
        price: 600,
        oldPrice: null,
        image: canonCamera,
        stock: 20,
        description: "Capture breathtaking photos with this professional DSLR.",
        longDescription: "High-resolution sensor, fast autofocus, and 4K video recording.",
        reviews: [], specs: { Sensor: "Full Frame", Resolution: "24.2MP" }
    },
    {
        id: 43,
        title: "High-Res Professional Camera",
        category: "Electronics",
        brand: "Nikon",
        rating: 4.9,
        price: 1200,
        oldPrice: null,
        image: cameraImg,
        stock: 10,
        description: "Ultra high-resolution camera for professional photographers.",
        longDescription: "Incredible detail and dynamic range for landscape and studio work.",
        reviews: [], specs: { MegaPixels: "45.7", Video: "8K Raw" }
    },

    // Home & Garden (12 items)
    {
        id: 9,
        title: "Modern Minimalist Wooden Chair",
        category: "Home & Garden",
        brand: "HomeStyle",
        rating: 4.6,
        price: 44,
        oldPrice: 55,
        image: furniture,
        stock: 110,
        description: "Solid wood construction with ergonomic design.",
        longDescription: "Expertly crafted from solid oak with a warm grain finish.",
        reviews: [], specs: { Material: "Oak", MaxWeight: "250lbs" },
        isBestSeller: true,
        salesCount: "800+ sold"
    },
    {
        id: 10,
        title: "Ergonomic Adjustable Standing Desk",
        category: "Home & Garden",
        brand: "FlexiWork",
        rating: 4.7,
        price: 149,
        oldPrice: 225,
        deal: "Buy 1 Get 1 Free",
        image: officeChair,
        stock: 150,
        description: "Motorized height adjustable desk for home office.",
        longDescription: "Powerful electric motor for smooth height transitions.",
        reviews: [], specs: { Range: "28-48 in", Memory: "Presets" }
    },
    {
        id: 11,
        title: "Plush Velvet Accent Sofa Chair",
        category: "Home & Garden",
        brand: "LuxLiving",
        rating: 4.4,
        price: 124,
        oldPrice: 164,
        image: softChairs,
        stock: 25,
        description: "Soft velvet upholstery with gold-finished legs.",
        longDescription: "Premium jewel-toned velvet that is buttery soft to the touch.",
        reviews: [], specs: { Material: "Velvet", Legs: "Metal" }
    },
    {
        id: 12,
        title: "Indoor Potted Snake Plant",
        category: "Home & Garden",
        brand: "GreenThumb",
        rating: 4.2,
        price: 17,
        oldPrice: null,
        image: plants,
        stock: 300,
        description: "Low maintenance indoor plant for air purification.",
        longDescription: "Striking upright leaves that thrive in almost any light.",
        reviews: [], specs: { Difficulty: "Low", Sunlight: "Partial" }
    },
    {
        id: 13,
        title: "Premium Memory Foam Mattress",
        category: "Home & Garden",
        brand: "SleepWell",
        rating: 4.9,
        price: 249,
        oldPrice: 349,
        image: mattress,
        stock: 40,
        description: "12-inch memory foam with cooling gel technology.",
        longDescription: "Tailored orthopedic support for better sleep.",
        reviews: [], specs: { Thickness: "12 in", Feel: "Medium Firm" },
        isBestSeller: true,
        salesCount: "1.1k+ sold"
    },
    {
        id: 44,
        title: "Wooden Window Curtain Rod",
        category: "Home & Garden",
        brand: "DecorAll",
        rating: 4.5,
        price: 16,
        oldPrice: null,
        image: curtainRod,
        stock: 200,
        description: "Classic wooden rod with elegant finish.",
        longDescription: "Includes all mounting hardware and brackets.",
        reviews: [], specs: { Length: "6-12 ft", Material: "Natural Wood" }
    },
    {
        id: 45,
        title: "Smart Indoor Herb Garden",
        category: "Home & Garden",
        brand: "AeroGrow",
        rating: 4.8,
        price: 64,
        oldPrice: 99,
        image: selfWateringGarden,
        stock: 80,
        description: "Grow fresh herbs year-round in your kitchen.",
        longDescription: "LED grow lights and automatic watering system.",
        reviews: [], specs: { Lights: "LED", System: "Hydroponic" }
    },
    {
        id: 46,
        title: "Bamboo Bathtub Tray & Caddy",
        category: "Home & Garden",
        brand: "RelaxPro",
        rating: 4.7,
        price: 22,
        oldPrice: 29,
        image: bambooTray,
        stock: 120,
        description: "Expandable tray with tablet and wine holder.",
        longDescription: "Waterproof bamboo with non-slip grips.",
        reviews: [], specs: { Material: "Organic Bamboo", Width: "Expandable" }
    },
    {
        id: 47,
        title: "Velvet Throw Pillows (Set of 2)",
        category: "Home & Garden",
        brand: "StyleSoft",
        rating: 4.6,
        price: 12,
        oldPrice: null,
        image: velvetPillows,
        stock: 500,
        description: "Soft decorative velvet pillows for sofa or bed.",
        longDescription: "High-quality fabric with invisible zippers.",
        reviews: [], specs: { Size: "18x18 in", Quantity: "2" }
    },
    {
        id: 48,
        title: "Organic Bamboo Yoga Mat",
        category: "Home & Garden",
        brand: "EcoFlow",
        rating: 4.5,
        price: 32,
        oldPrice: null,
        image: yogaMat,
        stock: 100,
        description: "Natural bamboo fiber mat for yoga and pilates.",
        longDescription: "Eco-friendly, non-toxic, and naturally antimicrobial.",
        reviews: [], specs: { Material: "Bamboo Fiber", Thickness: "6mm" }
    },
    {
        id: 49,
        title: "Velvet Ottoman Storage Bench",
        category: "Home & Garden",
        brand: "LuxHome",
        rating: 4.7,
        price: 94,
        oldPrice: 124,
        image: ottomanBench,
        stock: 35,
        description: "Deep button-tufted ottoman with storage space.",
        longDescription: "Plush velvet upholstery and gold-plated legs.",
        reviews: [], specs: { Type: "Storage", Material: "Velvet" }
    },
    {
        id: 50,
        title: "Smart HEPA Air Purifier",
        category: "Home & Garden",
        brand: "PureAir",
        rating: 4.8,
        price: 110,
        oldPrice: 149,
        image: smartAirPurifier,
        stock: 60,
        description: "Removes 99.97% of airborne particles and odors.",
        longDescription: "Smart sensor monitors air quality in real-time.",
        reviews: [], specs: { Filter: "True HEPA", Coverage: "500 sq ft" }
    },

    // Appliances (10 items)
    {
        id: 14,
        title: "Smart Robot Vacuum & Mop",
        category: "Appliances",
        brand: "CleanBot",
        rating: 4.8,
        price: 149,
        oldPrice: 199,
        image: robotVacuumImg,
        stock: 80,
        description: "Automatic floor cleaning with laser mapping technology.",
        longDescription: "Precision laser navigation maps your home for efficient cleaning.",
        reviews: [], specs: { Type: "Automatic", Mapping: "LIDAR" },
        isBestSeller: true,
        salesCount: "3.2k+ sold"
    },
    {
        id: 15,
        title: "Smart Convection Oven",
        category: "Appliances",
        brand: "KitchenTech",
        rating: 4.7,
        price: 99,
        oldPrice: 124,
        deal: "Get Free Apron",
        image: appliences,
        stock: 60,
        description: "10-in-1 functionality including air fry and bake.",
        longDescription: "Smart Wi-Fi connectivity for remote control and monitoring.",
        reviews: [], specs: { Functions: "10-in-1", WiFi: "Yes" }
    },
    {
        id: 16,
        title: "Professional Stand Mixer, 5Qt",
        category: "Appliances",
        brand: "BakerPro",
        rating: 4.9,
        price: 149,
        oldPrice: 174,
        image: kitchenMixtures,
        stock: 40,
        description: "Powerful 500W motor with 10 speeds.",
        longDescription: "Heavy-duty motor easily kneads through thick bread doughs.",
        reviews: [], specs: { Motor: "500W", Speeds: "10" },
        isBestSeller: true,
        salesCount: "1.4k+ sold"
    },
    {
        id: 17,
        title: "Ceramic Dinnerware Set (16-Piece)",
        category: "Appliances",
        brand: "TableTop",
        rating: 4.5,
        price: 39,
        oldPrice: null,
        image: crockery,
        stock: 200,
        description: "Elegant ceramic set for family dining.",
        longDescription: "Scratch-resistant glaze and dishwasher safe.",
        reviews: [], specs: { Pieces: "16", Material: "Ceramic" }
    },
    {
        id: 18,
        title: "High-Speed Personal Blender",
        category: "Appliances",
        brand: "NutriBlend",
        rating: 4.6,
        price: 24,
        oldPrice: 32,
        image: blenders,
        stock: 120,
        description: "Compact blender for healthy smoothies on the go.",
        longDescription: "Powerful blades handle frozen fruit and ice with ease.",
        reviews: [], specs: { Power: "600W", Cups: "2 included" }
    },
    {
        id: 19,
        title: "Electric Glass Kettle, 1.7L",
        category: "Appliances",
        brand: "HotPot",
        rating: 4.4,
        price: 19,
        oldPrice: null,
        image: electricKettle,
        stock: 180,
        description: "Rapid boil glass kettle with LED illumination.",
        longDescription: "Auto-shutoff and boil-dry protection for safety.",
        reviews: [], specs: { Capacity: "1.7L", Material: "Borosilicate Glass" }
    },
    {
        id: 51,
        title: "Copper Cookware Set (10-Piece)",
        category: "Appliances",
        brand: "ChefSpecial",
        rating: 4.8,
        price: 174,
        oldPrice: 249,
        image: copperCookwareSet,
        stock: 25,
        description: "Professional grade copper pots and pans.",
        longDescription: "Excellent heat conductivity and beautiful polished finish.",
        reviews: [], specs: { Material: "Tri-Ply Copper", Pieces: "10" }
    },
    {
        id: 52,
        title: "Automatic Espresso Machine",
        category: "Appliances",
        brand: "BaristaPro",
        rating: 4.9,
        price: 449,
        oldPrice: null,
        image: appliences, // Fallback to oven image for now
        stock: 15,
        description: "One-touch espresso, cappuccino, and latte.",
        longDescription: "Integrated grinder and milk frother for café quality coffee.",
        reviews: [], specs: { Pressure: "15 Bar", Grinder: "Burr" }
    },
    {
        id: 53,
        title: "Commercial Grade Stand Mixer",
        category: "Appliances",
        brand: "KitchenAid",
        rating: 5,
        price: 274,
        oldPrice: 325,
        image: kitchenMixtures,
        stock: 20,
        description: "The gold standard for home and professional bakers.",
        longDescription: "Unmatched durability and versatile attachment hub.",
        reviews: [], specs: { Capacity: "6 Qt", Power: "1.3 HP" }
    },
    {
        id: 54,
        title: "Multi-Functional Air Fryer",
        category: "Appliances",
        brand: "Ninja",
        rating: 4.7,
        price: 79,
        oldPrice: 99,
        image: appliences,
        stock: 90,
        description: "Crispy fried food with up to 75% less fat.",
        longDescription: "Quick and easy meals for the whole family.",
        reviews: [], specs: { Capacity: "4 Qt", Temperature: "400°F" }
    },

    // Clothing & Apparel (12 items)
    {
        id: 20,
        title: "Basic Cotton T-Shirt",
        category: "Clothing & Apparel",
        brand: "CasualDay",
        rating: 4.3,
        price: 7,
        oldPrice: null,
        image: mensTshirt,
        stock: 500,
        description: "100% organic cotton t-shirt for daily wear.",
        longDescription: "Soft, breathable, and pre-shrunk cotton.",
        reviews: [], specs: { Material: "Cotton", Fit: "Regular" }
    },
    {
        id: 21,
        title: "Insulated Men's Winter Jacket",
        category: "Clothing & Apparel",
        brand: "SummitWear",
        rating: 4.8,
        price: 64,
        oldPrice: 89,
        image: mensJacket,
        stock: 150,
        description: "Waterproof jacket designed for the coldest winters.",
        longDescription: "Thermal insulation and multiple zipped pockets.",
        reviews: [], specs: { Rating: "-20°C", Waterproof: "Yes" },
        isBestSeller: true,
        salesCount: "1.8k+ sold"
    },
    {
        id: 22,
        title: "Elegant Women's Summer Dress",
        category: "Clothing & Apparel",
        brand: "Graceful",
        rating: 4.5,
        price: 29,
        oldPrice: 44,
        image: womensDress,
        stock: 90,
        description: "Lightweight floral dress for sunny days.",
        longDescription: "Flowy fabric with a flattering waistline.",
        reviews: [], specs: { Material: "Rayon", Occasion: "Casual" }
    },
    {
        id: 23,
        title: "Performance Running Sneakers",
        category: "Clothing & Apparel",
        brand: "SwiftFoot",
        rating: 4.6,
        price: 42,
        oldPrice: 55,
        image: runningSneakers,
        stock: 250,
        description: "Breathable shoes optimized for speed and comfort.",
        longDescription: "Responsive cushioning and durable rubber sole.",
        reviews: [], specs: { Type: "Running", Weight: "Light" },
        isBestSeller: true,
        salesCount: "2.1k+ sold"
    },
    {
        id: 24,
        title: "Classic Denim Jeans - Slim Fit",
        category: "Clothing & Apparel",
        brand: "Rugged",
        rating: 4.4,
        price: 24,
        oldPrice: null,
        image: denimJeans,
        stock: 400,
        description: "Timeless denim jeans with a modern slim fit.",
        longDescription: "Durable denim that breaks in perfectly over time.",
        reviews: [], specs: { Fit: "Slim", Material: "Denim" }
    },
    {
        id: 25,
        title: "Premium Navy Blue Blazer",
        category: "Clothing & Apparel",
        brand: "FormalLink",
        rating: 4.7,
        price: 74,
        oldPrice: 99,
        image: recBlazer,
        stock: 60,
        description: "Tailored blazer for professional and social events.",
        longDescription: "Italian style wool-blend fabric.",
        reviews: [], specs: { Fit: "Tailored", Color: "Navy" }
    },
    {
        id: 26,
        title: "Casual Button-Down Shirt",
        category: "Clothing & Apparel",
        brand: "UrbanFlow",
        rating: 4.3,
        price: 17,
        oldPrice: null,
        image: casualShirt,
        stock: 200,
        description: "Versatile shirt for work or leisure.",
        longDescription: "Linen-cotton blend for all-day comfort.",
        reviews: [], specs: { Style: "Casual", Material: "Linen Blend" }
    },
    {
        id: 55,
        title: "Heavyweight Winter Coat",
        category: "Clothing & Apparel",
        brand: "Arctic",
        rating: 4.9,
        price: 99,
        oldPrice: 149,
        image: winterCoat,
        stock: 40,
        description: "Ultimate protection against extreme cold.",
        longDescription: "Faux-fur lined hood and windproof exterior.",
        reviews: [], specs: { Weight: "Heavy", Lining: "Faux Fur" }
    },
    {
        id: 56,
        title: "Lightweight Casual Jacket",
        category: "Clothing & Apparel",
        brand: "Urban",
        rating: 4.4,
        price: 22,
        oldPrice: 37,
        image: recJacket,
        stock: 120,
        description: "Perfect for layering in mild weather.",
        longDescription: "Water-resistant shell with mesh lining.",
        reviews: [], specs: { Type: "Windbreaker", Material: "Nylon" }
    },
    {
        id: 57,
        title: "Sporty Summer Shorts",
        category: "Clothing & Apparel",
        brand: "Active",
        rating: 4.2,
        price: 12,
        oldPrice: null,
        image: recShorts,
        stock: 300,
        description: "Quick-dry shorts for swimming or sports.",
        longDescription: "Elastic waistband with internal drawstring.",
        reviews: [], specs: { Type: "Board Shorts", Material: "Polyester" }
    },
    {
        id: 58,
        title: "Striped Cotton T-Shirt",
        category: "Clothing & Apparel",
        brand: "Nautical",
        rating: 4.5,
        price: 11,
        oldPrice: 17,
        image: recTshirt,
        stock: 200,
        description: "Classic striped pattern in premium cotton.",
        longDescription: "Timeless maritime style for everyday wear.",
        reviews: [], specs: { Pattern: "Striped", Fabric: "Cotton" }
    },
    {
        id: 59,
        title: "High-Rise Slim Jeans",
        category: "Clothing & Apparel",
        brand: "Studio",
        rating: 4.6,
        price: 32,
        oldPrice: 47,
        image: denimJeans,
        stock: 150,
        description: "Flattering high-rise fit with stretch denim.",
        longDescription: "Engineered to keep their shape all day long.",
        reviews: [], specs: { Rise: "High", Color: "Vintage Blue" }
    }
];

const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
};

export const products = shuffleArray(unShuffledProducts);
export const allCategories = ["Electronics", "Home & Garden", "Appliances", "Clothing & Apparel"];
