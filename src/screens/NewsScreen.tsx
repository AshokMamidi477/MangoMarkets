import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {Colors, Spacing, FontSize, BorderRadius} from '../theme';
import {NeuralIcon, BookmarkIcon, LiveDot, SearchIcon} from '../components/icons';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const {width} = Dimensions.get('window');

const NewsScreen: React.FC = () => {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.bgPrimary} />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[styles.scrollContent, {paddingBottom: 60 + insets.bottom + 20}]}
        showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <NeuralIcon size={22} color={Colors.accentPurple} />
            <Text style={styles.headerTitle}>MANGO MARKETS</Text>
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity>
              <SearchIcon size={18} color={Colors.textSecondary} />
            </TouchableOpacity>
            <TouchableOpacity>
              <BookmarkIcon size={18} color={Colors.accentPurple} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Feed Title */}
        <View style={styles.feedHeader}>
          <Text style={styles.feedTitle}>Neural Feed</Text>
          <View style={styles.liveIndicator}>
            <LiveDot size={6} color={Colors.green} />
            <Text style={styles.liveText}>LIVE</Text>
          </View>
        </View>

        {/* System Update Badge */}
        <View style={styles.systemBadge}>
          <Text style={styles.systemBadgeText}>SYSTEM UPDATE</Text>
        </View>

        {/* Chart Card */}
        <View style={styles.chartCard}>
          <View style={styles.chartLines}>
            {Array.from({length: 5}).map((_, i) => (
              <View key={i} style={[styles.chartLine, {
                bottom: 10 + i * 20,
                backgroundColor: i % 2 === 0 ? 'rgba(34, 197, 94, 0.25)' : 'rgba(239, 68, 68, 0.25)',
              }]} />
            ))}
          </View>
        </View>

        {/* Featured Article */}
        <View style={styles.article}>
          <View style={styles.articleMeta}>
            <Text style={styles.metaText}>ANALYSIS • 42 MIN AGO</Text>
            <TouchableOpacity>
              <BookmarkIcon size={16} color={Colors.textTertiary} />
            </TouchableOpacity>
          </View>
          <Text style={styles.articleTitle}>
            SEC Signals Final Approval for Ethereum ETFs by Friday
          </Text>
          <View style={styles.aiSummary}>
            <Text style={styles.aiSummaryLabel}>AI AI SUMMARY</Text>
            <Text style={styles.aiSummaryText}>
              Institutional capital inflow projections increased 340% in the first quarter.
              Spot conversion rates in first-to-spot match, with ETH liquidity on the
              increasing by 14% in anticipation of final launch.
            </Text>
          </View>
        </View>

        {/* Two Column Cards */}
        <View style={styles.twoCol}>
          <View style={styles.miniCard}>
            <Text style={styles.miniMeta}>ANALYSIS • 1HR AGO</Text>
            <Text style={styles.miniTitle}>Bitcoin Dominance Hits 5-Year High at 68.4%</Text>
          </View>
          <View style={[styles.miniCard, styles.miniCardAccent]}>
            <Text style={styles.miniMeta}>LIVE TRACKING</Text>
            <Text style={styles.miniTitle}>L2 Congestion Increases Amidst Protocol Bridge Queue</Text>
            <View style={styles.strainedBadge}>
              <Text style={styles.strainedText}>⚡ STRAINED</Text>
            </View>
          </View>
        </View>

        {/* Signal Protocols */}
        <Text style={styles.sectionLabel}>SIGNAL PROTOCOLS</Text>
        <View style={styles.twoCol}>
          <View style={styles.signalCard}>
            <View style={styles.signalIcon}>
              <Text style={styles.signalEmoji}>📡</Text>
            </View>
            <Text style={styles.signalTitle}>PATTERN RECOGNITION</Text>
            <Text style={styles.signalDesc}>
              Waves and Cycles: 3x previous 4.12.2025 data challenge. Signals long-term bullish pattern.
            </Text>
            <Text style={styles.signalAction}>DEEP DIVE</Text>
          </View>
          <View style={styles.signalCard}>
            <View style={styles.signalIcon}>
              <Text style={styles.signalEmoji}>❄️</Text>
            </View>
            <Text style={styles.signalTitle}>NETWORK HEALTH</Text>
            <Text style={styles.signalDesc}>
              Solana network: 75,000 tps target. 2,400 validators active. Implementation: finalized.
            </Text>
            <Text style={styles.signalAction}>VIEW METRICS</Text>
          </View>
        </View>

        {/* Bottom Feed Items */}
        <View style={styles.feedItem}>
          <View style={styles.feedItemImg}><Text style={styles.feedEmoji}>🤖</Text></View>
          <Text style={styles.feedItemTitle}>Nvidia GPU Shortage Slows AI Training Efficiency Advances</Text>
        </View>
        <View style={styles.feedItem}>
          <View style={styles.feedItemImg}><Text style={styles.feedEmoji}>🔐</Text></View>
          <Text style={styles.feedItemTitle}>Zero-Knowledge Proof Implementation Cuts Gas Costs by 40%</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#08081A'},
  scrollView: {flex: 1},
  scrollContent: {paddingBottom: 100},
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: Spacing.xl, paddingTop: 54, paddingBottom: Spacing.md,
  },
  headerLeft: {flexDirection: 'row', alignItems: 'center', gap: 8},
  headerTitle: {fontSize: 14, fontWeight: '700', letterSpacing: 2, color: Colors.textPrimary},
  headerRight: {flexDirection: 'row', alignItems: 'center', gap: 14},
  feedHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: Spacing.xl, marginBottom: Spacing.md,
  },
  feedTitle: {fontSize: FontSize.xxl, fontWeight: '700', color: Colors.textPrimary},
  liveIndicator: {
    flexDirection: 'row', alignItems: 'center', gap: 5,
    backgroundColor: 'rgba(34, 197, 94, 0.1)', paddingHorizontal: 10, paddingVertical: 4,
    borderRadius: BorderRadius.full, borderWidth: 1, borderColor: 'rgba(34, 197, 94, 0.2)',
  },
  liveText: {fontSize: 10, fontWeight: '700', letterSpacing: 1, color: Colors.green},
  systemBadge: {
    marginHorizontal: Spacing.xl, alignSelf: 'flex-start',
    backgroundColor: 'rgba(168, 85, 247, 0.15)', paddingHorizontal: 10, paddingVertical: 4,
    borderRadius: 4, borderWidth: 1, borderColor: 'rgba(168, 85, 247, 0.25)', marginBottom: Spacing.md,
  },
  systemBadgeText: {fontSize: 9, letterSpacing: 1, color: Colors.accentPurple, fontWeight: '700'},
  chartCard: {
    marginHorizontal: Spacing.xl, height: 130, borderRadius: BorderRadius.lg,
    backgroundColor: '#0E0E20', borderWidth: 1, borderColor: 'rgba(168, 85, 247, 0.12)',
    overflow: 'hidden', marginBottom: Spacing.lg,
  },
  chartLines: {flex: 1, position: 'relative'},
  chartLine: {position: 'absolute', left: 0, right: 0, height: 1.5},
  article: {marginHorizontal: Spacing.xl, marginBottom: Spacing.xl},
  articleMeta: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8,
  },
  metaText: {fontSize: 10, letterSpacing: 1, color: Colors.textTertiary, fontWeight: '600'},
  articleTitle: {
    fontSize: FontSize.xl, fontWeight: '700', color: Colors.textPrimary, lineHeight: 26, marginBottom: 12,
  },
  aiSummary: {
    backgroundColor: 'rgba(168, 85, 247, 0.06)', borderRadius: BorderRadius.md,
    padding: Spacing.lg, borderWidth: 1, borderColor: 'rgba(168, 85, 247, 0.12)',
  },
  aiSummaryLabel: {
    fontSize: 9, letterSpacing: 1.5, color: Colors.accentPurple, fontWeight: '700', marginBottom: 6,
  },
  aiSummaryText: {fontSize: FontSize.sm, color: Colors.textSecondary, lineHeight: 18},
  twoCol: {
    flexDirection: 'row', paddingHorizontal: Spacing.xl, gap: 10, marginBottom: Spacing.xl,
  },
  miniCard: {
    flex: 1, backgroundColor: '#0E0E20', borderRadius: BorderRadius.md, padding: Spacing.md,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)',
  },
  miniCardAccent: {borderColor: 'rgba(168, 85, 247, 0.15)'},
  miniMeta: {fontSize: 9, letterSpacing: 1, color: Colors.textTertiary, fontWeight: '600', marginBottom: 6},
  miniTitle: {fontSize: FontSize.sm, fontWeight: '600', color: Colors.textPrimary, lineHeight: 18},
  strainedBadge: {
    marginTop: 8, alignSelf: 'flex-start',
    backgroundColor: 'rgba(239, 68, 68, 0.12)', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 3,
  },
  strainedText: {fontSize: 9, color: Colors.red, fontWeight: '700'},
  sectionLabel: {
    fontSize: 10, letterSpacing: 2, color: Colors.textTertiary, fontWeight: '600',
    paddingHorizontal: Spacing.xl, marginBottom: Spacing.md,
  },
  signalCard: {
    flex: 1, backgroundColor: '#0E0E20', borderRadius: BorderRadius.md, padding: Spacing.md,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)',
  },
  signalIcon: {
    width: 28, height: 28, borderRadius: 14,
    backgroundColor: 'rgba(168, 85, 247, 0.12)', justifyContent: 'center', alignItems: 'center',
    marginBottom: 8,
  },
  signalEmoji: {fontSize: 14},
  signalTitle: {fontSize: 9, letterSpacing: 1, color: Colors.textTertiary, fontWeight: '600', marginBottom: 4},
  signalDesc: {fontSize: 12, color: Colors.textSecondary, lineHeight: 17, marginBottom: 6},
  signalAction: {fontSize: 10, color: Colors.accentPurple, fontWeight: '700', letterSpacing: 0.5},
  feedItem: {
    flexDirection: 'row', alignItems: 'center', marginHorizontal: Spacing.xl,
    backgroundColor: '#0E0E20', borderRadius: BorderRadius.md, padding: Spacing.md,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)', marginBottom: Spacing.md, gap: 12,
  },
  feedItemImg: {
    width: 44, height: 44, borderRadius: BorderRadius.sm,
    backgroundColor: 'rgba(168, 85, 247, 0.08)', justifyContent: 'center', alignItems: 'center',
  },
  feedEmoji: {fontSize: 20},
  feedItemTitle: {flex: 1, fontSize: FontSize.sm, fontWeight: '600', color: Colors.textPrimary, lineHeight: 18},
});

export default NewsScreen;
