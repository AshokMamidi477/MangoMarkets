import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {Colors, Spacing, FontSize, BorderRadius} from '../theme';
import {SearchIcon, MicIcon, BoltIcon} from '../components/icons';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface MetricItem {
  label: string;
  value: string;
  color: string;
}

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  label?: string;
  metrics?: MetricItem[];
  riskNote?: string;
  badges?: {text: string; color: string}[];
  progressBar?: {label: string; value: number};
}

const MESSAGES: Message[] = [
  {
    id: '1',
    text: 'Interface initialized. I am monitoring real-time liquidity flows and sentiment vectors across 400+ crypto assets. How can I assist your strategy today?',
    isUser: false,
    label: 'NEURAL CORE v4.2',
    badges: [
      {text: '● BTC/USD: +4.2%', color: Colors.green},
      {text: 'VOL: $2.4B', color: Colors.textSecondary},
    ],
  },
  {
    id: '2',
    text: 'Analyze the recent breakout in layer 2 ecosystem tokens.',
    isUser: true,
    label: 'OPERATOR',
  },
  {
    id: '3',
    text: 'Observing a 14.2% surge in L2 aggregate volume. On-chain metrics indicate institutional accumulation.',
    isUser: false,
    label: 'NEURAL CORE v4.2',
    progressBar: {label: 'Momentum Index', value: 88},
  },
];

const QUICK_PROMPTS = [
  {icon: '⚡', text: 'Why is Bitcoin going up?'},
  {icon: '📋', text: 'Summarize crypto news'},
];

const AIChatScreen: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.bgPrimary} />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>🥭</Text>
          </View>
          <Text style={styles.headerTitle}>MANGO MARKETS</Text>
        </View>
        <TouchableOpacity>
          <SearchIcon size={18} color={Colors.textSecondary} />
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={90}>
        <ScrollView
          style={styles.messagesContainer}
          contentContainerStyle={styles.messagesContent}
          showsVerticalScrollIndicator={false}>
          {MESSAGES.map(msg => (
            <View key={msg.id} style={msg.isUser ? styles.userRow : styles.aiRow}>
              {!msg.isUser && (
                <View style={styles.aiLabelRow}>
                  <View style={styles.aiDot} />
                  <Text style={styles.aiLabel}>{msg.label}</Text>
                </View>
              )}
              {msg.isUser && msg.label && (
                <Text style={styles.userLabel}>{msg.label}</Text>
              )}
              <View style={[styles.bubble, msg.isUser ? styles.userBubble : styles.aiBubble]}>
                <Text style={[styles.bubbleText, msg.isUser ? styles.userText : styles.aiText]}>
                  {msg.text}
                </Text>
                {msg.badges && (
                  <View style={styles.badgeRow}>
                    {msg.badges.map((b, i) => (
                      <View key={i} style={[styles.badge, {borderColor: b.color + '40'}]}>
                        <Text style={[styles.badgeText, {color: b.color}]}>{b.text}</Text>
                      </View>
                    ))}
                  </View>
                )}
                {msg.progressBar && (
                  <View style={styles.progressContainer}>
                    <View style={styles.progressHeader}>
                      <Text style={styles.progressLabel}>{msg.progressBar.label}</Text>
                      <Text style={styles.progressValue}>{msg.progressBar.value}/100</Text>
                    </View>
                    <View style={styles.progressTrack}>
                      <View style={[styles.progressFill, {width: `${msg.progressBar.value}%`}]} />
                    </View>
                  </View>
                )}
              </View>
            </View>
          ))}

          {/* Key levels note */}
          <Text style={styles.keyLevels}>Key levels to watch: $ARB 2.10</Text>

          {/* Quick prompts */}
          <View style={styles.quickPrompts}>
            {QUICK_PROMPTS.map((p, i) => (
              <TouchableOpacity key={i} style={styles.quickPromptBtn}>
                <Text style={styles.quickPromptIcon}>{p.icon}</Text>
                <Text style={styles.quickPromptText}>{p.text}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        {/* Input bar */}
        <View style={[styles.inputBar, {paddingBottom: Spacing.md + 60 + insets.bottom}]}>
          <TextInput
            style={styles.textInput}
            placeholder="Inquire with Ashok Mango..."
            placeholderTextColor={Colors.textTertiary}
            value={inputText}
            onChangeText={setInputText}
          />
          <TouchableOpacity style={styles.micBtn}>
            <MicIcon size={16} color={Colors.textTertiary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.sendBtn}>
            <BoltIcon size={18} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: Colors.bgPrimary},
  flex: {flex: 1},
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: Spacing.xl, paddingTop: 54, paddingBottom: Spacing.md,
    borderBottomWidth: 1, borderBottomColor: Colors.border,
  },
  headerLeft: {flexDirection: 'row', alignItems: 'center', gap: 10},
  avatar: {
    width: 32, height: 32, borderRadius: 16,
    backgroundColor: 'rgba(168, 85, 247, 0.15)', justifyContent: 'center', alignItems: 'center',
    borderWidth: 1.5, borderColor: Colors.accentPurple,
  },
  avatarText: {fontSize: 16},
  headerTitle: {fontSize: 15, fontWeight: '700', letterSpacing: 2, color: Colors.textPrimary},
  messagesContainer: {flex: 1},
  messagesContent: {padding: Spacing.xl, paddingBottom: 20},
  aiRow: {marginBottom: 20},
  userRow: {marginBottom: 20, alignItems: 'flex-end'},
  aiLabelRow: {flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 6},
  aiDot: {width: 8, height: 8, borderRadius: 4, backgroundColor: Colors.accentPurple},
  aiLabel: {fontSize: 11, letterSpacing: 1, color: Colors.accentPurple, fontWeight: '600'},
  userLabel: {
    fontSize: 10, letterSpacing: 1.5, color: Colors.textTertiary,
    fontWeight: '600', marginBottom: 6, textAlign: 'right',
  },
  bubble: {borderRadius: BorderRadius.lg, padding: Spacing.lg, maxWidth: '85%'},
  aiBubble: {
    backgroundColor: Colors.bgCard, borderWidth: 1, borderColor: Colors.border,
    borderTopLeftRadius: 4, alignSelf: 'flex-start',
  },
  userBubble: {
    backgroundColor: 'rgba(168, 85, 247, 0.12)', borderWidth: 1,
    borderColor: Colors.borderPurple, borderTopRightRadius: 4, alignSelf: 'flex-end',
  },
  bubbleText: {fontSize: FontSize.md, lineHeight: 22},
  aiText: {color: Colors.textSecondary},
  userText: {color: Colors.textPrimary},
  badgeRow: {flexDirection: 'row', gap: 8, marginTop: 12, flexWrap: 'wrap'},
  badge: {
    paddingHorizontal: 10, paddingVertical: 5, borderRadius: BorderRadius.full,
    borderWidth: 1, backgroundColor: 'rgba(255,255,255,0.03)',
  },
  badgeText: {fontSize: 12, fontWeight: '600'},
  progressContainer: {
    marginTop: 14, backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: BorderRadius.sm, padding: 12,
    borderWidth: 1, borderColor: Colors.border,
  },
  progressHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8,
  },
  progressLabel: {fontSize: FontSize.sm, color: Colors.textSecondary},
  progressValue: {fontSize: FontSize.md, fontWeight: '700', color: Colors.textPrimary},
  progressTrack: {
    height: 4, backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: 2, overflow: 'hidden',
  },
  progressFill: {height: 4, backgroundColor: Colors.accentPurple, borderRadius: 2},
  keyLevels: {
    fontSize: FontSize.sm, color: Colors.textTertiary, marginBottom: 16, textAlign: 'center',
  },
  quickPrompts: {flexDirection: 'row', gap: 8, justifyContent: 'center', flexWrap: 'wrap'},
  quickPromptBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    paddingHorizontal: 14, paddingVertical: 8,
    borderRadius: BorderRadius.full, borderWidth: 1,
    borderColor: Colors.borderLight, backgroundColor: Colors.bgCard,
  },
  quickPromptIcon: {fontSize: 12},
  quickPromptText: {fontSize: FontSize.sm, color: Colors.textSecondary},
  inputBar: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: Spacing.lg, paddingVertical: Spacing.md,
    borderTopWidth: 1, borderTopColor: Colors.border,
    backgroundColor: Colors.bgPrimary, gap: 8,
  },
  textInput: {
    flex: 1, height: 42, backgroundColor: Colors.bgCard,
    borderRadius: BorderRadius.full, paddingHorizontal: Spacing.lg,
    fontSize: FontSize.md, color: Colors.textPrimary,
    borderWidth: 1, borderColor: Colors.border,
  },
  micBtn: {
    width: 36, height: 36, borderRadius: 18,
    justifyContent: 'center', alignItems: 'center',
  },
  sendBtn: {
    width: 42, height: 42, borderRadius: 21,
    backgroundColor: Colors.accentPurple, justifyContent: 'center', alignItems: 'center',
  },
});

export default AIChatScreen;
