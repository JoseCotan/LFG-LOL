import React from 'react';

const ResponsiveImage = ({ srcPC, srcTablet, srcMobile, alt, className }) => {
    return (
        <picture>
            <source srcSet={srcPC} media="(min-width: 1200px)" />
            <source srcSet={srcTablet} media="(min-width: 768px)" />
            <source srcSet={srcMobile} media="(max-width: 768px)" />
            <img src={srcPC} alt={alt} className={className} />
        </picture>
    );
};

export default ResponsiveImage;
