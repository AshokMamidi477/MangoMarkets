import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import {Colors, Spacing, FontSize, BorderRadius} from '../theme';
import {MenuIcon, SearchIcon, AlertIcon, ChevronDownIcon} from '../components/icons';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const ASSETS = [
  {symbol: 'BTC', name: 'Bitcoin', amount: '0.524 BTC', price: '$8,245.10', change: '+4.21%', positive: true, icon: '₿'},
  {symbol: 'ETH', name: 'Ethereum', amount: '3.82 ETH', price: '$3,011.23', change: '+2.18%', positive: true, icon: 'Ξ'},
  {symbol: 'SOL', name: 'Solana', amount: '17.55 SOL', price: '$1,055.81', change: '+1.1%', positive: true, icon: '◎'},
];

const PortfolioScreen: React.FC = () => {
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
            <MenuIcon size={20} color={Colors.textSecondary} />
            <Text style={styles.headerTitle}>MANGO MARKETS</Text>
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity>
              <SearchIcon size={18} color={Colors.textSecondary} />
            </TouchableOpacity>
            <View style={styles.avatarSmall}>
              <Text style={styles.avatarSmallText}>A</Text>
            </View>
          </View>
        </View>

        {/* Portfolio Value */}
        <View style={styles.valueSection}>
          <Text style={styles.valueLabel}>TOTAL PORTFOLIO VALUE</Text>
          <View style={styles.valueRow}>
            <View>
              <Text style={styles.valueAmount}>$12,450.82</Text>
              <View style={styles.changeBadge}>
                <Text style={styles.changeText}>+1.2% | +$150</Text>
              </View>
            </View>
            {/* Donut chart placeholder */}
            <View style={styles.donutChart}>
              <View style={styles.donutOuter}>
                <View style={styles.donutSegment1} />
                <View style={styles.donutSegment2} />
                <View style={styles.donutInner} />
              </View>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.actionBtn}>
            <Text style={styles.actionBtnText}>Deposit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionBtn, styles.actionBtnOutline]}>
            <Text style={styles.actionBtnOutlineText}>Withdraw</Text>
          </TouchableOpacity>
        </View>

        {/* Asset Breakdown */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Asset Breakdown</Text>
          <TouchableOpacity>
            <ChevronDownIcon size={16} color={Colors.textTertiary} />
          </TouchableOpacity>
        </View>

        {ASSETS.map((asset, idx) => (
          <View key={idx} style={styles.assetRow}>
            <View style={styles.assetLeft}>
              <View style={styles.assetIcon}>
                <Text style={styles.assetIconText}>{asset.icon}</Text>
              </View>
              <View>
                <Text style={styles.assetName}>{asset.name}</Text>
                <Text style={styles.assetAmount}>{asset.amount}</Text>
              </View>
            </View>
            <View style={styles.assetRight}>
              <Text style={styles.assetPrice}>{asset.price}</Text>
              <Text style={[styles.assetChange, {color: asset.positive ? Colors.green : Colors.red}]}>
                {asset.change}
              </Text>
            </View>
          </View>
        ))}

        {/* AI PAI Insight */}
        <View style={styles.aiCard}>
          <View style={styles.aiCardHeader}>
            <AlertIcon size={14} color={Colors.accentPurple} />
            <Text style={styles.aiCardLabel}>AI PAI INSIGHT</Text>
          </View>
          <Text style={styles.aiCardText}>
            Your portfolio beta is currently 1.4. Hedging BTC long with SOL perpetuals could reduce
            volatility by 12% in current market conditions.
          </Text>
          <TouchableOpacity style={styles.exploreBtn}>
            <Text style={styles.exploreBtnText}>Explore Strategy</Text>
          </TouchableOpacity>
        </View>

        {/* Margin Profile */}
        <View style={styles.marginCard}>
          <Text style={styles.marginTitle}>Margin Profile</Text>
          <View style={styles.marginRow}>
            <Text style={styles.marginLabel}>Equity Value</Text>
            <Text style={styles.marginValue}>$12,451.02</Text>
          </View>
          <View style={styles.marginRow}>
            <Text style={styles.marginLabel}>Margin Used</Text>
            <Text style={styles.marginValue}>$3,930.00</Text>
          </View>
          <View style={styles.marginBar}>
            <View style={styles.marginBarFill} />
          </View>
          <View style={styles.marginBarLabels}>
            <Text style={styles.marginBarLabel}>HEALTH RATIO</Text>
            <Text style={styles.marginBarLabel}>LIMIT: 80%</Text>
          </View>
        </View>

        {/* Key Metrics */}
        <View style={styles.metricsCard}>
          <Text style={styles.metricsTitle}>KEY METRICS</Text>
          <View style={styles.metricsGrid}>
            <View style={styles.metricItem}>
              <Text style={styles.metricLabel}>SHARPE RATIO</Text>
              <Text style={styles.metricValue}>2.01</Text>
            </View>
            <View style={styles.metricItem}>
              <Text style={styles.metricLabel}>MAX DRAWDOWN</Text>
              <Text style={[styles.metricValue, {color: Colors.red}]}>-6.2%</Text>
            </View>
            <View style={styles.metricItem}>
              <Text style={styles.metricLabel}>WIN RATE</Text>
              <Text style={styles.metricValue}>38.5%</Text>
            </View>
            <View style={styles.metricItem}>
              <Text style={styles.metricLabel}>DAILY P/L</Text>
              <Text style={[styles.metricValue, {color: Colors.green}]}>+$4.24</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#040410'},
  scrollView: {flex: 1},
  scrollContent: {paddingBottom: 100},
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: Spacing.xl, paddingTop: 54, paddingBottom: Spacing.md,
  },
  headerLeft: {flexDirection: 'row', alignItems: 'center', gap: 10},
  headerTitle: {fontSize: 15, fontWeight: '700', letterSpacing: 2, color: Colors.textPrimary},
  headerRight: {flexDirection: 'row', alignItems: 'center', gap: 14},
  avatarSmall: {
    width: 28, height: 28, borderRadius: 14,
    backgroundColor: 'rgba(168, 85, 247, 0.15)', justifyContent: 'center', alignItems: 'center',
    borderWidth: 1, borderColor: Colors.accentPurple,
  },
  avatarSmallText: {fontSize: 12, fontWeight: '700', color: Colors.accentPurple},
  valueSection: {paddingHorizontal: Spacing.xl, marginBottom: Spacing.lg},
  valueLabel: {fontSize: 10, letterSpacing: 1.5, color: Colors.textTertiary, fontWeight: '600', marginBottom: 6},
  valueRow: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'},
  valueAmount: {fontSize: 30, fontWeight: '700', color: Colors.textPrimary, marginBottom: 4},
  changeBadge: {
    backgroundColor: 'rgba(34, 197, 94, 0.12)', paddingHorizontal: 8, paddingVertical: 3,
    borderRadius: 4, alignSelf: 'flex-start',
  },
  changeText: {fontSize: 12, color: Colors.green, fontWeight: '600'},
  donutChart: {width: 60, height: 60, justifyContent: 'center', alignItems: 'center'},
  donutOuter: {
    width: 56, height: 56, borderRadius: 28,
    borderWidth: 5, borderColor: Colors.electricBlue,
    borderTopColor: Colors.green, borderRightColor: Colors.green,
    justifyContent: 'center', alignItems: 'center',
  },
  donutSegment1: {position: 'absolute'},
  donutSegment2: {position: 'absolute'},
  donutInner: {
    width: 40, height: 40, borderRadius: 20, backgroundColor: '#040410',
  },
  actionRow: {
    flexDirection: 'row', paddingHorizontal: Spacing.xl, gap: 10, marginBottom: Spacing.xxl,
  },
  actionBtn: {
    flex: 1, paddingVertical: 10, borderRadius: BorderRadius.sm,
    backgroundColor: Colors.textPrimary, alignItems: 'center',
  },
  actionBtnText: {fontSize: FontSize.sm, fontWeight: '700', color: Colors.bgPrimary},
  actionBtnOutline: {
    backgroundColor: 'transparent', borderWidth: 1, borderColor: Colors.borderLight,
  },
  actionBtnOutlineText: {fontSize: FontSize.sm, fontWeight: '600', color: Colors.textSecondary},
  sectionHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: Spacing.xl, marginBottom: Spacing.md,
  },
  sectionTitle: {fontSize: FontSize.md, fontWeight: '700', color: Colors.textPrimary},
  assetRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: Spacing.xl, paddingVertical: 14,
    borderBottomWidth: 1, borderBottomColor: Colors.border,
  },
  assetLeft: {flexDirection: 'row', alignItems: 'center', gap: 12},
  assetIcon: {
    width: 34, height: 34, borderRadius: 17,
    backgroundColor: 'rgba(168, 85, 247, 0.1)', justifyContent: 'center', alignItems: 'center',
    borderWidth: 1, borderColor: 'rgba(168, 85, 247, 0.2)',
  },
  assetIconText: {fontSize: 15, fontWeight: '700', color: Colors.accentPurple},
  assetName: {fontSize: FontSize.md, fontWeight: '600', color: Colors.textPrimary},
  assetAmount: {fontSize: 12, color: Colors.textTertiary, marginTop: 2},
  assetRight: {alignItems: 'flex-end'},
  assetPrice: {fontSize: FontSize.md, fontWeight: '600', color: Colors.textPrimary},
  assetChange: {fontSize: FontSize.sm, fontWeight: '600', marginTop: 2},
  aiCard: {
    marginHorizontal: Spacing.xl, marginTop: Spacing.xl,
    backgroundColor: Colors.bgCard, borderRadius: BorderRadius.md, padding: Spacing.xl,
    borderWidth: 1, borderColor: Colors.borderPurple,
  },
  aiCardHeader: {flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 8},
  aiCardLabel: {fontSize: 10, letterSpacing: 1.5, color: Colors.accentPurple, fontWeight: '700'},
  aiCardText: {fontSize: FontSize.sm, color: Colors.textSecondary, lineHeight: 20, marginBottom: 14},
  exploreBtn: {
    backgroundColor: 'rgba(168, 85, 247, 0.12)', paddingVertical: 10,
    borderRadius: BorderRadius.sm, alignItems: 'center',
    borderWidth: 1, borderColor: Colors.borderPurple,
  },
  exploreBtnText: {fontSize: FontSize.sm, fontWeight: '700', color: Colors.accentPurple},
  marginCard: {
    marginHorizontal: Spacing.xl, marginTop: Spacing.xl,
    backgroundColor: Colors.bgCard, borderRadius: BorderRadius.md, padding: Spacing.xl,
    borderWidth: 1, borderColor: Colors.border,
  },
  marginTitle: {fontSize: FontSize.md, fontWeight: '700', color: Colors.textPrimary, marginBottom: 14},
  marginRow: {
    flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10,
  },
  marginLabel: {fontSize: FontSize.sm, color: Colors.textTertiary},
  marginValue: {fontSize: FontSize.sm, fontWeight: '600', color: Colors.textPrimary},
  marginBar: {
    height: 4, backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: 2,
    overflow: 'hidden', marginTop: 6,
  },
  marginBarFill: {
    width: '32%', height: 4, backgroundColor: Colors.green, borderRadius: 2,
  },
  marginBarLabels: {
    flexDirection: 'row', justifyContent: 'space-between', marginTop: 6,
  },
  marginBarLabel: {fontSize: 9, letterSpacing: 0.5, color: Colors.textTertiary},
  metricsCard: {
    marginHorizontal: Spacing.xl, marginTop: Spacing.xl,
    backgroundColor: Colors.bgCard, borderRadius: BorderRadius.md, padding: Spacing.xl,
    borderWidth: 1, borderColor: Colors.border,
  },
  metricsTitle: {
    fontSize: 11, letterSpacing: 1.5, color: Colors.textTertiary, fontWeight: '700', marginBottom: 14,
  },
  metricsGrid: {flexDirection: 'row', flexWrap: 'wrap', gap: 0},
  metricItem: {
    width: '50%', marginBottom: 16,
  },
  metricLabel: {fontSize: 9, letterSpacing: 1, color: Colors.textTertiary, fontWeight: '600', marginBottom: 4},
  metricValue: {fontSize: FontSize.lg, fontWeight: '700', color: Colors.textPrimary},
});

export default PortfolioScreen;
