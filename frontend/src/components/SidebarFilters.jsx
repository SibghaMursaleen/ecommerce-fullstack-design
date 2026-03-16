import React, { useState, useEffect } from 'react';

const SidebarFilters = ({ categories, activeCategory, onCategoryChange, currentProducts = [], onFilterChange }) => {
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [selectedFeatures, setSelectedFeatures] = useState([]);
    const [selectedCondition, setSelectedCondition] = useState('Any');
    const [priceInput, setPriceInput] = useState({ min: '', max: '' });
    const [appliedPrice, setAppliedPrice] = useState({ min: '', max: '' });

    // Extract unique values for filters from ALL products in the current category, not just the paginated ones
    const availableBrands = [...new Set(currentProducts.map(p => p.brand).filter(Boolean))];
    const availableFeatures = [...new Set(currentProducts.flatMap(p => p.features || []).filter(Boolean))];
    const availableConditions = [...new Set(currentProducts.map(p => p.condition).filter(Boolean))];

    // Notify parent when filters change
    useEffect(() => {
        if (onFilterChange) {
            onFilterChange({
                brands: selectedBrands,
                features: selectedFeatures,
                condition: selectedCondition === 'Any' ? null : selectedCondition,
                price: appliedPrice
            });
        }
    }, [selectedBrands, selectedFeatures, selectedCondition, appliedPrice, onFilterChange]);

    // Reset filters when category changes
    useEffect(() => {
        setSelectedBrands([]);
        setSelectedFeatures([]);
        setSelectedCondition('Any');
        setPriceInput({ min: '', max: '' });
        setAppliedPrice({ min: '', max: '' });
    }, [activeCategory]);

    const toggleArrayItem = (array, setArray, item) => {
        if (array.includes(item)) {
            setArray(array.filter(i => i !== item));
        } else {
            setArray([...array, item]);
        }
    };

    return (
        <div className="w-full">
            <FilterSection title="Category" defaultOpen={true}>
                <div className="flex flex-col space-y-3">
                    <span
                        onClick={() => onCategoryChange('All')}
                        className={`cursor-pointer text-[16px] ${activeCategory === 'All' ? 'text-[#1C1C1C] font-medium' : 'text-[#505050] hover:text-[#1C1C1C]'}`}
                    >
                        All Categories
                    </span>
                    {categories.map((cat) => (
                        <span
                            key={cat}
                            onClick={() => onCategoryChange(cat)}
                            className={`cursor-pointer text-[16px] ${activeCategory === cat ? 'text-[#1C1C1C] font-medium' : 'text-[#505050] hover:text-[#1C1C1C]'}`}
                        >
                            {cat}
                        </span>
                    ))}
                    <span className="text-[#0D6EFD] hover:text-blue-700 cursor-pointer text-[16px] mt-1">See all</span>
                </div>
            </FilterSection>

            {availableBrands.length > 0 && (
                <FilterSection title="Brands" defaultOpen={true}>
                    <div className="flex flex-col space-y-3">
                        {availableBrands.map((brand) => (
                            <Checkbox
                                key={brand}
                                label={brand}
                                checked={selectedBrands.includes(brand)}
                                onChange={() => toggleArrayItem(selectedBrands, setSelectedBrands, brand)}
                            />
                        ))}
                    </div>
                </FilterSection>
            )}

            {availableFeatures.length > 0 && (
                <FilterSection title="Features" defaultOpen={true}>
                    <div className="flex flex-col space-y-3">
                        {availableFeatures.map((feature) => (
                            <Checkbox
                                key={feature}
                                label={feature}
                                checked={selectedFeatures.includes(feature)}
                                onChange={() => toggleArrayItem(selectedFeatures, setSelectedFeatures, feature)}
                            />
                        ))}
                    </div>
                </FilterSection>
            )}

            <FilterSection title="Price range" defaultOpen={true}>
                <div className="flex flex-col">
                    <div className="py-4 relative">
                        <div className="h-1 w-full bg-[#E3E8EE] rounded-full"></div>
                        <div className="absolute top-4 left-[20%] right-[30%] h-1 bg-[#0D6EFD] rounded-full"></div>
                        <div className="absolute top-[10px] left-[20%] w-5 h-5 bg-white border-2 border-[#0D6EFD] rounded-full shadow cursor-pointer -ml-2.5"></div>
                        <div className="absolute top-[10px] right-[30%] w-5 h-5 bg-white border-2 border-[#0D6EFD] rounded-full shadow cursor-pointer -mr-2.5"></div>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                        <div className="flex flex-col w-[45%]">
                            <label className="text-[#1C1C1C] text-[16px] mb-1">Min</label>
                            <input
                                type="number"
                                placeholder="0"
                                value={priceInput.min}
                                onChange={(e) => setPriceInput({ ...priceInput, min: e.target.value })}
                                className="w-full border border-[#DEE2E7] rounded-[6px] px-3 py-2 text-[#1C1C1C] outline-none focus:border-[#0D6EFD]"
                            />
                        </div>
                        <div className="flex flex-col w-[45%]">
                            <label className="text-[#1C1C1C] text-[16px] mb-1">Max</label>
                            <input
                                type="number"
                                placeholder="999999"
                                value={priceInput.max}
                                onChange={(e) => setPriceInput({ ...priceInput, max: e.target.value })}
                                className="w-full border border-[#DEE2E7] rounded-[6px] px-3 py-2 text-[#1C1C1C] outline-none focus:border-[#0D6EFD]"
                            />
                        </div>
                    </div>
                    <button
                        onClick={() => setAppliedPrice(priceInput)}
                        className="w-full mt-4 bg-white border border-[#DEE2E7] text-[#0D6EFD] font-medium py-2 rounded-[6px] hover:bg-gray-50 transition-colors shadow-sm"
                    >
                        Apply
                    </button>
                </div>
            </FilterSection>

            {availableConditions.length > 0 && (
                <FilterSection title="Condition" defaultOpen={true}>
                    <div className="flex flex-col space-y-3">
                        <label className="flex items-center cursor-pointer text-[#505050] text-[16px]">
                            <input
                                type="radio"
                                name="condition"
                                className="form-radio h-5 w-5 text-[#0D6EFD] border-[#DEE2E7] mr-3 cursor-pointer focus:ring-0"
                                checked={selectedCondition === 'Any'}
                                onChange={() => setSelectedCondition('Any')}
                            />
                            Any
                        </label>
                        {availableConditions.map((condition) => (
                            <label key={condition} className="flex items-center cursor-pointer text-[#505050] text-[16px]">
                                <input
                                    type="radio"
                                    name="condition"
                                    className="form-radio h-5 w-5 text-[#0D6EFD] border-[#DEE2E7] mr-3 cursor-pointer focus:ring-0"
                                    checked={selectedCondition === condition}
                                    onChange={() => setSelectedCondition(condition)}
                                />
                                {condition}
                            </label>
                        ))}
                    </div>
                </FilterSection>
            )}

            <FilterSection title="Ratings" defaultOpen={true}>
                <div className="flex flex-col space-y-3">
                    {[5, 4, 3, 2].map(stars => (
                        <Checkbox key={stars} label={
                            <div className="flex items-center space-x-1">
                                {[1, 2, 3, 4, 5].map(i => (
                                    <span key={i} className={`${i <= stars ? 'material-icons' : 'material-icons-outlined'} text-[#FF9017] text-[18px]`}>
                                        {i <= stars ? 'star' : 'star_border'}
                                    </span>
                                ))}
                            </div>
                        } />
                    ))}
                </div>
            </FilterSection>

        </div>
    );
};

const FilterSection = ({ title, children, defaultOpen }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <div className="border-t border-[#DEE2E7] py-4 pr-4">
            <button
                className="flex items-center justify-between w-full text-left outline-none mb-3"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="font-semibold text-[#1C1C1C] text-[16px]">{title}</span>
                <span className="material-icons-outlined text-[#8B96A5]">
                    {isOpen ? 'expand_less' : 'expand_more'}
                </span>
            </button>
            {isOpen && (
                <div className="mt-1">
                    {children}
                </div>
            )}
        </div>
    );
};

const Checkbox = ({ label, checked, onChange }) => (
    <label className="flex items-center cursor-pointer text-[#505050] text-[16px]">
        <input
            type="checkbox"
            className="form-checkbox h-5 w-5 text-[#0D6EFD] rounded-[4px] border-[#DEE2E7] mr-3 cursor-pointer focus:ring-0"
            checked={checked}
            onChange={onChange}
        />
        {label}
    </label>
);

export default SidebarFilters;
