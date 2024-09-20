import { icons } from 'lucide-react-native';
import React from 'react';
import { ViewStyle } from 'react-native';

interface IconProps {
  name: keyof typeof icons; 
  color?: string;           
  size?: number;            
  style?: ViewStyle;        
}

const Icon: React.FC<IconProps> = ({ name, color = 'black', size = 24 }) => {
  const LucideIcon = icons[name]; 

  if (!LucideIcon) {
    console.error(`Icon ${name} does not exist in lucide-react-native`);
    return null;
  }

  return <LucideIcon color={color} size={size} />;
};

export default Icon;
