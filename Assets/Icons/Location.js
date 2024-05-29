import React from 'react';
import { Svg, Path, Circle, Line } from 'react-native-svg';

export default function LocationIcon() {
    const cls1Style = {
        fill: 'none',
        stroke: '#475AD7',
        strokeWidth: 6,
        strokeMiterlimit: 10,
    };

    const cls2Style = {
        fill: '#475AD7',
    };

    const cls3Style = {
        fill: '#475AD7',
    };

    return (
        <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 212.16 244.16">
            <Circle cx="114.82" cy="74.49" r="42.04" style={cls1Style} />
            {/* Add more elements with appropriate styles */}
            <Path
                d="M134.06,66.51h-9.82a1.43,1.43,0,0,1-1.43-1.43V55.25a1.43,1.43,0,0,0-1.43-1.43H108.26a1.43,1.43,0,0,0-1.43,1.43v9.82a1.43,1.43,0,0,1-1.43,1.43H95.58a1.43,1.43,0,0,0-1.43,1.43V81a1.43,1.43,0,0,0,1.43,1.43h9.82a1.43,1.43,0,0,1,1.43,1.43v9.82a1.43,1.43,0,0,0,1.43,1.43h13.11a1.43,1.43,0,0,0,1.43-1.43V83.91a1.43,1.43,0,0,1,1.43-1.43h9.82A1.43,1.43,0,0,0,135.49,81V67.94A1.43,1.43,0,0,0,134.06,66.51Z"
                style={cls1Style}
            />
            <Path
                d="M184.9,73.08A70.08,70.08,0,1,0,61,118c20.2,24.16,37.73,50.44,53.47,77.71h0a.36.36,0,0,0,.63,0l2.27-3.93c15.23-26.37,33-51.12,52.09-74.86A69.77,69.77,0,0,0,184.9,73.08Z"
                style={cls1Style}
            />
            {/* Add more elements with appropriate styles */}
            <Circle cx="114.82" cy="218.29" r="3.29" style={cls3Style} />
            <Line x1="103.4" y1="114.33" x2="103.4" y2="143.96" style={cls1Style} />
            <Line x1="103.4" y1="148.29" x2="103.4" y2="152.96" style={cls1Style} />
            <Line x1="67.32" y1="208.13" x2="162.32" y2="208.13" style={cls1Style} />
        </Svg>
    );
}
