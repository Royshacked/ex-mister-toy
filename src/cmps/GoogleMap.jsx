import React, { useState } from "react";
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div style={{ fontSize: 25 }}>{text}</div>;

export function GoogleMap({ shopBranches, chosenBranch }) {
    const centerCoords = chosenBranch.coords
    const zoom = 8

    return (
        <div style={{ height: '75vh', width: '100%' }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: "AIzaSyB9EWH8ukD0r6idZ7ZzYNcgY9uax5PcmaM" }}
                center={centerCoords}
                defaultZoom={zoom}
            >
                {shopBranches.map(branch =>
                    <AnyReactComponent
                        key={branch.name}
                        {...branch.coords}
                        text="🚩"
                    />
                )}
            </GoogleMapReact>
        </div >
    )
}

