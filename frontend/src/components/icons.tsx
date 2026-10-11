import React from "react";

interface IconProps extends React.ComponentPropsWithoutRef<'svg'> {
  size?: number;
}

export const ClosedEye: React.FC<IconProps> = ({ size = 24, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 55 24" fill="none" {...props}>
    
    <path d="M29.0002 13.5002V21.5002M8.50024 7.00018L3.00024 15.5002M46.5002 7.00018L53.0002 15.5002M2.00024 2.00018C23.5335 16.463 34.7798 16.1467 53.5002 2.00018" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
    
  </svg>
);

export const OpenEye: React.FC<IconProps> = ({ size = 24, ...props }) => (
    <svg width={size} height={size} viewBox="0 0 81 90" fill="none" {...props}>
    
      <path d="M42.9551 13.375V2M12.9213 26.375L2 16.625M72.9888 26.375L83 16.625M2.91011 41C2.91011 41 17.4719 15 42.9551 15C68.4382 15 83 41 83 41C83 41 68.4382 67 42.9551 67C17.4719 67 2.91011 41 2.91011 41ZM53.8764 41C53.8764 46.3848 48.9868 50.75 42.9551 50.75C36.9234 50.75 32.0337 46.3848 32.0337 41C32.0337 35.6152 36.9234 31.25 42.9551 31.25C48.9868 31.25 53.8764 35.6152 53.8764 41Z" stroke="black" stroke-width="8" stroke-linecap="round"/>

    </svg>
);

export const PlayIcon: React.FC<IconProps> = ({ size = 24, ...props }) => (
    <svg width={size} height={size} viewBox="0 0 55 24" fill="none" {...props}>
    

      <path d="M2 2L30 20L2 38V2Z" stroke="currentColor" stroke-width="4" strokeLinecap="round" strokeLinejoin="round"/>


    </svg>
);

export const PauseIcon: React.FC<IconProps> = ({ size = 24, ...props }) => (
    <svg width={size} height={size} viewBox="0 0 55 24" fill="none" {...props}>
    
      <path d="M12 24.5V0H18V24.5H12ZM0 24.5V0H6V24.5H0Z" fill="currentColor"/>



    </svg>
);


