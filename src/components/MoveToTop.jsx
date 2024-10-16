'use client'

import React, { useState, useEffect } from 'react';

const MoveToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        if (window.pageYOffset > 500) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    return (
        <div className="fixed bottom-4 right-4">
            {isVisible && 
                <button 
                    onClick={scrollToTop} 
                    className="bg-black text-white py-2 px-3 text-xl rounded-full shadow-lg hover:bg-[#292b2a] transition duration-300"
                >
                    ↑
                </button>
            }
        </div>
    );
};

export default MoveToTop;