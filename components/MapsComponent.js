import React from 'react';
import MapView from 'react-native-maps'
import { StyleSheet } from 'react-native'

export const MapsComponent = ({latitude, longitude }) => {
    const region = {
      latitude,
      longitude,
      latitudeDelta: 0.0009,
      longitudeDelta: 0.0009
    }

    return (
        <MapView
          style = {{...StyleSheet.absoluteFillObject}}
          region={region}
        >
          <MapView.Marker
            coordinate={region} />
        </MapView>    
    );
};  