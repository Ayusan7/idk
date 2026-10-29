
import React from 'react';
import { Image } from 'react-native';
import { icons } from '../assets/icons';

export default function AppIcon({
  name,
  size = 24,
  color = '#000000',
}) {
  const Icon = icons[name];

  if (!Icon) {
    console.warn(`Icon not found: ${name}`);
    return null;
  }

  // SVG imports are React components.
  if (typeof Icon === 'function' ||
      (typeof Icon === 'object' && Icon !== null)) {
    return (
      <Icon
        width={size}
        height={size}
        color={color}
      />
    );
  }

  // PNG/JPG imports are image sources.
  return (
    <Image
      source={Icon}
      style={{ width: size, height: size }}
      resizeMode="contain"
    />
  );
}
