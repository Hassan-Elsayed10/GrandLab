import React from "react";
import { Image, TouchableOpacity } from 'react-native'


export default function Home({ item }) {
    return (
        <TouchableOpacity style={{}}>
            <Image
                source={item}
                style={{ height: 140, width: 120, borderRadius: 20, margin: 5 }}
            />
        </TouchableOpacity>
    )
}