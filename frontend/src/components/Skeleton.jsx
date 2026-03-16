import React from 'react';

const Skeleton = ({ width = '100%', height = '20px', borderRadius = '4px', className = '' }) => {
    return (
        <div
            className={`shimmer ${className}`}
            style={{
                width,
                height,
                borderRadius
            }}
        />
    );
};

export default Skeleton;
