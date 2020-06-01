import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Animated,
  FlatList,
} from 'react-native';
import Store from './components/Store';
import { MapsComponent } from './components/MapsComponent';
import { CARD_WIDTH } from './components/Store';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const Locations = [
  {
    "name" : "Bakery Bread Man",
    "image" : "https://cdn.pixabay.com/photo/2016/11/30/14/08/cafe-1872888_960_720.jpg",
    "lat" : 4.696005,
    "lon" : -74.040355
  },
  {
    "name" : "House Coffee",
    "image" : "https://cdn.pixabay.com/photo/2015/05/15/14/55/cafe-768771_960_720.jpg",
    "lat" : 4.697481,
    "lon" : -74.034980
  },
  {
    "name" : "Deluxe Restaurant",
    "image" : "https://cdn.pixabay.com/photo/2015/04/20/13/30/kitchen-731351_960_720.jpg",
    "lat" : 4.690990,
    "lon" : -74.041589
  },
  {
    "name" : "Breakfast House",
    "image" : "https://cdn.pixabay.com/photo/2015/03/26/09/42/breakfast-690128_960_720.jpg",
    "lat" : 4.698775,
    "lon" : -74.040205
  },
  {
    "name" : "Bread Man Bakery",
    "image" : "https://cdn.pixabay.com/photo/2016/11/30/14/08/cafe-1872888_960_720.jpg",
    "lat" : 4.694487,
    "lon" : -74.042319
  },
  {
    "name" : "Dream Coffee",
    "image" : "https://cdn.pixabay.com/photo/2015/05/15/14/55/cafe-768771_960_720.jpg",
    "lat" : 4.697973, 
    "lon" : -74.041235
  },
  {
    "name" : "Home Restaurent",
    "image" : "https://cdn.pixabay.com/photo/2015/04/20/13/30/kitchen-731351_960_720.jpg",
    "lat" : 4.693739,
    "lon" : -74.038006
  },
  {
    "name" : "House Breakfast",
    "image" : "https://cdn.pixabay.com/photo/2015/03/26/09/42/breakfast-690128_960_720.jpg",
    "lat" : 4.698775,
    "lon" : -74.040205
  }
];

const App = () => {
  const [ longitude, setLongitude ] = useState(0);
  const [ latitude, setLatitude ] = useState(0);
  const [ offsetStart, setOffsetStart ] = useState(0);
  const [ index, setIndex ] = useState(0)
  const x = new Animated.Value(0);

  const updatePosition = (index) => {
    setLatitude(Locations[index].lat);
    setLongitude(Locations[index].lon);
  }

  useEffect(() => {
    updatePosition(0)
  }, [])
  
  const updateState = (event) => {
    let position = event.nativeEvent.contentOffset.x;
    let i = Math.floor((position - offsetStart) / CARD_WIDTH)
    if(index !== i){
      updatePosition(i);
      setIndex(i);
    }
  }

  const onScroll = Animated.event(
    [{ nativeEvent: { 
      contentOffset: { x } 
    }}], { 
      listener: (event) => updateState(event), 
      useNativeDriver: true , 
    }
  );

  const _updateRangePositions = (offsetStart) => {
    setOffsetStart(offsetStart)
  }

  return (
      <View style={{flex:1}}>
        <MapsComponent 
        latitude={ latitude } 
        longitude={ longitude } 
        />   
        <View style={styles.listStores}>
          <AnimatedFlatList
            onScroll={ onScroll }
            scrollEventThrottle={16}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={ Locations }
            renderItem={({ index, item}) => (
              <Store 
              index={index} 
              item={item} 
              x={x} 
              updateRangePositions={_updateRangePositions} />
            )}
            keyExtractor={(item) => item.index }
          /> 
        </View>
      </View>
  );
};

const styles = StyleSheet.create({
  listStores:{    
    marginBottom:15,
    width: '100%', 
    position: 'absolute',
    bottom: 0
  }
});

export default App;
