import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  FlatList,
  Image,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import Header from '../components/Header';
import CategoryList from '../components/HomeMedicineCard';
import MedicineDeals from '../components/MedicineDeal';

const OFFERS_URL = 'https://api.jeplus.tech/api/v1/jeplus/offers/get-all-offers';

export default function HomeScreen({navigation}) {
  const [banners, setBanners] = useState([]);
  const [bannerError, setBannerError] = useState(null);
  const [bannerWidth, setBannerWidth] = useState(0);
  const bannerListRef = useRef(null);
  const bannerIndexRef = useRef(0);
  const handleAddToCart = medicine => {
    // Connect this to your existing CartContext or add-to-cart function.
    console.log('Add medicine to cart:', medicine);
  };

  useEffect(() => {
    const controller = new AbortController();

    async function loadBanners() {
      try {
        const response = await fetch(OFFERS_URL, {
          signal: controller.signal,
        });
        if (!response.ok) {
          throw new Error(`Offers request failed (${response.status}).`);
        }
        console.log('data fetch successfully');
        const result = await response.json();
        if (!result.success || !Array.isArray(result.data)) {
          throw new Error(result.message || 'The offers response was invalid.');
        }

        setBanners(
          result.data.filter(offer => typeof offer.webBanner === 'string' && offer.webBanner)
        );
        setBannerError(null);
      } catch (error) {
        if (error.name !== 'AbortError') {
          setBannerError(error.message || 'Unable to load offer banners.');
        }
      }
    }

    loadBanners();
    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (banners.length < 2 || !bannerWidth) {
      return undefined;
    }

    const intervalId = setInterval(() => {
      const nextIndex = bannerIndexRef.current + 1;
      bannerIndexRef.current = nextIndex;
      bannerListRef.current?.scrollToIndex({
        index: nextIndex,
        animated: true,
      });
    }, 3500);

    return () => clearInterval(intervalId);
  }, [banners, bannerWidth]);

  const loopBanners = banners.length > 1 ? [...banners, banners[0]] : banners;

  return (
    <View style={styles.homeTag}>
       <Header />
     <ScrollView >  
      <View style={styles.statGif}> 
       <View
        style={styles.statGifInside}
        onLayout={event => setBannerWidth(event.nativeEvent.layout.width)}
      >
        {loopBanners.length > 0 ? (
          <FlatList
            ref={bannerListRef}
            data={loopBanners}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => `${item.id}-${index}`}
            getItemLayout={(_, index) => ({
              length: bannerWidth,
              offset: bannerWidth * index,
              index,
            })}
            onMomentumScrollEnd={event => {
              const index = Math.round(
                event.nativeEvent.contentOffset.x / bannerWidth
              );
              if (index === banners.length && banners.length > 1) {
                bannerIndexRef.current = 0;
                bannerListRef.current?.scrollToIndex({
                  index: 0,
                  animated: false,
                });
              } else {
                bannerIndexRef.current = index;
              }
            }}
            renderItem={({ item }) => (
              <Image
                source={{ uri: item.webBanner }}
                style={[styles.bannerImage, { width: bannerWidth }]}
                resizeMode="cover"
                accessibilityLabel={item.offerName || 'Offer banner'}
              />
            )}
          />
        ) : bannerError ? (
          <Text style={styles.bannerMessage}>{bannerError}</Text>
        ) : (
          <ActivityIndicator color="#FFFFFF" />
        )}
      </View>
      </View>
      <Text style={styles.title}>Shop by Category</Text>
       <CategoryList/> 
      <Text style={styles.title}>Most Selling Products</Text>
        <MedicineDeals
          onAddToCart={handleAddToCart}
          onSeeAll={() => {
            // Replace with your actual screen name.
            navigation.navigate('AllMedicines');
          }}
        />
      <Text style={styles.title}>Recently Added Products</Text>
      <MedicineDeals
          onAddToCart={handleAddToCart}
          onSeeAll={() => {
            // Replace with your actual screen name.
            navigation.navigate('AllMedicines');
          }}
        />
    </ScrollView> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  hero: {
    backgroundColor: '#2563EB',
    padding: 23,
    borderRadius: 22,
    marginBottom: 18,
  },
  heroTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '800',
  },
  heroText: {
    color: '#DBEAFE',
    fontSize: 14,
    lineHeight: 21,
    marginTop: 9,
  },
  buttonText: {
    color: '#2563EB',
    fontWeight: '700',
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 25,
  },
  statGif: {
    flex: 1,
    height: 135,
    backgroundColor: '#fabcbc',
    borderBottomLeftRadius:20,
    borderBottomRightRadius:20,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
  },
   statGifInside:{
    width: '100%',
    maxWidth: 400,
    height: 110,
    backgroundColor: '#ffffff',
    borderRadius: 15,
    overflow: 'hidden',
  },
  bannerImage: {
    height: '100%',
  },
  bannerMessage: {
    color: '#FFFFFF',
    textAlign: 'center',
    padding: 12,
  },
  sectionTitle: {
    fontSize: 19,
    fontWeight: '800',
    color: '#172033',
    marginBottom: 15,
  },
  disclaimer: {
    color: '#64748B',
    fontSize: 12,
    lineHeight: 18,
    paddingVertical: 18,
  },
  homeTag:{
    backgroundColor: '#ffffff',
  },
  title:{
    fontSize: 23,
    fontWeight: 'bold',
    padding: 5,
    margin: 5,
  },
});