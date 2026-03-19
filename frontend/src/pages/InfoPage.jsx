import React, { useEffect } from 'react';

const InfoPage = ({ title, content, icon }) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="bg-gray-bg min-h-[60vh] py-12">
            <div className="container mx-auto px-4">
                <div className="bg-white rounded-lg p-8 md:p-12 shadow-sm border border-[#DEE2E7] max-w-4xl mx-auto">
                    <div className="flex items-center gap-4 mb-8">
                        {icon && (
                            <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center">
                                <span className="material-icons text-3xl">{icon}</span>
                            </div>
                        )}
                        <h1 className="text-3xl font-bold text-[#1C1C1C]">{title}</h1>
                    </div>
                    
                    <div className="prose prose-blue max-w-none text-[#505050] leading-relaxed">
                        {content ? content : (
                            <div className="space-y-6">
                                <p className="text-lg italic text-[#8B96A5]">
                                    This page is under construction, but here is some information about {title}.
                                </p>
                                <section>
                                    <h2 className="text-xl font-bold text-[#1C1C1C] mb-3">Overview</h2>
                                    <p>
                                        Welcome to our {title} page. We are committed to providing the best service and experience to our users. 
                                        This section contains important details regarding our operations and how we can better serve you.
                                    </p>
                                </section>
                                <section>
                                    <h2 className="text-xl font-bold text-[#1C1C1C] mb-3">Learn More</h2>
                                    <p>
                                        Our platform connects global suppliers with dedicated buyers. For more specific inquiries, 
                                        please visit our Contact Us page or reach out to our 24/7 Support Team.
                                    </p>
                                </section>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InfoPage;
