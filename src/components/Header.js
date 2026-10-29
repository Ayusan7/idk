
import CartButton from './CartButton';
import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  Animated,
  Easing,
} from 'react-native';
import AppIcon from './AppIcon';
import logo from '../assets/logo.png';

const searchList = [
  'Medicine',
  'Baby Care',
  'Anti Infectives',
  'Infection',
  'Women Care',
  'Respiratory',
  'Pain Analgesics',
];

export default function Header() {
  const [index, setIndex] = useState(0);
  const navigation = useNavigation();

  const rotateX = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const interval = setInterval(() => {
      // Flip the current word out
      Animated.parallel([
        Animated.timing(rotateX, {
          toValue: 90,
          duration: 200,
          easing: Easing.in(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start(({ finished }) => {
        if (!finished) return;

        // Select the next word
        setIndex((prevIndex) => (prevIndex + 1) % searchList.length);

        // Start the next word below the visible position
        rotateX.setValue(-90);

        // Flip the next word into view
        Animated.parallel([
          Animated.timing(rotateX, {
            toValue: 0,
            duration: 200,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
          }),
        ]).start();
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [rotateX, opacity]);

  const animatedRotation = rotateX.interpolate({
    inputRange: [-90, 0, 90],
    outputRange: ['-90deg', '0deg', '90deg'],
  });

  return (
    <View style={styles.headContainer}>
      <View style={styles.header}>
        <Image source={logo} style={styles.logo} resizeMode="contain" />
        <View style={styles.cart}>
          <CartButton />
        </View>
      </View>

      <View style={styles.searchButton}>
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate('Search')}
        >
          <View style={styles.searchTextContainer}>
            <Text style={styles.bt} numberOfLines={1}>
              Search medicines for{' '}
              <Animated.Text
                style={[
                  styles.animatedWord,
                  {
                    opacity,
                    transform: [
                      { perspective: 500 },
                      { rotateX: animatedRotation },
                    ],
                  },
                ]}
              >
                {searchList[index]}
              </Animated.Text>
            </Text>
          </View>

          <AppIcon
            name="search"
            size={28}
            color="#333333"
          />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headContainer: {
    backgroundColor: '#fabcbc',
    height: 170,
  },
  header: {
    paddingTop: 25,
    paddingBottom: 40,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 5,
  },
  bt: {
    padding: 5,
    color: '#aaaaaa',
  },
  searchTextContainer: {
    flex: 1,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  animatedWord: {
    color: '#aaaaaa',
  },
  button: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    margin: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    width: 100,
    height: 70,
    margin: 10,
  },
  cart: {
    marginTop: 20,
    marginRight: 10,
  },
  searchButton: {
    backgroundColor: '#fabcbc',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  }
});
