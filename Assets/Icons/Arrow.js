
import React from 'react';
import { Svg, Path,ClipPath,Defs,G,Rect } from 'react-native-svg'
export default function ArrowIcon({ focused }) {
    return (
        <Svg width="9" height="15" viewBox="0 0 9 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <G clip-path="url(#clip0_160_3293)">
                <Path d="M7.5 13.4141L1.5 7.41406L7.5 1.41406" stroke="#475AD7" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </G>
            <Defs>
                <ClipPath id="clip0_160_3293">
                    <Rect width="8.414" height="14.828" fill="#475AD7" transform="translate(0.5)" />
                </ClipPath>
            </Defs>
        </Svg>
    )
};