import React, {useState, useCallback} from 'react';
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
import {MenuIcon, SearchIcon} from '../components/icons';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import DetailPopup, {DetailPopupProps} from '../components/DetailPopup';

const {width} = Dimensions.get('window');
type PopupData = Omit<DetailPopupProps, 'visible' | 'onClose'>;
type Segment = 'stocks' | 'crypto';

interface SubIndex {
  key: string; label: string; value: string; change: string; positive: boolean; meta: string;
  bars: number[]; aiSummary: string; popup: PopupData;
  watchlist: {symbol: string; name: string; price: string; change: string; positive: boolean; aiReason: string}[];
  sentiment: {score: number; label: string; body: string; aiInsight: string; fields: {label: string; value: string; color?: string}[]};
  heatmap: {symbol: string; intensity: number}[];
}

// ── STOCK INDICES ──
const STOCK_INDICES: SubIndex[] = [
  { key:'sp500', label:'S&P 500', value:'5,137.08', change:'+1.24%', positive:true, meta:'GLOBAL EQUITIES',
    bars:[30,35,28,40,38,45,42,50,48,55,52,58,54,60,57,62,65,60,68,72],
    aiSummary:'Broad rally driven by dovish Fed commentary. Institutional flows turning positive after 2-week outflow cycle.',
    popup:{title:'S&P 500',subtitle:'US Large Cap Index',icon:'📈',value:'5,137.08',change:'+1.24%',positive:true,
      aiInsight:'Broad rally driven by dovish Fed commentary and strong mega-cap earnings. Institutional flows turning positive.',
      fields:[{label:'Open',value:'5,074.20'},{label:'Day High',value:'5,148.90'},{label:'Day Low',value:'5,062.15'},{label:'52W High',value:'5,231.40'},{label:'52W Low',value:'4,103.78'},{label:'Volume',value:'2.1B'}]},
    watchlist:[
      {symbol:'AAPL',name:'Apple Inc.',price:'$189.43',change:'+0.84%',positive:true,aiReason:'Fed dovish tone lifting tech sector broadly'},
      {symbol:'MSFT',name:'Microsoft',price:'$415.20',change:'+1.02%',positive:true,aiReason:'Cloud + AI revenue beat driving re-rating'},
      {symbol:'JPM',name:'JPMorgan Chase',price:'$198.50',change:'+0.62%',positive:true,aiReason:'Net interest income guidance raised'},
      {symbol:'UNH',name:'UnitedHealth',price:'$524.30',change:'-0.45%',positive:false,aiReason:'Medicare Advantage enrollment concerns'},
    ],
    sentiment:{score:65,label:'Greed',body:'Institutional put/call ratio at 0.6. Smart money positioning for continued upside in large caps.',
      aiInsight:'Greed levels rising as institutional put/call ratio drops. Smart money positioning for continued upside.',
      fields:[{label:'Classification',value:'Greed',color:Colors.green},{label:'Previous Close',value:'62'},{label:'1 Week Ago',value:'58'},{label:'Momentum',value:'Rising',color:Colors.green}]},
    heatmap:[{symbol:'AAPL',intensity:0.4},{symbol:'MSFT',intensity:0.6},{symbol:'GOOG',intensity:0.3},{symbol:'META',intensity:0.5},{symbol:'JPM',intensity:0.3},{symbol:'UNH',intensity:-0.3},{symbol:'V',intensity:0.2},{symbol:'JNJ',intensity:-0.1}],
  },
  { key:'nasdaq', label:'NASDAQ', value:'15,628', change:'+1.14%', positive:true, meta:'US TECH',
    bars:[25,30,35,32,40,38,42,45,48,50,46,52,55,58,54,60,62,58,65,68],
    aiSummary:'AI sector leading gains — NVDA, MSFT, GOOG driving 60% of index movement.',
    popup:{title:'NASDAQ',subtitle:'US Tech Composite',icon:'💻',value:'15,628',change:'+1.14%',positive:true,
      aiInsight:'AI sector leading gains — NVDA, MSFT, GOOG driving 60% of index movement. Semiconductor demand accelerating.',
      fields:[{label:'Open',value:'15,452'},{label:'Day High',value:'15,710'},{label:'Day Low',value:'15,410'},{label:'52W High',value:'16,212'},{label:'52W Low',value:'12,543'},{label:'Volume',value:'4.8B'}]},
    watchlist:[
      {symbol:'NVDA',name:'Nvidia Corp.',price:'$824.18',change:'+3.52%',positive:true,aiReason:'AI chip demand surge — data center orders up 40%'},
      {symbol:'TSLA',name:'Tesla, Inc.',price:'$202.64',change:'-1.13%',positive:false,aiReason:'Margin pressure from China price war intensifying'},
      {symbol:'AMZN',name:'Amazon.com',price:'$178.25',change:'-0.82%',positive:false,aiReason:'AWS growth slowing, cloud competition heating up'},
      {symbol:'GOOG',name:'Alphabet Inc.',price:'$155.72',change:'+1.45%',positive:true,aiReason:'Search ad revenue resilient, Gemini AI traction growing'},
    ],
    sentiment:{score:72,label:'Greed',body:'Tech momentum strong. AI narrative driving sustained inflows into semiconductor and cloud names.',
      aiInsight:'Tech momentum strong with AI narrative driving sustained inflows. Watch for rotation risk if yields spike.',
      fields:[{label:'Classification',value:'Greed',color:Colors.green},{label:'Previous Close',value:'68'},{label:'1 Week Ago',value:'60'},{label:'Momentum',value:'Strong',color:Colors.green}]},
    heatmap:[{symbol:'NVDA',intensity:0.8},{symbol:'TSLA',intensity:-0.5},{symbol:'AMZN',intensity:-0.3},{symbol:'GOOG',intensity:0.5},{symbol:'META',intensity:0.6},{symbol:'NFLX',intensity:0.3},{symbol:'ADBE',intensity:-0.2},{symbol:'CRM',intensity:0.4}],
  },
  { key:'russell', label:'RUSSELL', value:'2,003', change:'-0.34%', positive:false, meta:'US SMALL CAP',
    bars:[45,42,40,38,35,37,34,36,33,35,32,30,33,31,28,30,27,29,26,24],
    aiSummary:'Small caps underperforming as higher-for-longer rate fears weigh on leveraged balance sheets.',
    popup:{title:'Russell 2000',subtitle:'US Small Cap Index',icon:'📉',value:'2,003',change:'-0.34%',positive:false,
      aiInsight:'Small caps struggling with higher-for-longer rate environment. Regional bank exposure creating headwinds.',
      fields:[{label:'Open',value:'2,010.45'},{label:'Day High',value:'2,018.90'},{label:'Day Low',value:'1,995.22'},{label:'52W High',value:'2,135.46'},{label:'52W Low',value:'1,682.30'},{label:'Volume',value:'1.3B'}]},
    watchlist:[
      {symbol:'SMCI',name:'Super Micro',price:'$742.10',change:'+5.20%',positive:true,aiReason:'AI server demand bucking small-cap trend'},
      {symbol:'RIOT',name:'Riot Platforms',price:'$12.80',change:'+2.10%',positive:true,aiReason:'Bitcoin mining profitability improving post-halving'},
      {symbol:'PLUG',name:'Plug Power',price:'$3.42',change:'-4.20%',positive:false,aiReason:'Cash burn concerns, hydrogen adoption slower than expected'},
      {symbol:'SOFI',name:'SoFi Technologies',price:'$7.95',change:'+1.80%',positive:true,aiReason:'Member growth accelerating, path to profitability clearer'},
    ],
    sentiment:{score:38,label:'Fear',body:'Small cap sentiment weak. Regional bank stress and rate sensitivity keeping investors cautious.',
      aiInsight:'Fear dominating small caps. Regional bank stress keeping institutional investors on the sidelines.',
      fields:[{label:'Classification',value:'Fear',color:Colors.red},{label:'Previous Close',value:'40'},{label:'1 Week Ago',value:'45'},{label:'Momentum',value:'Declining',color:Colors.red}]},
    heatmap:[{symbol:'SMCI',intensity:0.7},{symbol:'RIOT',intensity:0.4},{symbol:'PLUG',intensity:-0.8},{symbol:'SOFI',intensity:0.3},{symbol:'AFRM',intensity:-0.4},{symbol:'UPST',intensity:-0.6},{symbol:'DKNG',intensity:0.3},{symbol:'IWM',intensity:-0.2}],
  },
];

// ── CRYPTO INDICES ──
const CRYPTO_INDICES: SubIndex[] = [
  { key:'btc', label:'BTC', value:'$67,432', change:'+4.21%', positive:true, meta:'BITCOIN',
    bars:[35,40,38,45,50,48,55,52,60,58,65,62,68,72,70,75,78,74,80,85],
    aiSummary:'Post-halving supply shock in effect. Miner selling at historic low while ETF inflows hit $780M this week.',
    popup:{title:'BTC/USD',subtitle:'Bitcoin',icon:'₿',value:'$67,432',change:'+4.21%',positive:true,
      aiInsight:'Post-halving supply shock in effect. Miner selling pressure at historic low while ETF inflows hit $780M this week.',
      fields:[{label:'Open',value:'$64,710'},{label:'24H High',value:'$68,120'},{label:'24H Low',value:'$64,200'},{label:'Market Cap',value:'$1.32T'},{label:'24H Volume',value:'$38.2B'},{label:'Dominance',value:'68.4%'}]},
    watchlist:[
      {symbol:'BTC',name:'Bitcoin',price:'$67,822',change:'+4.15%',positive:true,aiReason:'Whale accumulation — 12K BTC moved to cold storage'},
      {symbol:'WBTC',name:'Wrapped Bitcoin',price:'$67,780',change:'+4.10%',positive:true,aiReason:'DeFi collateral demand rising with BTC rally'},
      {symbol:'MSTR',name:'MicroStrategy',price:'$1,542',change:'+6.20%',positive:true,aiReason:'BTC proxy trade — leveraged exposure to Bitcoin'},
      {symbol:'SATS',name:'1000SATS',price:'$0.00032',change:'+8.40%',positive:true,aiReason:'Ordinals ecosystem activity surging on Bitcoin L1'},
    ],
    sentiment:{score:78,label:'Extreme Greed',body:'Whale wallets accumulating aggressively. On-chain metrics signal strong bullish momentum.',
      aiInsight:'Extreme greed driven by whale accumulation and declining exchange reserves. Historically precedes short-term volatility.',
      fields:[{label:'Classification',value:'Extreme Greed',color:Colors.green},{label:'Previous Close',value:'72'},{label:'1 Week Ago',value:'55'},{label:'Momentum',value:'Surging',color:Colors.green}]},
    heatmap:[{symbol:'BTC',intensity:0.9},{symbol:'WBTC',intensity:0.8},{symbol:'MSTR',intensity:0.7},{symbol:'SATS',intensity:0.6},{symbol:'STX',intensity:0.4},{symbol:'ORDI',intensity:0.5},{symbol:'RUNE',intensity:-0.2},{symbol:'BCH',intensity:0.3}],
  },
  { key:'eth', label:'ETH', value:'$3,542', change:'+2.33%', positive:true, meta:'ETHEREUM',
    bars:[40,35,45,42,50,48,52,55,50,58,55,60,58,62,60,65,63,68,66,70],
    aiSummary:'ETF approval momentum building. Institutional inflows rising as staking yields attract capital.',
    popup:{title:'ETH/USD',subtitle:'Ethereum',icon:'Ξ',value:'$3,542',change:'+2.33%',positive:true,
      aiInsight:'ETF approval momentum building, institutional inflows rising. Staking yields making ETH attractive as yield-bearing asset.',
      fields:[{label:'Open',value:'$3,462'},{label:'24H High',value:'$3,580'},{label:'24H Low',value:'$3,440'},{label:'Market Cap',value:'$426B'},{label:'24H Volume',value:'$18.5B'},{label:'Gas (Gwei)',value:'24'}]},
    watchlist:[
      {symbol:'ETH',name:'Ethereum',price:'$3,542.88',change:'+2.33%',positive:true,aiReason:'ETF approval momentum building, institutional inflows rising'},
      {symbol:'LDO',name:'Lido DAO',price:'$2.45',change:'+3.80%',positive:true,aiReason:'Liquid staking demand surging with ETH rally'},
      {symbol:'ARB',name:'Arbitrum',price:'$1.12',change:'+1.90%',positive:true,aiReason:'L2 transaction volume hitting new highs'},
      {symbol:'OP',name:'Optimism',price:'$2.68',change:'-0.80%',positive:false,aiReason:'Token unlock pressure despite strong fundamentals'},
    ],
    sentiment:{score:68,label:'Greed',body:'Ethereum ecosystem expanding. L2 adoption accelerating and staking participation at all-time high.',
      aiInsight:'Greed building around ETH ETF narrative. L2 ecosystem growth providing fundamental support.',
      fields:[{label:'Classification',value:'Greed',color:Colors.green},{label:'Previous Close',value:'64'},{label:'1 Week Ago',value:'52'},{label:'Momentum',value:'Rising',color:Colors.green}]},
    heatmap:[{symbol:'ETH',intensity:0.6},{symbol:'LDO',intensity:0.5},{symbol:'ARB',intensity:0.4},{symbol:'OP',intensity:-0.2},{symbol:'UNI',intensity:0.3},{symbol:'AAVE',intensity:0.5},{symbol:'MKR',intensity:0.4},{symbol:'ENS',intensity:-0.1}],
  },
  { key:'sol', label:'SOL', value:'$142.50', change:'+6.10%', positive:true, meta:'SOLANA',
    bars:[20,25,30,28,35,40,38,45,50,48,55,60,58,65,62,70,68,75,72,80],
    aiSummary:'DEX volume hitting ATH — ecosystem activity surging. Meme coin season driving transaction fees.',
    popup:{title:'SOL/USD',subtitle:'Solana',icon:'◎',value:'$142.50',change:'+6.10%',positive:true,
      aiInsight:'DEX volume at all-time highs. Meme coin activity and DePIN narrative driving ecosystem growth.',
      fields:[{label:'Open',value:'$134.20'},{label:'24H High',value:'$145.80'},{label:'24H Low',value:'$132.90'},{label:'Market Cap',value:'$62.4B'},{label:'24H Volume',value:'$4.1B'},{label:'TPS',value:'65,000'}]},
    watchlist:[
      {symbol:'SOL',name:'Solana',price:'$142.50',change:'+6.10%',positive:true,aiReason:'DEX volume hitting ATH — ecosystem activity surging'},
      {symbol:'JUP',name:'Jupiter',price:'$1.08',change:'+8.40%',positive:true,aiReason:'Leading Solana DEX aggregator, volume exploding'},
      {symbol:'RNDR',name:'Render',price:'$8.92',change:'+4.50%',positive:true,aiReason:'GPU compute demand rising, DePIN narrative strong'},
      {symbol:'BONK',name:'Bonk',price:'$0.000024',change:'+12.30%',positive:true,aiReason:'Meme coin season on Solana driving retail frenzy'},
    ],
    sentiment:{score:82,label:'Extreme Greed',body:'Solana ecosystem in full momentum. DEX volumes, NFT activity, and DePIN all surging simultaneously.',
      aiInsight:'Extreme greed on Solana. Multi-narrative momentum (DeFi + memes + DePIN) rarely sustains — watch for cooldown.',
      fields:[{label:'Classification',value:'Extreme Greed',color:Colors.green},{label:'Previous Close',value:'76'},{label:'1 Week Ago',value:'60'},{label:'Momentum',value:'Surging',color:Colors.green}]},
    heatmap:[{symbol:'SOL',intensity:0.8},{symbol:'JUP',intensity:0.7},{symbol:'RNDR',intensity:0.6},{symbol:'BONK',intensity:0.9},{symbol:'RAY',intensity:0.5},{symbol:'PYTH',intensity:0.3},{symbol:'WIF',intensity:0.8},{symbol:'ORCA',intensity:0.2}],
  },
];

// ── COMPONENTS ──

const MiniBarChart: React.FC<{bars: number[]; color: string}> = ({bars, color}) => (
  <View style={st.miniChart}>
    {bars.map((h, i) => (
      <View key={i} style={[st.miniBar, {height: h, backgroundColor: i >= bars.length - 3 ? color : color + '55'}]} />
    ))}
  </View>
);

const HomeScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();
  const [segment, setSegment] = useState<Segment>('stocks');
  const [stockIdx, setStockIdx] = useState(0);
  const [cryptoIdx, setCryptoIdx] = useState(0);
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupData, setPopupData] = useState<PopupData>({title: ''});

  const showPopup = useCallback((data: PopupData) => {
    setPopupData(data);
    setPopupVisible(true);
  }, []);

  const isStocks = segment === 'stocks';
  const indices = isStocks ? STOCK_INDICES : CRYPTO_INDICES;
  const activeIdx = isStocks ? stockIdx : cryptoIdx;
  const setActiveIdx = isStocks ? setStockIdx : setCryptoIdx;
  const active = indices[activeIdx];
  const chartColor = isStocks ? Colors.green : Colors.accentPurple;

  return (
    <View style={st.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.bgPrimary} />
      <ScrollView
        style={st.scroll}
        contentContainerStyle={[st.scrollContent, {paddingBottom: 60 + insets.bottom + 20}]}
        showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={st.header}>
          <View style={st.headerLeft}>
            <MenuIcon size={20} color={Colors.textSecondary} />
            <Text style={st.headerTitle}>MANGO MARKETS</Text>
          </View>
          <View style={st.headerRight}>
            <TouchableOpacity><SearchIcon size={18} color={Colors.textSecondary} /></TouchableOpacity>
            <View style={st.avatarSmall}><Text style={st.avatarText}>A</Text></View>
          </View>
        </View>

        {/* Segment Bar */}
        <View style={st.segmentBar}>
          <TouchableOpacity style={[st.segmentBtn, isStocks && st.segmentBtnActive]} onPress={() => setSegment('stocks')}>
            <Text style={[st.segmentText, isStocks && st.segmentTextActive]}>📊  Stocks</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[st.segmentBtn, !isStocks && st.segmentBtnActive]} onPress={() => setSegment('crypto')}>
            <Text style={[st.segmentText, !isStocks && st.segmentTextActive]}>🪙  Crypto</Text>
          </TouchableOpacity>
        </View>

        {/* Index Pills */}
        <View style={st.indexPills}>
          {indices.map((idx, i) => (
            <TouchableOpacity key={idx.key}
              style={[st.pill, i === activeIdx && st.pillActive]}
              onPress={() => setActiveIdx(i)}>
              <Text style={[st.pillLabel, i === activeIdx && st.pillLabelActive]}>{idx.label}</Text>
              <Text style={[st.pillValue, i === activeIdx && st.pillValueActive]}>{idx.value}</Text>
              <Text style={[st.pillChange, {color: idx.positive ? Colors.green : Colors.red}]}>{idx.change}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* ── OVERVIEW CARD ── */}
        <Text style={st.sectionMeta}>MARKET PULSE</Text>
        <TouchableOpacity activeOpacity={0.8} style={st.indexCard} onPress={() => showPopup(active.popup)}>
          <View style={st.indexCardTop}>
            <View>
              <Text style={st.indexMeta}>{active.meta}</Text>
              <Text style={st.indexName}>{active.label}</Text>
            </View>
            <View style={st.indexRight}>
              <Text style={st.indexValue}>{active.value}</Text>
              <Text style={[st.indexChange, {color: active.positive ? Colors.green : Colors.red}]}>{active.change}</Text>
            </View>
          </View>
          <MiniBarChart bars={active.bars} color={chartColor} />
          <Text style={st.indexAiSummary}>{active.aiSummary}</Text>
        </TouchableOpacity>

        {/* ── AI INTELLIGENCE ── */}
        <View style={st.aiCard}>
          <View style={st.aiIconWrap}><Text style={st.aiIconEmoji}>🥭</Text></View>
          <Text style={st.aiCardTitle}>Mango AI Intelligence</Text>
          <Text style={st.aiCardBody}>{active.aiSummary}</Text>
          <TouchableOpacity style={st.aiBtn} onPress={() => navigation.navigate('AI')}>
            <Text style={st.aiBtnText}>🤖  Ask AI Analyst</Text>
          </TouchableOpacity>
        </View>

        {/* ── ACTIVE WATCHLIST ── */}
        <Text style={st.sectionMeta}>ACTIVE WATCHLIST</Text>
        <View style={st.watchHeader}>
          <Text style={[st.watchCol, st.watchColAsset]}>ASSET</Text>
          <Text style={[st.watchCol, st.watchColPrice]}>PRICE</Text>
          <Text style={[st.watchCol, st.watchColChange]}>CHANGE</Text>
        </View>
        {active.watchlist.map((item, i) => (
          <TouchableOpacity key={i} style={st.watchRow}
            onPress={() => showPopup({
              title: item.symbol, subtitle: item.name, icon: item.symbol.charAt(0),
              value: item.price, change: item.change, positive: item.positive, aiInsight: item.aiReason,
              fields: [{label:'Open',value:item.price},{label:'Change',value:item.change,color:item.positive?Colors.green:Colors.red},{label:'Volume',value:'—'},{label:'Market Cap',value:'—'}],
            })}>
            <View style={st.watchAsset}>
              <Text style={st.watchSymbol}>{item.symbol}</Text>
              <Text style={st.watchName}>{item.name}</Text>
              <Text style={st.watchAiReason} numberOfLines={1}>{item.aiReason}</Text>
            </View>
            <Text style={st.watchPrice}>{item.price}</Text>
            <Text style={[st.watchChange, {color: item.positive ? Colors.green : Colors.red}]}>{item.change}</Text>
          </TouchableOpacity>
        ))}

        {/* ── MARKET SENTIMENT ── */}
        <Text style={st.sectionMeta}>MARKET SENTIMENT</Text>
        <TouchableOpacity activeOpacity={0.8}
          onPress={() => showPopup({
            title:'Fear & Greed Index',subtitle:'Market Sentiment',icon:'🧠',
            value:String(active.sentiment.score),change:active.sentiment.label,positive:active.sentiment.score>50,
            aiInsight:active.sentiment.aiInsight, fields:active.sentiment.fields,
          })}>
          <View style={st.sentimentCard}>
            <View style={[st.gaugeOuter, active.sentiment.score <= 50 && {borderTopColor:Colors.red,borderRightColor:Colors.red}]}>
              <View style={st.gaugeInner}><Text style={st.gaugeValue}>{active.sentiment.score}</Text></View>
            </View>
            <Text style={st.sentimentBody}>{active.sentiment.body}</Text>
          </View>
        </TouchableOpacity>

        {/* ── SENTIMENT HEATMAP ── */}
        <Text style={st.sectionMeta}>SENTIMENT HEATMAP</Text>
        <View style={st.heatmapRow}>
          <Text style={st.heatmapLabel}>BEARISH</Text>
          <View style={{flex:1}} />
          <Text style={st.heatmapLabel}>BULLISH</Text>
        </View>
        <View style={st.heatmapGrid}>
          {active.heatmap.map((item, i) => (
            <TouchableOpacity key={i} activeOpacity={0.7}
              onPress={() => showPopup({
                title:item.symbol, subtitle:`${active.label} Heatmap`, icon:item.symbol.charAt(0),
                change:item.intensity>0?`+${(item.intensity*100).toFixed(0)}%`:`${(item.intensity*100).toFixed(0)}%`,
                positive:item.intensity>0,
                aiInsight:item.intensity>0.5?`Strong bullish momentum on ${item.symbol}. Accumulation across multiple timeframes.`
                  :item.intensity<-0.5?`Bearish divergence on ${item.symbol}. Distribution and declining volume.`
                  :`${item.symbol} consolidating. Waiting for catalyst.`,
                fields:[
                  {label:'Sentiment',value:item.intensity>0.5?'Strong Bullish':item.intensity>0?'Bullish':item.intensity>-0.5?'Bearish':'Strong Bearish',
                    color:item.intensity>0?Colors.green:Colors.red},
                  {label:'Intensity',value:`${(Math.abs(item.intensity)*100).toFixed(0)}%`}],
              })}
              style={[st.heatmapCell,{backgroundColor:item.intensity>0
                ?`rgba(34,197,94,${Math.abs(item.intensity)*0.6})`
                :`rgba(239,68,68,${Math.abs(item.intensity)*0.6})`}]}>
              <Text style={st.heatmapSymbol}>{item.symbol}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* ── MANGO PRO ── */}
        <TouchableOpacity activeOpacity={0.8}
          onPress={() => showPopup({title:'Mango Pro',subtitle:'Premium Experience',icon:'🥭',
            fields:[{label:'🚀  Status',value:'Coming Soon',color:Colors.accentPurple},{label:'📊  Real-Time Analytics',value:'Institutional Grade'},
              {label:'🤖  AI Insights',value:'Advanced Models'},{label:'🔔  Smart Alerts',value:'Custom Triggers'},
              {label:'📈  Portfolio Tools',value:'Pro Strategies'},{label:'✨  Early Access',value:'Stay Tuned',color:Colors.brandGold}]})}
          style={st.proCard}>
          <View style={st.proBanner}><Text style={st.proBannerText}>PREMIUM ACCESS</Text></View>
          <Text style={st.proTitle}>Mango Pro</Text>
          <Text style={st.proDesc}>Unlock the institutional order flow +</Text>
        </TouchableOpacity>

      </ScrollView>
      <DetailPopup visible={popupVisible} onClose={() => setPopupVisible(false)} {...popupData} />
    </View>
  );
};

const st = StyleSheet.create({
  container: {flex: 1, backgroundColor: Colors.bgPrimary},
  scroll: {flex: 1},
  scrollContent: {paddingBottom: 100},
  header: {flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingHorizontal:Spacing.xl,paddingTop:54,paddingBottom:Spacing.lg},
  headerLeft: {flexDirection:'row',alignItems:'center',gap:10},
  headerTitle: {fontSize:14,fontWeight:'700',letterSpacing:2,color:Colors.textPrimary},
  headerRight: {flexDirection:'row',alignItems:'center',gap:14},
  avatarSmall: {width:28,height:28,borderRadius:14,backgroundColor:Colors.accentPurple,justifyContent:'center',alignItems:'center'},
  avatarText: {fontSize:12,fontWeight:'700',color:'#fff'},

  segmentBar: {flexDirection:'row',marginHorizontal:Spacing.xl,backgroundColor:Colors.bgCard,borderRadius:BorderRadius.md,padding:3,marginBottom:Spacing.md,borderWidth:1,borderColor:Colors.border},
  segmentBtn: {flex:1,paddingVertical:10,borderRadius:BorderRadius.sm,alignItems:'center'},
  segmentBtnActive: {backgroundColor:'rgba(168,85,247,0.18)',borderWidth:1,borderColor:'rgba(168,85,247,0.4)'},
  segmentText: {fontSize:FontSize.md,fontWeight:'600',color:Colors.textTertiary},
  segmentTextActive: {color:Colors.textPrimary,fontWeight:'700'},

  // Index pills
  indexPills: {flexDirection:'row',paddingHorizontal:Spacing.xl,gap:8,marginBottom:Spacing.lg},
  pill: {flex:1,backgroundColor:Colors.bgCard,borderRadius:BorderRadius.md,padding:Spacing.md,alignItems:'center',borderWidth:1,borderColor:Colors.border},
  pillActive: {borderColor:'rgba(168,85,247,0.5)',backgroundColor:'rgba(168,85,247,0.08)'},
  pillLabel: {fontSize:10,fontWeight:'700',letterSpacing:0.5,color:Colors.textTertiary,marginBottom:3},
  pillLabelActive: {color:Colors.accentPurple},
  pillValue: {fontSize:FontSize.sm,fontWeight:'700',color:Colors.textSecondary,marginBottom:2},
  pillValueActive: {color:Colors.textPrimary},
  pillChange: {fontSize:10,fontWeight:'600'},

  sectionMeta: {fontSize:9,letterSpacing:2,color:Colors.textTertiary,fontWeight:'600',paddingHorizontal:Spacing.xl,marginBottom:6,marginTop:Spacing.xl},

  indexCard: {marginHorizontal:Spacing.xl,backgroundColor:Colors.bgCard,borderRadius:BorderRadius.md,padding:Spacing.lg,marginBottom:Spacing.md,borderWidth:1,borderColor:Colors.border},
  indexCardTop: {flexDirection:'row',justifyContent:'space-between',alignItems:'flex-start',marginBottom:Spacing.md},
  indexMeta: {fontSize:9,letterSpacing:1.5,color:Colors.textTertiary,fontWeight:'600',marginBottom:4},
  indexName: {fontSize:FontSize.lg,fontWeight:'700',color:Colors.textPrimary},
  indexRight: {alignItems:'flex-end'},
  indexValue: {fontSize:FontSize.lg,fontWeight:'700',color:Colors.textPrimary},
  indexChange: {fontSize:FontSize.sm,fontWeight:'600',marginTop:2},
  indexAiSummary: {fontSize:FontSize.sm,color:Colors.accentPurple,marginTop:Spacing.md,lineHeight:18,fontStyle:'italic'},
  miniChart: {flexDirection:'row',alignItems:'flex-end',gap:2,height:50},
  miniBar: {flex:1,borderRadius:1.5,minWidth:3},

  aiCard: {marginHorizontal:Spacing.xl,backgroundColor:Colors.bgCard,borderRadius:BorderRadius.md,padding:Spacing.xl,marginTop:Spacing.lg,borderWidth:1,borderColor:Colors.borderPurple,alignItems:'center'},
  aiIconWrap: {width:48,height:48,borderRadius:24,backgroundColor:'rgba(168,85,247,0.12)',justifyContent:'center',alignItems:'center',borderWidth:1,borderColor:Colors.borderPurple,marginBottom:Spacing.md},
  aiIconEmoji: {fontSize:22},
  aiCardTitle: {fontSize:FontSize.md,fontWeight:'700',color:Colors.textPrimary,marginBottom:Spacing.sm},
  aiCardBody: {fontSize:FontSize.sm,color:Colors.textSecondary,lineHeight:20,textAlign:'center',marginBottom:Spacing.lg},
  aiBtn: {backgroundColor:'rgba(168,85,247,0.15)',paddingVertical:10,paddingHorizontal:Spacing.xl,borderRadius:BorderRadius.sm,borderWidth:1,borderColor:Colors.borderPurple},
  aiBtnText: {fontSize:FontSize.sm,fontWeight:'700',color:Colors.accentPurple},

  watchHeader: {flexDirection:'row',paddingHorizontal:Spacing.xl,paddingVertical:Spacing.sm,borderBottomWidth:1,borderBottomColor:Colors.border},
  watchCol: {fontSize:9,letterSpacing:1,color:Colors.textMuted,fontWeight:'600'},
  watchColAsset: {flex:1.2}, watchColPrice: {flex:1,textAlign:'right'}, watchColChange: {flex:0.7,textAlign:'right'},
  watchRow: {flexDirection:'row',alignItems:'center',paddingHorizontal:Spacing.xl,paddingVertical:Spacing.md,borderBottomWidth:1,borderBottomColor:Colors.border},
  watchAsset: {flex:1.2},
  watchSymbol: {fontSize:FontSize.md,fontWeight:'700',color:Colors.textPrimary},
  watchName: {fontSize:11,color:Colors.textSecondary,marginTop:1},
  watchAiReason: {fontSize:10,color:Colors.accentPurple,marginTop:3,fontStyle:'italic'},
  watchPrice: {flex:1,fontSize:FontSize.md,fontWeight:'600',color:Colors.textPrimary,textAlign:'right'},
  watchChange: {flex:0.7,fontSize:FontSize.sm,fontWeight:'600',textAlign:'right'},

  sentimentCard: {marginHorizontal:Spacing.xl,backgroundColor:Colors.bgCard,borderRadius:BorderRadius.md,padding:Spacing.xl,borderWidth:1,borderColor:Colors.border,alignItems:'center'},
  gaugeOuter: {width:80,height:80,borderRadius:40,borderWidth:3,borderColor:Colors.electricBlue,justifyContent:'center',alignItems:'center',borderTopColor:Colors.green,borderRightColor:Colors.green,marginBottom:Spacing.md},
  gaugeInner: {width:60,height:60,borderRadius:30,backgroundColor:Colors.bgCard,justifyContent:'center',alignItems:'center'},
  gaugeValue: {fontSize:FontSize.xxl,fontWeight:'700',color:Colors.textPrimary},
  sentimentBody: {fontSize:FontSize.sm,color:Colors.textSecondary,lineHeight:20,textAlign:'center'},

  heatmapRow: {flexDirection:'row',paddingHorizontal:Spacing.xl,marginBottom:Spacing.sm},
  heatmapLabel: {fontSize:9,letterSpacing:1,color:Colors.textMuted,fontWeight:'600'},
  heatmapGrid: {flexDirection:'row',flexWrap:'wrap',paddingHorizontal:Spacing.xl,gap:6,marginBottom:Spacing.xl},
  heatmapCell: {width:(width-40-18)/4,height:52,borderRadius:BorderRadius.sm,justifyContent:'center',alignItems:'center'},
  heatmapSymbol: {fontSize:11,fontWeight:'700',color:Colors.textPrimary},

  proCard: {marginHorizontal:Spacing.xl,backgroundColor:Colors.bgCard,borderRadius:BorderRadius.md,overflow:'hidden',borderWidth:1,borderColor:Colors.borderPurple},
  proBanner: {backgroundColor:'rgba(168,85,247,0.2)',paddingVertical:8,alignItems:'center'},
  proBannerText: {fontSize:10,letterSpacing:2,fontWeight:'700',color:Colors.accentPurple},
  proTitle: {fontSize:FontSize.lg,fontWeight:'700',color:Colors.textPrimary,paddingHorizontal:Spacing.xl,paddingTop:Spacing.lg},
  proDesc: {fontSize:FontSize.sm,color:Colors.textTertiary,lineHeight:18,paddingHorizontal:Spacing.xl,paddingBottom:Spacing.xl,paddingTop:Spacing.xs},
});

export default HomeScreen;
