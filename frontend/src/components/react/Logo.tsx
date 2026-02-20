import React, { useEffect, useState } from 'react';
import logoSrc from '../../assets/images/devdom-logo.png?url';
import logoDarkSrc from '../../assets/images/devdom-logo-on-dark-mode.png?url';

interface LogoProps {
  alt: string;
  width?: number;
  height?: number;
}

const Logo: React.FC<LogoProps> = ({ alt, width = 200, height = 50 }) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const syncTheme = () => setIsDark(root.getAttribute('data-theme') === 'dark');

    syncTheme();
    const observer = new MutationObserver(syncTheme);
    observer.observe(root, { attributes: true, attributeFilter: ['data-theme'] });

    return () => observer.disconnect();
  }, []);

  return (
    <div
      style={{
        backgroundImage: `url(${isDark ? logoDarkSrc : logoSrc})`,
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
