import React from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { useCurrency } from '../context/CurrencyContext';
import { useAuth } from '../context/AuthContext';

const Wishlist = () => {
    const { wishlist, removeFromWishlist } = useWishlist();
    const { addToCart } = useCart();
    const { formatPrice } = useCurrency();
    const { user, loading: authLoading } = useAuth();

    if (authLoading) {
        return (
            <div className="bg-[#F7FAFC] min-h-screen py-20 flex items-center justify-center">
                <div className="flex flex-col items-center">
                    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                    <p className="mt-4 text-[#8B96A5] font-medium">Checking authentication...</p>
                </div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="bg-[#F7FAFC] min-h-screen">
                <div className="container mx-auto px-4 py-20 flex flex-col items-center justify-center">
                    <div className="bg-white border border-[#DEE2E7] rounded-[10px] p-10 max-w-[500px] w-full text-center shadow-sm">
                        <div className="w-[120px] h-[120px] bg-[#EFF2F4] rounded-full flex items-center justify-center mx-auto mb-6 relative">
                            <span className="material-icons-outlined text-[#8B96A5] text-[64px]">favorite_border</span>
                            <div className="absolute top-0 right-0 w-10 h-10 bg-primary rounded-full flex items-center justify-center border-4 border-white">
                                <span className="material-icons text-white text-[18px]">lock</span>
                            </div>
                        </div>
                        <h2 className="text-[#1C1C1C] text-[24px] font-bold mb-3">Login to view wishlist</h2>
                        <p className="text-[#505050] text-[16px] mb-8 leading-relaxed">
                            Looking for your saved favorites? Please sign in to see your wishlist and sync it across all your devices.
                        </p>
                        <div className="flex flex-col gap-3">
                            <Link to="/login" className="bg-primary text-white py-3 rounded-[6px] font-bold text-[16px] hover:bg-blue-700 transition-colors shadow-sm">
                                Sign In
                            </Link>
                            <Link to="/signup" className="text-[#0D6EFD] font-medium hover:underline py-2">
                                Create an account
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-[#F7FAFC] min-h-screen pb-10">
            <div className="container mx-auto px-4">
                {/* Breadcrumbs */}
                <nav className="flex items-center text-[16px] text-[#8B96A5] py-5 space-x-2">
                    <Link to="/" className="cursor-pointer hover:text-[#1C1C1C]">Home</Link>
                    <span className="material-icons text-[18px]">chevron_right</span>
                    <span className="text-[#1C1C1C]">Wishlist</span>
                </nav>

                <h1 className="text-[24px] font-semibold text-[#1C1C1C] mb-6">My Wishlist ({wishlist.length})</h1>

                {wishlist.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {wishlist.map(product => (
                            <div key={product.id} className="bg-white border border-[#DEE2E7] rounded-[6px] p-4 flex flex-col transition-all hover:border-primary group">
                                {/* Image */}
                                <div className="w-full h-[180px] flex items-center justify-center mb-4 relative overflow-hidden rounded-t-[6px] bg-white">
                                    <Link to={`/product/${product.id}`} className="w-full h-full">
                                        <img src={product.image} alt={product.title} className="w-full h-full object-contain p-2" />
                                    </Link>
                                    <button 
                                        onClick={() => removeFromWishlist(product.id)}
                                        className="absolute top-2 right-2 w-[34px] h-[34px] border border-[#DEE2E7] rounded-[6px] bg-white flex items-center justify-center hover:bg-red-50 text-red-500 transition-colors shadow-sm"
                                        title="Remove from Wishlist"
                                    >
                                        <span className="material-icons text-[18px]">delete_outline</span>
                                    </button>
                                </div>

                                <div className="flex-1 flex flex-col">
                                    <Link to={`/product/${product.id}`}>
                                        <h3 className="text-[#101928] text-[16px] font-medium leading-snug mb-2 hover:text-primary transition-colors line-clamp-2">
                                            {product.title}
                                        </h3>
                                    </Link>

                                    <div className="flex items-baseline gap-2 mb-3">
                                        <span className="text-[#101928] text-[18px] font-semibold">{formatPrice(product.price)}</span>
                                        {product.oldPrice && (
                                            <span className="text-[#8B96A5] line-through text-[14px]">
                                                {formatPrice(product.oldPrice)}
                                            </span>
                                        )}
                                    </div>

                                    <div className="mt-auto pt-4 border-t border-[#DEE2E7] flex items-center gap-2">
                                        <button 
                                            onClick={() => addToCart(product)}
                                            className="flex-1 bg-primary text-white py-2 rounded-[6px] text-sm font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                                        >
                                            <span className="material-icons text-[18px]">shopping_cart</span>
                                            Move to Cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white border border-[#DEE2E7] rounded-[10px] p-16 text-center shadow-sm max-w-[600px] mx-auto mt-10">
                        <div className="w-[120px] h-[120px] bg-[#EFF2F4] rounded-full flex items-center justify-center mx-auto mb-6">
                            <span className="material-icons-outlined text-[#8B96A5] text-[64px]">favorite_border</span>
                        </div>
                        <h2 className="text-[#1C1C1C] text-[24px] font-bold mb-3">Your wishlist is empty</h2>
                        <p className="text-[#505050] text-[16px] mb-8 leading-relaxed">
                            Looks like you haven't added any items to your wishlist yet. Explore our products and save your favorites!
                        </p>
                        <Link to="/products" className="inline-block bg-primary text-white px-8 py-3 rounded-[6px] font-bold text-[16px] hover:bg-blue-700 transition-colors shadow-sm">
                            Go Shopping
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Wishlist;
