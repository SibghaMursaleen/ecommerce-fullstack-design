import React from 'react';

import logo from '../assets/logo-colored.png';
import appStoreBadge from '../assets/misc/Group.png';
import googlePlayBadge from '../assets/misc/market-button.png';
import flagUS from '../assets/flags/US@2x.png';

const Footer = () => {
    return (
        <footer className="bg-white w-full border-t border-[#DEE2E7] pt-12">
            <div className="container mx-auto px-4 pb-14">
                <div className="flex flex-col lg:flex-row justify-between w-full gap-8">
                    {/* Brand Info & Socials */}
                    <div className="lg:w-[280px]">
                        <div className="mb-[14px]">
                            <img src={logo} alt="Brand Logo" className="h-[46px] w-[150px] object-contain -ml-2" />
                        </div>
                        <p className="text-[#505050] text-[16px] leading-[24px] mb-[18px] tracking-tight pr-4">
                            Best information about the company gies here but now lorem ipsum is
                        </p>
                        <div className="flex space-x-[12px]">
                            <SocialIcon type="facebook" />
                            <SocialIcon type="twitter" />
                            <SocialIcon type="linkedin" />
                            <SocialIcon type="instagram" />
                            <SocialIcon type="youtube" />
                        </div>
                    </div>

                    {/* Links Columns */}
                    <div className="flex-1 flex flex-wrap justify-between lg:px-12 gap-6 w-full max-w-[700px]">
                        <FooterLinkColumn
                            title="About"
                            links={["About Us", "Find store", "Categories", "Blogs"]}
                        />
                        <FooterLinkColumn
                            title="Information"
                            links={["Help Center", "Money Refund", "Shipping", "Contact us"]}
                        />
                        <FooterLinkColumn
                            title="For users"
                            links={["Login", "Register", "Settings", "My Orders"]}
                        />
                    </div>

                    {/* App Badges */}
                    <div className="lg:w-[130px]">
                        <h4 className="font-semibold text-[#1C1C1C] text-[16px] mb-4">Get app</h4>
                        <div className="flex flex-col items-start space-y-[10px]">
                            <img src={appStoreBadge} alt="Download on the App Store" className="h-[42px] w-auto object-contain cursor-pointer" />
                            <img src={googlePlayBadge} alt="Get it on Google Play" className="h-[42px] w-auto object-contain cursor-pointer" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="bg-[#EFF2F4] border-t border-[#DEE2E7] py-6">
                <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
                    <p className="text-[#606060] text-[16px] mb-4 md:mb-0">© 2026 Ecommerce.</p>
                    <div className="flex items-center space-x-2 text-[#1C1C1C]">
                        <img src={flagUS} alt="US Flag" className="w-[24px] h-[17px] rounded-sm object-cover" />
                        <span className="text-[16px] font-medium">English</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

const FooterLinkColumn = ({ title, links }) => (
    <div>
        <h4 className="font-medium text-[#1C1C1C] text-[16px] mb-3">{title}</h4>
        <ul className="space-y-[10px]">
            {links.map((text, idx) => (
                <li key={idx}>
                    <a href="#" className="text-[#8B96A5] hover:text-[#1C1C1C] transition-colors text-[16px] tracking-tight">
                        {text}
                    </a>
                </li>
            ))}
        </ul>
    </div>
);

// Helper for the gray circular social icons using actual brand SVGs
const SocialIcon = ({ type }) => {
    let svgPath = "";
    switch (type) {
        case "facebook":
            svgPath = "M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z";
            break;
        case "twitter":
            // simplified robust twitter bird path
            svgPath = "M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z";
            break;
        case "linkedin":
            svgPath = "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zM3.562 20.452H7.11V9H3.562v11.452z";
            break;
        case "instagram":
            svgPath = "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z";
            break;
        case "youtube":
            svgPath = "M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.377.55a3.016 3.016 0 00-2.122 2.136C0 8.087 0 12 0 12s0 3.913.501 5.814a3.016 3.016 0 002.122 2.136c1.871.55 9.377.55 9.377.55s7.505 0 9.377-.55a3.016 3.016 0 002.122-2.136C24 15.913 24 12 24 12s0-3.913-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z";
            break;
    }

    return (
        <div className="w-[32px] h-[32px] bg-[#BDC4CD] rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-400 transition-colors">
            <svg width="16" height="16" fill="white" viewBox="0 0 24 24">
                <path d={svgPath} />
            </svg>
        </div>
    );
};

export default Footer;
