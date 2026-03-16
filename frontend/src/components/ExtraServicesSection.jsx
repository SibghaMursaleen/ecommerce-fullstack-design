import React from 'react';

const ExtraServicesSection = ({ services }) => {
    return (
        <section className="mt-8">
            <h2 className="text-[24px] font-semibold text-[#1C1C1C] mb-6 tracking-tight">Our extra services</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[18px]">
                {services.map((service, idx) => (
                    <div
                        key={idx}
                        className="bg-white border border-[#DEE2E7] rounded-[6px] overflow-hidden flex flex-col hover:shadow-sm transition-shadow cursor-pointer relative"
                    >
                        {/* Top Image */}
                        <div className="h-[120px] bg-[#1C1C1C] relative">
                            <img
                                src={service.image}
                                alt={service.title}
                                className="w-full h-full object-cover opacity-90"
                            />
                        </div>

                        {/* Circular Icon */}
                        <div className="absolute right-[22px] top-[95px] w-[50px] h-[50px] bg-[#D1E7FF] border-[2px] border-white rounded-full flex items-center justify-center shadow-sm">
                            <span className="material-icons-outlined text-[#1C1C1C] text-[20px]">{service.icon}</span>
                        </div>

                        {/* Bottom Text Area */}
                        <div className="p-[20px] pt-[22px] flex-1">
                            <h3 className="text-[#1C1C1C] font-semibold text-[16px] leading-[22px] pr-8">
                                {service.title}
                            </h3>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ExtraServicesSection;
