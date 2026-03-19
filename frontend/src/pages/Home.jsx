import React, { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import DealsSection from '../components/DealsSection';
import CategorySection from '../components/CategorySection';
import QuoteSection from '../components/QuoteSection';
import RecommendedSection from '../components/RecommendedSection';
import ExtraServicesSection from '../components/ExtraServicesSection';
import SuppliersSection from '../components/SuppliersSection';
import NewsletterSection from '../components/NewsletterSection';
import { useCart } from '../context/CartContext';

// Recommended Items Images
import tShirt from '../assets/Recommandations/t-shirt.png';
import shorts from '../assets/Recommandations/shorts.png';
import jacket from '../assets/Recommandations/jacket.png';
import jeansBag from '../assets/Recommandations/jeans-bag.png';
import wallet from '../assets/Recommandations/wallet.png';
import blazer from '../assets/Recommandations/balzer.png';
import headsets from '../assets/Recommandations/headsets.png';
import crockeryRec from '../assets/Recommandations/crockery.png';
import watchRec from '../assets/Recommandations/Smart_Watches.png';
import kettleRec from '../assets/Recommandations/electric-kattle.png';

// Extra Services Images
import industryHubs from '../assets/extra-services/industry-hubs.png';
import customizeProduct from '../assets/extra-services/customize-product.png';
import shippingOceanAir from '../assets/extra-services/shipping-y-ocean-air.png';
import productMonitoring from '../assets/extra-services/product-mointering.png';

// Flag Images
import flagAE from '../assets/flags/AE@2x.png';
import flagAU from '../assets/flags/icon.png';
import flagUS from '../assets/flags/US@2x.png';
import flagRU from '../assets/flags/RU@2x.png';
import flagIT from '../assets/flags/IT@2x.png';
import flagDK from '../assets/flags/DK@2x.png';
import flagFR from '../assets/flags/FR@2x.png';
import flagCN from '../assets/flags/CN@2x.png';
import flagGB from '../assets/flags/GB@2x.png';

// Category Images
import outdoorBg from '../assets/Home-and-outdoor-background.png';
import softChairs from '../assets/soft-chairs.png';
import appliences from '../assets/appliences.png';
import mattresses from '../assets/mattress.png';
import crockery from '../assets/crockery.png';
import kitchenMixer from '../assets/kitchen-mixtures.png';
import blenders from '../assets/blenders.png';
import furniture from '../assets/furniture.png';
import plants from '../assets/plants.png';
// Electronics Images
import electronicsBg from '../assets/electronic-gadets.png';
import smartWatch from '../assets/Smart_Watches.png';
import headphones from '../assets/headsets.png';
import kettle from '../assets/electric-kattle.png';
import gamingSet from '../assets/gaming-set.png';
import laptop from '../assets/Laptops.png';
import cameras from '../assets/Gopro_Cameras.png';
import phone from '../assets/iphone.png';


import { fetchProducts } from '../services/api';

const Home = () => {
    const { addToCart } = useCart();
    const [homeOutdoorItems, setHomeOutdoorItems] = useState([]);
    const [electronicsItems, setElectronicsItems] = useState([]);
    const [recommendedItems, setRecommendedItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadHomeContent = async () => {
            setLoading(true);
            try {
                const allFetchedProducts = await fetchProducts();
                
                // Map API data back to the simple structure used by CategorySection
                const mapToHomeFormat = (items) => items.map(p => ({
                    name: p.title,
                    price: p.price.toString(),
                    image: p.image
                }));

                const homeItems = allFetchedProducts.filter(p => p.category === 'Home & Garden').slice(0, 8);
                const electroItems = allFetchedProducts.filter(p => p.category === 'Electronics').slice(0, 8);
                
                setHomeOutdoorItems(mapToHomeFormat(homeItems));
                setElectronicsItems(mapToHomeFormat(electroItems));

                // Diversify Recommended: Take a few from each category to restore variety
                const clothingItems = allFetchedProducts.filter(p => p.category === 'Clothing & Apparel');
                const diverseRecommended = [
                    ...clothingItems.slice(0, 4),
                    ...homeItems.slice(4, 6),
                    ...electroItems.slice(4, 8)
                ];
                setRecommendedItems(mapToHomeFormat(diverseRecommended));
            } catch (err) {
                console.error("Error loading home content:", err);
            } finally {
                setLoading(false);
            }
        };
        loadHomeContent();
    }, []);


    const extraServicesData = [
        { title: "Source from Industry Hubs", icon: "search", image: industryHubs },
        { title: "Customize Your Products", icon: "inventory_2", image: customizeProduct },
        { title: "Fast, reliable shipping by ocean or air", icon: "send", image: shippingOceanAir },
        { title: "Product monitoring and inspection", icon: "security", image: productMonitoring },
    ];

    const suppliersData = [
        { country: "Arabic Emirates", domain: "shopname.ae", flag: flagAE },
        { country: "Australia", domain: "shopname.ae", flag: flagAU },
        { country: "United States", domain: "shopname.ae", flag: flagUS },
        { country: "Russia", domain: "shopname.ru", flag: flagRU },
        { country: "Italy", domain: "shopname.it", flag: flagIT },
        { country: "Denmark", domain: "denmark.com.dk", flag: flagDK },
        { country: "France", domain: "shopname.com.fr", flag: flagFR },
        { country: "Arabic Emirates", domain: "shopname.ae", flag: flagAE },
        { country: "China", domain: "shopname.ae", flag: flagCN },
        { country: "Great Britain", domain: "shopname.co.uk", flag: flagGB },
    ];

    return (
        <>
            <main className="container mx-auto px-4 pb-10">
                <Hero />
                <DealsSection />
                <CategorySection
                    title="Home and outdoor"
                    items={homeOutdoorItems}
                    sidebarImg={outdoorBg}
                    otherProductsLink={`/products?category=${encodeURIComponent('Home & Garden')}`}
                />
                <CategorySection
                    title="Consumer electronics and gadgets"
                    items={electronicsItems}
                    sidebarImg={electronicsBg}
                    otherProductsLink="/products?category=Electronics"
                />
                <QuoteSection />
                <RecommendedSection items={recommendedItems} />
                <ExtraServicesSection services={extraServicesData} />
                <SuppliersSection suppliers={suppliersData} />
            </main>

            <NewsletterSection />
        </>
    );
};

export default Home;
