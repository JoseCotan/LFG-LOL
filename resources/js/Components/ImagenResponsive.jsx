import React from 'react';

const ResponsiveImage = ({ srcPC, srcTablet, srcMobile, alt, className }) => {
    const PC = srcPC || 'images/user-regular.svg';
    const Tablet = srcTablet || 'images/user-regular.svg';
    const Mobile = srcMobile || 'images/user-regular.svg';

    return (
        <picture>
            <source srcSet={`/${PC}`} media="(min-width: 1200px)" />
            <source srcSet={`/${Tablet}`} media="(min-width: 768px)" />
            <source srcSet={`/${Mobile}`} media="(max-width: 768px)" />
            <img src={`/${PC}`} alt={alt} className={className} />
        </picture>
    );
};

export default ResponsiveImage;
