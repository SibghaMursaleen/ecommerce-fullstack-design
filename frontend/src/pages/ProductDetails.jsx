import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import DiscountBanner from '../components/DiscountBanner';
import Skeleton from '../components/Skeleton';
import { useCart } from '../context/CartContext';
import { useCurrency } from '../context/CurrencyContext';
import { products } from '../data/products';
import xiaomi from '../assets/xiaomi.jpg';
import gopro from '../assets/Gopro_Cameras.png';
import smartWatch from '../assets/Smart_Watches.png';
import headphones from '../assets/boost_headphones.png';
import tShirt from '../assets/Recommandations/t-shirt.png';
import shorts from '../assets/Recommandations/shorts.png';
import jacket from '../assets/Recommandations/jacket.png';
import blazer from '../assets/Recommandations/balzer.png';
import watchRec from '../assets/Recommandations/Smart_Watches.png';

const BreadcrumbChevron = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M10 8L14 12L10 16" stroke="#8B96A5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);



const ProductDetails = () => {
    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState('description');
    const [selectedColor, setSelectedColor] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);
    const { addToCart } = useCart();
    const { formatPrice } = useCurrency();

    const { id } = useParams();
    const product = products.find(p => p.id === Number(id));

    const relatedProducts = products.filter(p => p.category === product?.category && p.id !== product?.id).slice(0, 4);
    const smallRecommendations = products.filter(p => p.id !== product?.id).sort(() => 0.5 - Math.random()).slice(0, 5);

    const images = product && product.image ? [product.image] : [];
    const colors = product?.colors || [];

    if (!product) {
        return (
            <div className="bg-[#F7FAFC] min-h-screen py-10 flex items-center justify-center">
                <div className="text-center bg-white p-10 rounded-lg border border-[#DEE2E7]">
                    <h2 className="text-2xl font-bold text-[#1C1C1C] mb-2">Product Not Found</h2>
                    <p className="text-[#8B96A5] mb-6">Sorry, we couldn't find the product you're looking for.</p>
                    <Link to="/products" className="bg-[#0D6EFD] text-white px-6 py-2 rounded-[6px] font-medium hover:bg-blue-700">
                        Back to Products
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="bg-[#F7FAFC] min-h-screen pb-10">
                <div className="container mx-auto px-4">

                    {/* Breadcrumbs */}
                    <nav className="flex items-center text-[14px] text-[#8B96A5] py-5 gap-1 flex-wrap">
                        <Link to="/" className="cursor-pointer hover:text-[#1C1C1C]">Home</Link>
                        <BreadcrumbChevron />
                        <Link to="/products" className="cursor-pointer hover:text-[#1C1C1C]">{product.category}</Link>
                        <BreadcrumbChevron />
                        <span className="cursor-pointer hover:text-[#1C1C1C]">{product.title}</span>
                    </nav>

                    {/* ── MAIN PRODUCT SECTION ── */}
                    <div className="bg-white border border-[#DEE2E7] rounded-[6px] p-6 mb-5">
                        <div className="flex flex-col lg:flex-row gap-8">

                            {/* ── LEFT: Image Gallery ── */}
                            <div className="flex flex-col sm:flex-row lg:flex-row gap-4 lg:w-[45%]">
                                {/* Thumbnails column */}
                                {images.length > 1 && (
                                    <div className="flex sm:flex-col gap-3 order-2 sm:order-1">
                                        {images.map((img, i) => (
                                            <button
                                                key={i}
                                                onClick={() => setSelectedImage(i)}
                                                className={` Simpsonw-[64px] h-[64px] border rounded-[6px] p-1.5 flex-shrink-0 flex items-center justify-center transition-colors ${selectedImage === i ? 'border-[#0D6EFD]' : 'border-[#DEE2E7] hover:border-gray-400'}`}
                                            >
                                                <img src={img} alt="" className="w-full h-full object-contain" />
                                            </button>
                                        ))}
                                    </div>
                                )}
                                {/* Main image */}
                                <div className="flex-1 order-1 sm:order-2 border border-[#DEE2E7] rounded-[6px] flex items-center justify-center p-6 min-h-[320px] relative overflow-hidden">
                                    {!isLoaded && <Skeleton width="100%" height="100%" />}
                                    <img
                                        src={images[selectedImage]}
                                        alt={product.title}
                                        className={`max-h-[320px] w-full object-contain transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
                                        onLoad={() => setIsLoaded(true)}
                                    />
                                </div>
                            </div>

                            {/* ── RIGHT: Product Info ── */}
                            <div className="flex-1">
                                {/* Badge */}
                                <span className="inline-block bg-[#FFE2E2] text-[#FF3838] text-[13px] font-semibold px-3 py-1 rounded-[30px] mb-3">-12% OFF</span>

                                <h1 className="text-[#1C1C1C] text-[24px] font-semibold leading-snug mb-3">
                                    {product.title}
                                </h1>

                                {/* Rating Row */}
                                <div className="flex items-center gap-3 mb-4 pb-4 border-b border-[#DEE2E7] flex-wrap">
                                    <div className="flex items-center text-[#FF9017]">
                                        {[1, 2, 3, 4, 5].map(i => (
                                            <span key={i} className={`material-icons text-[18px] ${i <= 4 ? 'text-[#FF9017]' : 'text-[#DEE2E7]'}`}>star</span>
                                        ))}
                                    </div>
                                    <span className="text-[#FF9017] font-semibold">4.5</span>
                                    <span className="text-[#8B96A5]">•</span>
                                    <span className="text-[#8B96A5] text-[14px]">154 Reviews</span>
                                    <span className="text-[#8B96A5]">•</span>
                                    <span className="text-[#00B517] font-medium text-[14px]">In stock</span>
                                </div>

                                {/* Price */}
                                <div className="flex items-baseline gap-3 mb-5">
                                    <span className="text-[30px] font-bold text-[#1C1C1C]">{formatPrice(product.price)}</span>
                                    {product.oldPrice && <span className="text-[20px] text-[#8B96A5] line-through">{formatPrice(product.oldPrice)}</span>}
                                </div>

                                {/* Color Selector */}
                                {colors.length > 0 && (
                                    <div className="mb-5">
                                        <p className="text-[#1C1C1C] text-[15px] font-semibold mb-2">
                                            Color: <span className="font-normal text-[#505050]">{colors[selectedColor]?.name}</span>
                                        </p>
                                        <div className="flex gap-2">
                                            {colors.map((colorObj, i) => (
                                                <button
                                                    key={i}
                                                    onClick={() => setSelectedColor(i)}
                                                    style={{ backgroundColor: colorObj.hex }}
                                                    className={`w-8 h-8 rounded-full border-2 transition-all ${selectedColor === i ? 'border-[#0D6EFD] scale-110' : 'border-transparent shadow-sm'}`}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Storage / Tech Specs Selector */}
                                {product.storage && (
                                    <div className="mb-5">
                                        <p className="text-[#1C1C1C] text-[15px] font-semibold mb-2">Storage:</p>
                                        <div className="flex gap-2 flex-wrap">
                                            {product.storage.map((s, i) => (
                                                <button key={s} className={`px-4 py-1.5 rounded-[6px] border text-[14px] font-medium transition-colors ${i === 1 ? 'border-[#0D6EFD] bg-[#EBF3FF] text-[#0D6EFD]' : 'border-[#DEE2E7] text-[#505050] hover:border-[#0D6EFD]'}`}>
                                                    {s}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Size Selector */}
                                {product.sizes && (
                                    <div className="mb-5">
                                        <p className="text-[#1C1C1C] text-[15px] font-semibold mb-2">Size:</p>
                                        <div className="flex gap-2 flex-wrap">
                                            {product.sizes.map((s, i) => (
                                                <button key={s} className={`w-10 h-10 flex items-center justify-center rounded-[6px] border text-[14px] font-medium transition-colors ${i === 2 ? 'border-[#0D6EFD] bg-[#EBF3FF] text-[#0D6EFD]' : 'border-[#DEE2E7] text-[#505050] hover:border-[#0D6EFD]'}`}>
                                                    {s}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Quantity + Actions */}
                                <div className="flex flex-wrap gap-3 mb-5">
                                    <div className="flex border border-[#DEE2E7] rounded-[6px] overflow-hidden">
                                        <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="px-4 py-2 text-[#1C1C1C] hover:bg-gray-100 text-[20px] border-r border-[#DEE2E7]">−</button>
                                        <span className="px-6 py-2 text-[#1C1C1C] text-[16px] font-medium min-w-[60px] text-center">{quantity}</span>
                                        <button onClick={() => setQuantity(q => q + 1)} className="px-4 py-2 text-[#1C1C1C] hover:bg-gray-100 text-[20px] border-l border-[#DEE2E7]">+</button>
                                    </div>
                                    <button
                                        onClick={() => addToCart({ ...product, qty: quantity })}
                                        className="flex-1 min-w-[140px] bg-[#0D6EFD] text-white py-2 px-6 rounded-[6px] font-semibold text-[16px] hover:bg-blue-700 transition-colors"
                                    >
                                        Buy now
                                    </button>
                                    <button className="w-[44px] h-[44px] border border-[#DEE2E7] rounded-[6px] flex items-center justify-center hover:bg-gray-50">
                                        <span className="material-icons-outlined text-[#8B96A5] text-[22px]">favorite_border</span>
                                    </button>
                                </div>

                                {/* Service badges */}
                                <div className="border border-[#DEE2E7] rounded-[6px] divide-y divide-[#DEE2E7]">
                                    <div className="flex items-center gap-3 px-4 py-3">
                                        <span className="material-icons-outlined text-[#1C1C1C] text-[22px]">local_shipping</span>
                                        <div>
                                            <p className="text-[#1C1C1C] text-[14px] font-semibold">Free Delivery</p>
                                            <p className="text-[#505050] text-[12px]">Enter your postal code for Delivery Availability</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 px-4 py-3">
                                        <span className="material-icons-outlined text-[#1C1C1C] text-[22px]">refresh</span>
                                        <div>
                                            <p className="text-[#1C1C1C] text-[14px] font-semibold">Return Policy</p>
                                            <p className="text-[#505050] text-[12px]">Free 30-day returns. <a href="#" className="text-[#0D6EFD]">Details</a></p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 px-4 py-3">
                                        <span className="material-icons-outlined text-[#1C1C1C] text-[22px]">verified_user</span>
                                        <div>
                                            <p className="text-[#1C1C1C] text-[14px] font-semibold">Warranty</p>
                                            <p className="text-[#505050] text-[12px]">1 year manufacturer warranty included</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* ── FAR RIGHT: Seller Info ── */}
                            <div className="lg:w-[220px] flex-shrink-0">
                                <div className="border border-[#DEE2E7] rounded-[6px] p-4">
                                    <div className="flex items-center gap-2 mb-3 pb-3 border-b border-[#DEE2E7]">
                                        <div className="w-10 h-10 bg-[#EFF2F4] rounded-full flex items-center justify-center">
                                            <span className="material-icons text-[#8B96A5]">store</span>
                                        </div>
                                        <div>
                                            <p className="text-[#1C1C1C] text-[14px] font-semibold">Supplier</p>
                                            <p className="text-[#0D6EFD] text-[13px]">Visit store</p>
                                        </div>
                                    </div>
                                    <div className="space-y-2 text-[13px] text-[#505050] mb-4">
                                        <div className="flex justify-between">
                                            <span>Feedback</span>
                                            <span className="text-[#FF9017] font-medium">★ 98%</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Ships from</span>
                                            <span className="text-[#1C1C1C] font-medium">USA</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Sold by</span>
                                            <span className="text-[#1C1C1C] font-medium">BestDeals</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Main category</span>
                                            <span className="text-[#1C1C1C] font-medium">Phones</span>
                                        </div>
                                    </div>
                                    <button className="w-full border border-[#0D6EFD] text-[#0D6EFD] py-2 rounded-[6px] text-[14px] font-medium hover:bg-[#EBF3FF] transition-colors mb-2">
                                        Send message
                                    </button>
                                    <button className="w-full bg-[#0D6EFD] text-white py-2 rounded-[6px] text-[14px] font-medium hover:bg-blue-700 transition-colors">
                                        + Follow
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* ── DESCRIPTION / REVIEWS TABS ── */}
                    <div className="flex flex-col lg:flex-row gap-5 mb-6">
                        {/* LEFT CONTENT: TABS */}
                        <div className="flex-1 bg-white border border-[#DEE2E7] rounded-[6px] overflow-hidden">
                            <div className="flex border-b border-[#DEE2E7] overflow-x-auto">
                                {[
                                    { key: 'description', label: 'Description' },
                                    { key: 'reviews', label: `Reviews (${product.reviews ? product.reviews.length : 0})` },
                                    { key: 'shipping', label: 'Shipping' },
                                    { key: 'seller', label: 'About seller' },
                                ].map(tab => (
                                    <button
                                        key={tab.key}
                                        onClick={() => setActiveTab(tab.key)}
                                        className={`px-6 py-4 text-[15px] font-medium transition-colors whitespace-nowrap ${activeTab === tab.key ? 'border-b-2 border-[#0D6EFD] text-[#0D6EFD]' : 'text-[#8B96A5] hover:text-[#1C1C1C]'}`}
                                    >
                                        {tab.label}
                                    </button>
                                ))}
                            </div>
                            <div className="p-6 text-[#505050] text-[15px] leading-[28px]">
                                {activeTab === 'description' && (
                                    <div className="space-y-6 whitespace-pre-line">
                                        <div>
                                            <p className="mb-4 text-[#505050] text-[15px] leading-[28px]">
                                                {product.longDescription || product.description}
                                            </p>
                                        </div>

                                        {/* Specs Table */}
                                        {product.specs && Object.keys(product.specs).length > 0 && (
                                            <div className="max-w-[480px] border border-[#DEE2E7] rounded-[4px] overflow-hidden mb-6">
                                                <table className="w-full text-left border-collapse">
                                                    <tbody>
                                                        {Object.entries(product.specs).map(([key, value], idx, arr) => (
                                                            <tr key={key} className={idx !== arr.length - 1 ? "border-b border-[#DEE2E7]" : ""}>
                                                                <th className="bg-[#F7FAFC] px-4 py-2 w-[40%] font-medium text-[#505050] border-r border-[#DEE2E7]">{key}</th>
                                                                <td className="px-4 py-2 text-[#505050]">{value}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        )}

                                        {/* Features List */}
                                        <ul className="space-y-2">
                                            {product.features?.map((feature, i) => (
                                                <li key={i} className="flex items-center gap-2 text-[#505050]">
                                                    <span className="material-icons text-[#8B96A5] text-[20px]">check</span>
                                                    <span>{feature}</span>
                                                </li>
                                            )) || (
                                                    <li className="flex items-center gap-2 text-[#505050]">
                                                        <span className="material-icons text-[#8B96A5] text-[20px]">check</span>
                                                        <span>Standard Features Included</span>
                                                    </li>
                                                )}
                                        </ul>
                                    </div>
                                )}
                                {activeTab === 'reviews' && (
                                    <div className="space-y-4">
                                        {product.reviews && product.reviews.length > 0 ? (
                                            product.reviews.map((r, i) => (
                                                <div key={i} className="pb-4 border-b border-[#DEE2E7] last:border-0">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <span className="font-semibold text-[#1C1C1C]">{r.name}</span>
                                                        <div className="flex">
                                                            {[1, 2, 3, 4, 5].map(s => (
                                                                <span key={s} className={`material-icons text-[14px] ${s <= r.rating ? 'text-[#FF9017]' : 'text-[#DEE2E7]'}`}>star</span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <p className="text-[14px]">{r.text}</p>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-[14px] text-[#8B96A5]">No reviews yet for this product.</p>
                                        )}
                                    </div>
                                )}
                                {activeTab === 'shipping' && (
                                    <div className="space-y-3">
                                        <p>✅ Free standard delivery on all orders over {formatPrice(50)} (5–7 business days)</p>
                                        <p>⚡ Express delivery available at checkout (1–2 business days) for {formatPrice(9.99)}</p>
                                        <p>🌍 International shipping available to 50+ countries. Rates applied at checkout.</p>
                                        <p>📦 Easy 30-day returns. Item must be in original condition.</p>
                                    </div>
                                )}
                                {activeTab === 'seller' && (
                                    <div className="space-y-3">
                                        <p>BestDeals is a certified premium reseller with 10+ years of experience in electronics.</p>
                                        <div className="flex items-center gap-4 py-2">
                                            <div className="w-16 h-16 bg-[#EFF2F4] rounded-[6px] flex items-center justify-center">
                                                <span className="material-icons text-[#8B96A5] text-[32px]">store</span>
                                            </div>
                                            <div>
                                                <p className="font-semibold text-[#1C1C1C]">BestDeals Official Store</p>
                                                <p className="text-[13px] text-[#8B96A5]">Joined in 2014 • 15k+ products</p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* RIGHT CONTENT: SIDEBAR */}
                        <div className="lg:w-[280px] flex-shrink-0">
                            <div className="bg-white border border-[#DEE2E7] rounded-[6px] p-4">
                                <h3 className="text-[#1C1C1C] text-[16px] font-semibold mb-4">You may like</h3>
                                <div className="space-y-4">
                                    {smallRecommendations.map(item => (
                                        <div
                                            key={item.id}
                                            className="flex gap-3 group cursor-pointer product-card p-1 rounded-md"
                                            onClick={() => addToCart({ ...item, qty: 1 })}
                                        >
                                            <Link
                                                to={`/product/${item.id}`}
                                                className="w-[80px] h-[80px] border border-[#DEE2E7] rounded-[6px] p-1 flex-shrink-0 flex items-center justify-center bg-white group-hover:border-[#0D6EFD] transition-colors"
                                            >
                                                <img src={item.image} alt="" className="max-w-full max-h-full object-contain" />
                                            </Link>
                                            <div className="flex flex-col justify-center">
                                                <Link to={`/product/${item.id}`} className="text-[#1C1C1C] text-[14px] font-medium leading-tight mb-1 group-hover:text-[#0D6EFD] transition-colors block">{item.title}</Link>
                                                <p className="text-[#8B96A5] text-[14px] pointer-events-none">{formatPrice(item.price)}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ── RELATED PRODUCTS ── */}
                    <div className="mb-6">
                        <h2 className="text-[#1C1C1C] text-[22px] font-semibold mb-4">Related products</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {relatedProducts.map(p => (
                                <div
                                    key={p.id}
                                    className="bg-white border border-[#DEE2E7] rounded-[6px] p-4 flex flex-col transition-all cursor-pointer product-card hover:border-primary group"
                                    onClick={() => addToCart(p)}
                                >
                                    <Link to={`/product/${p.id}`} className="w-full aspect-square flex items-center justify-center mb-3 overflow-hidden">
                                        <img src={p.image} alt={p.title} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300" />
                                    </Link>
                                    <p className="text-[#1C1C1C] text-[14px] font-medium leading-snug mb-2 line-clamp-2">{p.title}</p>
                                    <div className="flex items-baseline gap-2 mb-1">
                                        <span className="text-[#1C1C1C] text-[18px] font-bold">{formatPrice(p.price)}</span>
                                        {p.oldPrice && <span className="text-[#8B96A5] line-through text-[13px]">{formatPrice(p.oldPrice)}</span>}
                                    </div>
                                    <div className="flex">
                                        {[1, 2, 3, 4, 5].map(i => (
                                            <span key={i} className={`material-icons text-[14px] ${i <= p.rating ? 'text-[#FF9017]' : 'text-[#DEE2E7]'}`}>star</span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* ── DISCOUNT BANNER ── */}
                    <DiscountBanner />

                </div>
            </div>
        </>
    );
};

export default ProductDetails;
