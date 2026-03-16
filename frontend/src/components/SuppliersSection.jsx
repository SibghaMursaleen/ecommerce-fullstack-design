import React from 'react';

const SuppliersSection = ({ suppliers }) => {
    return (
        <section className="mt-8 flex flex-col items-center justify-center text-center">
            <h2 className="text-[24px] font-semibold text-[#1C1C1C] mb-6 tracking-tight w-full text-center">Suppliers by region</h2>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-4 gap-x-6 max-w-[1000px] w-full text-left mx-auto justify-items-center">
                {suppliers.map((supplier, idx) => (
                    <div key={idx} className="flex items-center space-x-3">
                        <img
                            src={supplier.flag}
                            alt={`${supplier.country} flag`}
                            className="w-[28px] h-[20px] object-cover rounded-[2px]"
                        />
                        <div>
                            <p className="text-[#1C1C1C] text-[16px] font-normal leading-tight">{supplier.country}</p>
                            <p className="text-[#8B96A5] text-[13px] font-normal leading-tight">{supplier.domain}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default SuppliersSection;
