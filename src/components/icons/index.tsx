import React from 'react';
import Svg, {Path, Circle, Rect, G, Line} from 'react-native-svg';

interface IconProps {
  size?: number;
  color?: string;
  focused?: boolean;
}

export const HomeIcon: React.FC<IconProps> = ({size = 22, color = '#71717A'}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M3 9.5L12 3L21 9.5V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9.5Z"
      stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"
    />
    <Path d="M9 22V12H15V22" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const AIIcon: React.FC<IconProps> = ({size = 22, color = '#71717A'}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="9" stroke={color} strokeWidth={1.8} />
    <Path d="M12 8V12L15 15" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
    <Circle cx="12" cy="12" r="2" fill={color} />
  </Svg>
);

export const MarketsIcon: React.FC<IconProps> = ({size = 22, color = '#71717A'}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Line x1="12" y1="20" x2="12" y2="10" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
    <Line x1="18" y1="20" x2="18" y2="4" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
    <Line x1="6" y1="20" x2="6" y2="14" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
  </Svg>
);

export const NewsIcon: React.FC<IconProps> = ({size = 22, color = '#71717A'}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Rect x="3" y="3" width="18" height="18" rx="2" stroke={color} strokeWidth={1.8} />
    <Path d="M7 7H17" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
    <Path d="M7 11H17" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
    <Path d="M7 15H13" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
  </Svg>
);

export const PortfolioIcon: React.FC<IconProps> = ({size = 22, color = '#71717A'}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Rect x="3" y="3" width="18" height="18" rx="2" stroke={color} strokeWidth={1.8} />
    <Path d="M3 9H21" stroke={color} strokeWidth={1.8} />
    <Path d="M9 21V9" stroke={color} strokeWidth={1.8} />
  </Svg>
);

export const SearchIcon: React.FC<IconProps> = ({size = 20, color = '#A1A1AA'}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="11" cy="11" r="8" stroke={color} strokeWidth={1.8} />
    <Path d="M21 21L16.65 16.65" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
  </Svg>
);

export const MicIcon: React.FC<IconProps> = ({size = 18, color = '#71717A'}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M12 1C10.9 1 10 1.9 10 3V12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12V3C14 1.9 13.1 1 12 1Z" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M19 10V12C19 15.87 15.87 19 12 19C8.13 19 5 15.87 5 12V10" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M12 19V23" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
  </Svg>
);

export const SendIcon: React.FC<IconProps> = ({size = 18, color = '#FFFFFF'}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M22 2L11 13" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M22 2L15 22L11 13L2 9L22 2Z" fill={color} stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const BoltIcon: React.FC<IconProps> = ({size = 20, color = '#FFFFFF'}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" fill={color} stroke={color} strokeWidth={1} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const MenuIcon: React.FC<IconProps> = ({size = 22, color = '#A1A1AA'}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M3 12H21" stroke={color} strokeWidth={2} strokeLinecap="round" />
    <Path d="M3 6H21" stroke={color} strokeWidth={2} strokeLinecap="round" />
    <Path d="M3 18H21" stroke={color} strokeWidth={2} strokeLinecap="round" />
  </Svg>
);

export const BookmarkIcon: React.FC<IconProps> = ({size = 16, color = '#71717A'}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M19 21L12 16L5 21V5C5 4.46957 5.21071 3.96086 5.58579 3.58579C5.96086 3.21071 6.46957 3 7 3H17C17.5304 3 18.0391 3.21071 18.4142 3.58579C18.7893 3.96086 19 4.46957 19 5V21Z" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const LiveDot: React.FC<IconProps> = ({size = 6, color = '#22C55E'}) => (
  <Svg width={size} height={size} viewBox="0 0 6 6" fill="none">
    <Circle cx="3" cy="3" r="3" fill={color} />
  </Svg>
);

export const NeuralIcon: React.FC<IconProps> = ({size = 22, color = '#A855F7'}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="3" stroke={color} strokeWidth={1.8} />
    <Circle cx="5" cy="8" r="2" stroke={color} strokeWidth={1.2} />
    <Circle cx="19" cy="8" r="2" stroke={color} strokeWidth={1.2} />
    <Circle cx="5" cy="16" r="2" stroke={color} strokeWidth={1.2} />
    <Circle cx="19" cy="16" r="2" stroke={color} strokeWidth={1.2} />
    <Path d="M7 8L9.5 10.5" stroke={color} strokeWidth={1.2} />
    <Path d="M17 8L14.5 10.5" stroke={color} strokeWidth={1.2} />
    <Path d="M7 16L9.5 13.5" stroke={color} strokeWidth={1.2} />
    <Path d="M17 16L14.5 13.5" stroke={color} strokeWidth={1.2} />
  </Svg>
);

export const ChevronDownIcon: React.FC<IconProps> = ({size = 16, color = '#71717A'}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M6 9L12 15L18 9" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const AlertIcon: React.FC<IconProps> = ({size = 16, color = '#F59E0B'}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M10.29 3.86L1.82 18C1.64 18.3 1.55 18.65 1.55 19C1.56 19.35 1.65 19.69 1.82 20C2 20.3 2.25 20.56 2.55 20.73C2.85 20.91 3.19 21 3.54 21H20.46C20.81 21 21.15 20.91 21.45 20.73C21.75 20.56 22 20.3 22.18 20C22.35 19.69 22.44 19.35 22.45 19C22.45 18.65 22.36 18.3 22.18 18L13.71 3.86C13.53 3.56 13.28 3.32 12.98 3.15C12.68 2.98 12.34 2.89 12 2.89C11.66 2.89 11.32 2.98 11.02 3.15C10.72 3.32 10.47 3.56 10.29 3.86Z" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M12 9V13" stroke={color} strokeWidth={2} strokeLinecap="round" />
    <Path d="M12 17H12.01" stroke={color} strokeWidth={2} strokeLinecap="round" />
  </Svg>
);
