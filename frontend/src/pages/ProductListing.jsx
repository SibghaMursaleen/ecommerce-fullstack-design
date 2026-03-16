import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import SidebarFilters from '../components/SidebarFilters';
import NewsletterSection from '../components/NewsletterSection';
import Skeleton from '../components/Skeleton';
import { useCart } from '../context/CartContext';
import { useCurrency } from '../context/CurrencyContext';
import { products as allProducts, allCategories } from '../data/products';

const BreadcrumbChevron = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 8L14 12L10 16" stroke="#8B96A5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const ProductListing = () => {
    const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
    const location = useLocation();

    // Parse search parameter
    const searchParams = new URLSearchParams(location.search);
    const searchQuery = searchParams.get('search') || '';
    const initialCategory = searchParams.get('category') || 'All';
    const sortType = searchParams.get('sort') || '';

    const [activeCategory, setActiveCategory] = useState(initialCategory);
    const [activeFilters, setActiveFilters] = useState({ brands: [], features: [], condition: null });
    const [currentPage, setCurrentPage] = useState(1);
    const { addToCart } = useCart();

    // Sync category if URL changes (e.g. searching from navbar again)
    useEffect(() => {
        const urlCat = new URLSearchParams(location.search).get('category') || 'All';
        setActiveCategory(urlCat);
    }, [location.search]);

    const itemsPerPage = 9;

    // Filter products by category, search query, and active sidebar filters
    let processedProducts = allProducts.filter(p => {
        // Category & Search
        const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
        const matchesSearch = searchQuery === '' || p.title.toLowerCase().includes(searchQuery.toLowerCase());

        // Sidebar Filters
        const matchesBrand = activeFilters.brands.length === 0 || activeFilters.brands.includes(p.brand);
        const matchesCondition = !activeFilters.condition || p.condition === activeFilters.condition;
        // Require the product to have ALL selected features (or you could do ANY)
        const matchesFeatures = activeFilters.features.length === 0 ||
            activeFilters.features.every(feature => p.features?.includes(feature));

        // Price Filter
        let matchesPrice = true;
        if (activeFilters.price) {
            if (activeFilters.price.min && p.price < Number(activeFilters.price.min)) matchesPrice = false;
            if (activeFilters.price.max && p.price > Number(activeFilters.price.max)) matchesPrice = false;
        }

        return matchesCategory && matchesSearch && matchesBrand && matchesCondition && matchesFeatures && matchesPrice;
    });

    // Apply Specialized Sorting if sort parameter exists
    if (sortType === 'hot') {
        processedProducts = processedProducts
            .filter(p => p.oldPrice > p.price)
            .sort((a, b) => {
                const discountA = (a.oldPrice - a.price) / a.oldPrice;
                const discountB = (b.oldPrice - b.price) / b.oldPrice;
                return discountB - discountA;
            });
    } else if (sortType === 'best') {
        processedProducts = processedProducts.sort((a, b) => (b.orders || 0) - (a.orders || 0));
    } else if (sortType === 'new') {
        processedProducts = processedProducts.sort((a, b) => b.id - a.id);
    } else if (sortType === 'trending') {
        processedProducts = processedProducts.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }

    const filteredProducts = processedProducts;

    // Reset page to 1 when any filter/search changes
    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, activeCategory, activeFilters, sortType]);

    // Calculate pagination
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

    const handleCategoryChange = (category) => {
        setActiveCategory(category);
        setCurrentPage(1); // Reset to first page when filtering
    };

    return (
        <>
            <div className="bg-[#F7FAFC] min-h-screen pb-10">
                <div className="container mx-auto px-4">

                    {/* Breadcrumbs */}
                    <nav className="flex items-center text-[16px] text-[#8B96A5] py-5 space-x-2">
                        <Link to="/" className="cursor-pointer hover:text-[#1C1C1C] transition-colors">Home</Link>
                        <BreadcrumbChevron />
                        <span className="cursor-pointer hover:text-[#1C1C1C] transition-colors">{activeCategory === 'All' ? 'All Products' : activeCategory}</span>
                    </nav>

                    <div className="flex flex-col lg:flex-row gap-6 mt-2">

                        {/* Sidebar (Desktop only) */}
                        <aside className="hidden lg:block w-[240px] flex-shrink-0">
                            <SidebarFilters
                                categories={allCategories}
                                activeCategory={activeCategory}
                                onCategoryChange={handleCategoryChange}
                                currentProducts={allProducts.filter(p => activeCategory === 'All' || p.category === activeCategory)}
                                onFilterChange={setActiveFilters}
                            />
                        </aside>

                        {/* Main Content */}
                        <div className="flex-1">

                            {/* Top Control Bar */}
                            <div className="bg-white border border-[#DEE2E7] rounded-[6px] px-3 sm:px-5 py-3 flex flex-wrap items-center justify-between gap-3 mb-3">
                                <p className="text-[#1C1C1C] text-[15px] sm:text-[16px]">
                                    <span className="font-normal">{filteredProducts.length} items found {searchQuery && `for "${searchQuery}"`} </span>
                                    {!searchQuery && !sortType && <strong>in {activeCategory === 'All' ? 'All Categories' : activeCategory}</strong>}
                                    {!searchQuery && sortType === 'hot' && <strong>in Hot Offers</strong>}
                                    {!searchQuery && sortType === 'best' && <strong>in Best Sellers</strong>}
                                    {!searchQuery && sortType === 'new' && <strong>in New Arrivals</strong>}
                                    {!searchQuery && sortType === 'trending' && <strong>in Trending</strong>}
                                </p>
                                <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
                                    {/* Sort Dropdown */}
                                    <div className="relative border border-[#DEE2E7] rounded-[6px]">
                                        <select className="appearance-none pl-3 pr-8 py-[6px] outline-none bg-transparent text-[#1C1C1C] text-[14px] sm:text-[16px] cursor-pointer">
                                            <option>Featured</option>
                                            <option>Price: Low to High</option>
                                            <option>Price: High to Low</option>
                                        </select>
                                        <span className="material-icons absolute right-1 top-1/2 -translate-y-1/2 pointer-events-none text-[#8B96A5] text-[20px]">expand_more</span>
                                    </div>
                                    {/* View Toggles */}
                                    <div className="flex border border-[#DEE2E7] rounded-[6px] overflow-hidden">
                                        <button
                                            onClick={() => setViewMode('grid')}
                                            className={`px-2 sm:px-3 py-[6px] ${viewMode === 'grid' ? 'bg-[#EFF2F4]' : 'bg-white hover:bg-gray-50'}`}
                                        >
                                            <span className="material-icons text-[#8B96A5] text-[20px] sm:text-[22px]">grid_view</span>
                                        </button>
                                        <button
                                            onClick={() => setViewMode('list')}
                                            className={`px-2 sm:px-3 py-[6px] border-l border-[#DEE2E7] ${viewMode === 'list' ? 'bg-[#EFF2F4]' : 'bg-white hover:bg-gray-50'}`}
                                        >
                                            <span className="material-icons text-[#8B96A5] text-[20px] sm:text-[22px]">format_list_bulleted</span>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Product Grid */}
                            {currentProducts.length > 0 ? (
                                <div className={`grid gap-4 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'}`}>
                                    {currentProducts.map(product => (
                                        <GridProductCard key={product.id} product={product} viewMode={viewMode} />
                                    ))}
                                </div>
                            ) : (
                                <div className="bg-white border border-[#DEE2E7] rounded-[6px] py-16 flex flex-col items-center justify-center text-center">
                                    <span className="material-icons text-[#8B96A5] text-[64px] mb-4">search_off</span>
                                    <h3 className="text-[#1C1C1C] text-[20px] font-semibold mb-2">No products found</h3>
                                    <p className="text-[#8B96A5] max-w-md">We couldn't find anything matching "{searchQuery}". Try adjusting your search term or filters.</p>
                                </div>
                            )}

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className="flex justify-end items-center mt-6">
                                    <div className="flex border border-[#DEE2E7] rounded-[6px] bg-white overflow-hidden text-[16px] font-medium">
                                        <button
                                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                            disabled={currentPage === 1}
                                            className={`px-[16px] py-[8px] border-r border-[#DEE2E7] flex items-center ${currentPage === 1 ? 'bg-gray-50 text-gray-300 cursor-not-allowed' : 'text-[#1C1C1C] hover:bg-gray-50'}`}
                                        >
                                            <span className="material-icons leading-none">chevron_left</span>
                                        </button>

                                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                            <button
                                                key={page}
                                                onClick={() => setCurrentPage(page)}
                                                className={`px-[16px] py-[8px] border-r border-[#DEE2E7] ${currentPage === page ? 'bg-[#EFF2F4] text-[#8B96A5]' : 'text-[#1C1C1C] hover:bg-gray-50'}`}
                                            >
                                                {page}
                                            </button>
                                        ))}

                                        <button
                                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                            disabled={currentPage === totalPages}
                                            className={`px-[16px] py-[8px] flex items-center ${currentPage === totalPages ? 'bg-gray-50 text-gray-300 cursor-not-allowed' : 'text-[#1C1C1C] hover:bg-gray-50'}`}
                                        >
                                            <span className="material-icons leading-none">chevron_right</span>
                                        </button>
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>
                </div>
            </div>
            <NewsletterSection />
        </>
    );
};

const GridProductCard = ({ product, viewMode }) => {
    const { addToCart } = useCart();
    const { formatPrice } = useCurrency();
    const [isLoaded, setIsLoaded] = useState(false);
    const stars = Math.round(product.rating / 2);
    if (viewMode === 'list') {
        return (
            <div className="bg-white border border-[#DEE2E7] rounded-[6px] p-4 flex gap-5 hover:shadow-sm transition-shadow product-card group">
                <div className="w-[160px] h-[160px] flex-shrink-0 flex items-center justify-center relative bg-white rounded-md overflow-hidden">
                    {!isLoaded && <Skeleton width="100%" height="100%" />}
                    <img
                        src={product.image}
                        alt={product.title}
                        className={`w-full h-full object-cover transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
                        onLoad={() => setIsLoaded(true)}
                    />
                </div>
                <div className="flex-1">
                    <Link to={`/product/${product.id}`}>
                        <h3 className="text-[#1C1C1C] text-[16px] font-semibold mb-2 hover:text-primary transition-colors inline-block">{product.title}</h3>
                    </Link>
                    <div className="flex items-baseline gap-2 mb-2">
                        <span className="text-[#1C1C1C] text-[22px] font-bold">{formatPrice(product.price)}</span>
                        {product.oldPrice && <span className="text-[#8B96A5] line-through text-[16px]">{formatPrice(product.oldPrice)}</span>}
                    </div>
                    <div className="flex items-center flex-wrap gap-x-1 mb-3 text-[14px]">
                        <div className="flex items-center">
                            {[1, 2, 3, 4, 5].map(i => (
                                <span key={i} className={`material-icons text-[16px] ${i <= stars ? 'text-[#FF9017]' : 'text-[#DEE2E7]'}`}>star</span>
                            ))}
                        </div>
                        <span className="text-[#FF9017] font-semibold ml-1">{product.rating}</span>
                        <span className="text-[#8B96A5] mx-1">•</span>
                        <span className="text-[#8B96A5]">{product.orders} orders</span>
                        <span className="text-[#8B96A5] mx-1">•</span>
                        <span className="text-[#00B517] font-medium">{product.shipping}</span>
                    </div>
                    <p className="text-[#505050] text-[14px] leading-[22px] mb-3 line-clamp-2">{product.description}</p>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => addToCart(product)}
                            className="bg-primary text-white px-4 py-1.5 rounded-[6px] text-sm font-medium hover:bg-blue-700 transition-colors"
                        >
                            Add to cart
                        </button>
                        <Link to={`/product/${product.id}`} className="text-[#0D6EFD] text-[14px] font-medium hover:underline">View details</Link>
                    </div>
                </div>
                <button className="w-[38px] h-[38px] border border-[#DEE2E7] rounded-[6px] flex items-center justify-center hover:bg-gray-50 flex-shrink-0 self-start">
                    <span className="material-icons-outlined text-[#0D6EFD] text-[20px]">favorite_border</span>
                </button>
            </div>
        );
    }

    return (
        <div className="bg-white border border-[#DEE2E7] rounded-[6px] p-4 flex flex-col transition-all cursor-pointer product-card hover:border-primary group">
            {/* Image */}
            <div className="w-full h-[160px] flex items-center justify-center mb-4 relative overflow-hidden rounded-t-[6px] bg-white">
                {!isLoaded && <Skeleton width="100%" height="100%" />}
                <img
                    src={product.image}
                    alt={product.title}
                    className={`w-full h-full object-cover transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
                    onLoad={() => setIsLoaded(true)}
                />
                <button className="absolute top-2 right-2 w-[34px] h-[34px] border border-[#DEE2E7] rounded-[6px] bg-white flex items-center justify-center hover:bg-gray-50 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="material-icons-outlined text-[#0D6EFD] text-[18px]">favorite_border</span>
                </button>
            </div>
            <Link to={`/product/${product.id}`} className="block relative z-10 w-full mb-2">
                {/* Title */}
                <h3 className="text-[#1C1C1C] text-[15px] font-semibold leading-snug hover:text-primary transition-colors">{product.title}</h3>
            </Link>
            {/* Price */}
            <div className="flex items-baseline gap-2 mb-1">
                <span className="text-[#1C1C1C] text-[22px] font-bold">{formatPrice(product.price)}</span>
                {product.oldPrice && <span className="text-[#8B96A5] line-through text-[14px]">{formatPrice(product.oldPrice)}</span>}
            </div>
            {/* Rating + Orders + Shipping */}
            <div className="flex items-center flex-wrap gap-x-1 gap-y-1 mb-2 text-[14px]">
                <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map(i => (
                        <span key={i} className={`material-icons text-[16px] ${i <= stars ? 'text-[#FF9017]' : 'text-[#DEE2E7]'}`}>star</span>
                    ))}
                </div>
                <span className="text-[#FF9017] font-semibold ml-1">{product.rating}</span>
                <span className="text-[#8B96A5] mx-1">•</span>
                <span className="text-[#8B96A5]">{product.orders} orders</span>
                <span className="text-[#8B96A5] mx-1">•</span>
                <span className="text-[#00B517] font-medium">{product.shipping}</span>
            </div>
            <button
                onClick={() => addToCart(product)}
                className="mt-auto bg-[#0D6EFD] text-white py-2 rounded-[6px] text-sm font-medium opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0"
            >
                Add to cart
            </button>
        </div>
    );
};

export default ProductListing;
