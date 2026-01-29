import React, { useState, useEffect } from 'react';
import logoSrcLight from '../../assets/images/devdom-logo.svg?url';
import logoSrcDark from '../../assets/images/devdom-logo-dark.svg?url';

interface LogoProps {
  alt: string;
  width?: number;
  height?: number;
}

const Logo: React.FC<LogoProps> = ({ alt, width = 200, height = 50 }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const updateTheme = () => {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      setTheme(isDark ? 'dark' : 'light');
    };

    updateTheme();

    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    return () => observer.disconnect();
  }, []);

  const logoSrc = theme === 'dark' ? logoSrcDark : logoSrcLight;

  return (
    <div
      style={{
        backgroundImage: `url(${logoSrc})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        width: `${width}px`,
        height: `${height}px`,
        maxWidth: '8rem', // max-w-32
      }}
      role="img"
      aria-label={alt}
    />
  );
};

export default Logo;