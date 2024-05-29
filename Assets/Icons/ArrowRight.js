import React from 'react';
import { Svg, Path, ClipPath, Defs, G, Rect } from 'react-native-svg';

export default function ArrowRIcon({ focused }) {
  return (
    <Svg width="9" height="15" viewBox="0 0 9 15" fill="none" xmlns="http://www.w3.org/2000/svg">
      <G clip-path="url(#clip0_160_3293)">
        <Path d="M1.5 1.58579L7.5 7.58579L1.5 13.5858" stroke="#475AD7" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </G>
      <Defs>
        <ClipPath id="clip0_160_3293">
          <Rect width="8.41421" height="14.8284" fill="#475AD7" transform="translate(0.707107 0.707107) rotate(45)" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}
