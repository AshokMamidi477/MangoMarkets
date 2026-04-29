import React, {useEffect, useRef} from 'react';
import {View, Text, StyleSheet, Animated, Dimensions, StatusBar} from 'react-native';
import {Colors} from '../theme';

const {height} = Dimensions.get('window');

interface SplashScreenProps {
  onFinish: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({onFinish}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;
  const textFade = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(fadeAnim, {toValue: 1, duration: 800, useNativeDriver: true}),
        Animated.spring(scaleAnim, {toValue: 1, friction: 8, tension: 40, useNativeDriver: true}),
      ]),
      Animated.timing(textFade, {toValue: 1, duration: 600, useNativeDriver: true}),
      Animated.timing(progressAnim, {toValue: 1, duration: 1200, useNativeDriver: false}),
    ]).start(() => setTimeout(onFinish, 400));
  }, []);

  const progressWidth = progressAnim.interpolate({inputRange: [0, 1], outputRange: [0, 180]});

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#030308" />
      <View style={styles.glowOuter} />
      <View style={styles.content}>
        <Animated.View style={[styles.iconBox, {opacity: fadeAnim, transform: [{scale: scaleAnim}]}]}>
          <View style={styles.iconGlass}>
            <Text style={styles.iconText}>🥭</Text>
          </View>
        </Animated.View>
        <Animated.Text style={[styles.title, {opacity: textFade}]}>MANGO MARKETS</Animated.Text>
        <Animated.Text style={[styles.subtitle, {opacity: textFade}]}>
          • INSTITUTIONAL INTELLIGENCE •
        </Animated.Text>
        <Animated.View style={[styles.progressWrap, {opacity: textFade}]}>
          <View style={styles.progressTrack}>
            <Animated.View style={[styles.progressBar, {width: progressWidth}]} />
          </View>
        </Animated.View>
        <Animated.View style={[styles.statusRow, {opacity: textFade}]}>
          <View style={styles.statusBadge}>
            <Text style={styles.statusGreen}>ENCRYPTED</Text>
          </View>
          <Text style={styles.statusText}>1.2 MS</Text>
          <Text style={styles.statusText}>MAINNET_V4</Text>
        </Animated.View>
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerText}>◎ VERIFIED CLUSTER</Text>
        <Text style={styles.footerText}>© 2024 MANGO PROTOCOL</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#030308', justifyContent: 'center', alignItems: 'center'},
  glowOuter: {
    position: 'absolute', width: 250, height: 250, borderRadius: 125,
    backgroundColor: 'rgba(168, 85, 247, 0.04)', top: height * 0.32, alignSelf: 'center',
  },
  content: {alignItems: 'center'},
  iconBox: {marginBottom: 28},
  iconGlass: {
    width: 72, height: 72, borderRadius: 18,
    backgroundColor: 'rgba(168, 85, 247, 0.08)', borderWidth: 1,
    borderColor: 'rgba(168, 85, 247, 0.2)', justifyContent: 'center', alignItems: 'center',
  },
  iconText: {fontSize: 36},
  title: {fontSize: 26, fontWeight: '300', letterSpacing: 8, color: Colors.textPrimary, marginBottom: 8},
  subtitle: {fontSize: 10, letterSpacing: 3, color: 'rgba(168, 85, 247, 0.6)', marginBottom: 36},
  progressWrap: {marginBottom: 16},
  progressTrack: {
    width: 180, height: 2, backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: 1, overflow: 'hidden',
  },
  progressBar: {height: 2, backgroundColor: Colors.accentPurple, borderRadius: 1},
  statusRow: {flexDirection: 'row', alignItems: 'center', gap: 16},
  statusBadge: {
    paddingHorizontal: 8, paddingVertical: 2, borderRadius: 3,
    backgroundColor: 'rgba(34, 197, 94, 0.12)',
  },
  statusGreen: {fontSize: 9, letterSpacing: 1, color: Colors.green, fontWeight: '600'},
  statusText: {fontSize: 9, letterSpacing: 1, color: 'rgba(255,255,255,0.25)', fontWeight: '500'},
  footer: {
    position: 'absolute', bottom: 30, left: 20, right: 20,
    flexDirection: 'row', justifyContent: 'space-between',
  },
  footerText: {fontSize: 8, letterSpacing: 0.5, color: 'rgba(255,255,255,0.15)'},
});

export default SplashScreen;
