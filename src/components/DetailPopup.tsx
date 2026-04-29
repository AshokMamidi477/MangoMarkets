import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Animated,
  Dimensions,
  Pressable,
  ScrollView,
} from 'react-native';
import {Colors, Spacing, FontSize, BorderRadius} from '../theme';

const {width: SCREEN_W, height: SCREEN_H} = Dimensions.get('window');

export interface DetailPopupField {
  label: string;
  value: string;
  color?: string;
}

export interface DetailPopupProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  value?: string;
  change?: string;
  positive?: boolean;
  fields?: DetailPopupField[];
  icon?: string;
  aiInsight?: string;
}

const DetailPopup: React.FC<DetailPopupProps> = ({
  visible,
  onClose,
  title,
  subtitle,
  value,
  change,
  positive,
  fields = [],
  icon,
  aiInsight,
}) => {
  const anim = useRef(new Animated.Value(0)).current;
  const [modalVisible, setModalVisible] = useState(false);
  const closing = useRef(false);

  useEffect(() => {
    if (visible) {
      closing.current = false;
      setModalVisible(true);
      anim.setValue(0);
      Animated.timing(anim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible, anim]);

  const handleClose = () => {
    if (closing.current) {return;}
    closing.current = true;
    Animated.timing(anim, {
      toValue: 0,
      duration: 400,
      useNativeDriver: true,
    }).start(() => {
      setModalVisible(false);
      onClose();
    });
  };

  const overlayOpacity = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const cardScale = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const cardOpacity = anim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 1, 1],
  });

  const changeColor = positive ? Colors.green : Colors.red;

  return (
    <Modal
      transparent
      visible={modalVisible}
      animationType="none"
      onRequestClose={handleClose}>
      <View style={styles.container}>
        <Animated.View
          style={[StyleSheet.absoluteFill, styles.overlay, {opacity: overlayOpacity}]}
        />
        <Pressable style={StyleSheet.absoluteFill} onPress={handleClose} />
        <Animated.View
          style={[
            styles.card,
            {transform: [{scale: cardScale}], opacity: cardOpacity},
          ]}>
          <ScrollView
            bounces={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}>
            {/* Header */}
            <View style={styles.cardHeader}>
              <View style={styles.headerRow}>
                {icon ? (
                  <View style={styles.iconCircle}>
                    <Text style={styles.iconText}>{icon}</Text>
                  </View>
                ) : null}
                <View style={styles.titleBlock}>
                  <Text style={styles.title}>{title}</Text>
                  {subtitle ? (
                    <Text style={styles.subtitle}>{subtitle}</Text>
                  ) : null}
                </View>
              </View>
              <TouchableOpacity
                onPress={handleClose}
                style={styles.closeBtn}
                hitSlop={{top: 12, bottom: 12, left: 12, right: 12}}>
                <Text style={styles.closeBtnText}>✕</Text>
              </TouchableOpacity>
            </View>

            {/* Value + Change */}
            {value ? (
              <View style={styles.valueSection}>
                <Text style={styles.valueText}>{value}</Text>
                {change ? (
                  <View
                    style={[
                      styles.changeBadge,
                      {
                        backgroundColor: positive
                          ? 'rgba(34,197,94,0.12)'
                          : 'rgba(239,68,68,0.12)',
                      },
                    ]}>
                    <Text style={[styles.changeText, {color: changeColor}]}>
                      {change}
                    </Text>
                  </View>
                ) : null}
              </View>
            ) : null}

            {/* AI Insight */}
            {aiInsight ? (
              <View style={styles.aiInsightBox}>
                <Text style={styles.aiInsightLabel}>🧠 AI INSIGHT</Text>
                <Text style={styles.aiInsightText}>{aiInsight}</Text>
              </View>
            ) : null}

            {/* Divider */}
            {fields.length > 0 ? <View style={styles.divider} /> : null}

            {/* Detail Fields */}
            {fields.map((field, idx) => (
              <View
                key={idx}
                style={[
                  styles.fieldRow,
                  idx === fields.length - 1 && styles.fieldRowLast,
                ]}>
                <Text style={styles.fieldLabel}>{field.label}</Text>
                <Text
                  style={[
                    styles.fieldValue,
                    field.color ? {color: field.color} : null,
                  ]}>
                  {field.value}
                </Text>
              </View>
            ))}
          </ScrollView>

          {/* Accent bar */}
          <View style={styles.accentBar} />
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.75)',
  },
  card: {
    width: SCREEN_W * 0.92,
    maxHeight: SCREEN_H * 0.85,
    backgroundColor: Colors.bgCard,
    borderRadius: BorderRadius.xl,
    borderWidth: 1.5,
    borderColor: 'rgba(168, 85, 247, 0.5)',
    overflow: 'hidden',
    shadowColor: '#A855F7',
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.3,
    shadowRadius: 24,
    elevation: 20,
  },
  scrollContent: {
    paddingBottom: Spacing.xl,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: Spacing.xxl,
    paddingBottom: Spacing.lg,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    flex: 1,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(168, 85, 247, 0.12)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.borderPurple,
  },
  iconText: {fontSize: 22},
  titleBlock: {flex: 1},
  title: {
    fontSize: FontSize.xl,
    fontWeight: '700',
    color: Colors.textPrimary,
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
    marginTop: 3,
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
  },
  closeBtnText: {
    fontSize: 15,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
  valueSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingHorizontal: Spacing.xxl,
    paddingBottom: Spacing.xl,
  },
  valueText: {
    fontSize: FontSize.hero,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  changeBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: BorderRadius.full,
  },
  changeText: {
    fontSize: FontSize.md,
    fontWeight: '700',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(168, 85, 247, 0.2)',
    marginHorizontal: Spacing.xxl,
  },
  aiInsightBox: {
    marginHorizontal: Spacing.xxl,
    marginBottom: Spacing.lg,
    backgroundColor: 'rgba(168, 85, 247, 0.08)',
    borderRadius: BorderRadius.md,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: 'rgba(168, 85, 247, 0.2)',
  },
  aiInsightLabel: {
    fontSize: 9,
    letterSpacing: 1.5,
    color: Colors.accentPurple,
    fontWeight: '700',
    marginBottom: 6,
  },
  aiInsightText: {
    fontSize: FontSize.sm,
    color: Colors.textPrimary,
    lineHeight: 20,
    fontWeight: '500',
  },
  fieldRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.xxl,
    paddingVertical: Spacing.xl,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.08)',
  },
  fieldRowLast: {
    borderBottomWidth: 0,
  },
  fieldLabel: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
  fieldValue: {
    fontSize: FontSize.md,
    color: '#FFFFFF',
    fontWeight: '700',
  },
  accentBar: {
    height: 3,
    backgroundColor: Colors.accentPurple,
  },
});

export default DetailPopup;
