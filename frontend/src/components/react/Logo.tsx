import React from 'react';
import logoSrc from '../../assets/images/devdom-logo.png?url';

interface LogoProps {
  alt: string;
  width?: number;
  height?: number;
}

const Logo: React.FC<LogoProps> = ({ alt, width = 200, height = 50 }) => {
  return (
    <div
      style={{
        backgroundImage: `url(${logoSrc})`,
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        width: `${width}px`,
        height: `${height}px`,
        maxWidth: '8rem', // max-w-32
        display: 'block',
      }}
      role="img"
      aria-label={alt}
    />
  );
};

export default Logo;
