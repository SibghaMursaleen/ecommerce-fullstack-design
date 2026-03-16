import { useCurrency } from '../context/CurrencyContext';

const Shipping = () => {
    const { formatPrice } = useCurrency();
    return (
        <div className="bg-[#F7FAFC] min-h-screen py-10">
            <div className="container mx-auto px-4 max-w-4xl">
                {/* Breadcrumbs */}
                <nav className="flex items-center text-[16px] text-[#8B96A5] mb-6 space-x-2">
                    <Link to="/" className="cursor-pointer hover:text-[#1C1C1C] transition-colors">Home</Link>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 8L14 12L10 16" stroke="#8B96A5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="text-[#1C1C1C]">Shipping & Returns</span>
                </nav>

                <h1 className="text-3xl font-bold text-[#1C1C1C] mb-8">Shipping & Returns</h1>

                <div className="space-y-8">
                    {/* Shipping Section */}
                    <div className="bg-white border border-[#DEE2E7] rounded-lg p-8 shadow-sm">
                        <div className="flex items-center mb-6 border-b border-[#DEE2E7] pb-4 text-[#0D6EFD]">
                            <span className="material-icons text-3xl mr-3">local_shipping</span>
                            <h2 className="text-2xl font-bold text-[#1C1C1C]">Shipping Information</h2>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-semibold text-[#1C1C1C] mb-2">Processing Time</h3>
                                <p className="text-[#505050] leading-relaxed">
                                    All orders are processed within 1-2 business days. Orders are not shipped or delivered on weekends or holidays. If we are experiencing a high volume of orders, shipments may be delayed by a few days.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-[#1C1C1C] mb-2">Shipping Rates & Delivery Estimates</h3>
                                <p className="text-[#505050] leading-relaxed mb-4">
                                    Shipping charges for your order will be calculated and displayed at checkout. We offer Standard (3-5 business days) and Express (1-2 business days) shipping options.
                                </p>
                                <ul className="list-disc pl-5 text-[#505050] space-y-1">
                                    <li>Free standard shipping on orders over {formatPrice(50)}</li>
                                    <li>Flat rate of {formatPrice(4.99)} for orders under {formatPrice(50)}</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Returns Section */}
                    <div className="bg-white border border-[#DEE2E7] rounded-lg p-8 shadow-sm">
                        <div className="flex items-center mb-6 border-b border-[#DEE2E7] pb-4 text-[#0D6EFD]">
                            <span className="material-icons text-3xl mr-3">assignment_return</span>
                            <h2 className="text-2xl font-bold text-[#1C1C1C]">Returns Policy</h2>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-semibold text-[#1C1C1C] mb-2">30-Day Return Guarantee</h3>
                                <p className="text-[#505050] leading-relaxed">
                                    We accept returns up to 30 days after delivery if the item is unused and in its original condition. We will refund the full order amount minus the shipping costs for the return.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-[#1C1C1C] mb-2">How to Return an Item</h3>
                                <ol className="list-decimal pl-5 text-[#505050] space-y-2">
                                    <li>Log into your account and navigate to <Link to="/orders" className="text-[#0D6EFD] hover:underline">My Orders</Link>.</li>
                                    <li>Select the item you wish to return and click "Request Return".</li>
                                    <li>Print the provided return shipping label.</li>
                                    <li>Pack the item securely and attach the label to the package.</li>
                                    <li>Drop off the package at any authorized carrier location.</li>
                                </ol>
                            </div>
                            <div className="bg-blue-50 border border-blue-100 p-4 rounded-md mt-4">
                                <p className="text-[#1C1C1C] text-sm">
                                    <span className="font-semibold">Note:</span> Refunds will be processed within 5-7 business days after we receive the returned item.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Shipping;
