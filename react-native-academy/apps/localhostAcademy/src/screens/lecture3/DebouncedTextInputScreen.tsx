import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { colors, fontFamilies, fontSizes } from '../../theme';

const DEBOUNCE_DELAY = 500;

const DebouncedTextInputScreen = () => {
  // Shared counter
  const [inputChanges, setInputChanges] = useState(0);

  // Immediate API calls (no debounce)
  const [immediateQuery, setImmediateQuery] = useState('');
  const [immediateApiCalls, setImmediateApiCalls] = useState(0);

  // Debounced API calls
  const [pendingDebouncedQuery, setPendingDebouncedQuery] = useState('');
  const [finalDebouncedQuery, setFinalDebouncedQuery] = useState('');
  const [debouncedApiCalls, setDebouncedApiCalls] = useState(0);
  const [timeUntildebouncedRequest, setTimeUntilDebouncedRequest] = useState(0);

  // Handle immediate API calls
  useEffect(() => {
    if (!immediateQuery.trim()) return;

    setImmediateApiCalls(prev => prev + 1);
  }, [immediateQuery]);

  // Handle debounce: watch typing and debounce before making API call
  useEffect(() => {
    setTimeUntilDebouncedRequest(DEBOUNCE_DELAY);

    const timerId = setTimeout(() => {
      setFinalDebouncedQuery(pendingDebouncedQuery);
      setTimeUntilDebouncedRequest(0);
    }, DEBOUNCE_DELAY);

    const countdownInterval = setInterval(() => {
      setTimeUntilDebouncedRequest(prev => Math.max(0, prev - 100));
    }, 100);

    return () => {
      clearTimeout(timerId);
      clearInterval(countdownInterval);
    };
  }, [pendingDebouncedQuery]);

  // Trigger debounced API call only when final debounced value is set
  useEffect(() => {
    if (!finalDebouncedQuery.trim()) return;

    setDebouncedApiCalls(prev => prev + 1);
  }, [finalDebouncedQuery]);

  const handleImmediateChange = (text: string) => {
    setInputChanges(prev => prev + 1);
    setImmediateQuery(text);
  };

  const handleDebouncedChange = (text: string) => {
    setInputChanges(prev => prev + 1);
    setPendingDebouncedQuery(text);
  };

  return (
    <View style={styles.container}>
      <View style={styles.heroCard}>
        <Text style={styles.badge}>Input optimization demo</Text>
        <Text style={styles.title}>Debounced text input</Text>
        <Text style={styles.description}>
          Compare immediate requests against debounced requests to visualize how fewer API calls can
          keep your app responsive.
        </Text>
      </View>

      {/* Shared Monitor */}
      <View style={styles.monitorBox}>
        <Text style={styles.monitorTitle}>📊 Shared Monitor</Text>
        <View style={styles.monitorRow}>
          <View style={styles.monitorItem}>
            <Text style={styles.monitorLabel}>Total Input Changes</Text>
            <Text style={styles.monitorValue}>{inputChanges}</Text>
          </View>
          <View style={styles.monitorItem}>
            <Text style={styles.monitorLabel}>Immediate API Calls</Text>
            <Text style={[styles.monitorValue, { color: '#f44336' }]}>{immediateApiCalls}</Text>
          </View>
          <View style={styles.monitorItem}>
            <Text style={styles.monitorLabel}>Debounced API Calls</Text>
            <Text style={[styles.monitorValue, { color: '#4caf50' }]}>{debouncedApiCalls}</Text>
          </View>
        </View>
      </View>

      {/* Comparison Row */}
      <View style={styles.comparisonRow}>
        {/* Immediate (No Debounce) */}
        <View style={styles.inputSection}>
          <View style={styles.headerBadge}>
            <Text style={styles.headerBadgeText}>❌ NO DEBOUNCE</Text>
          </View>
          <TextInput
            value={immediateQuery}
            onChangeText={handleImmediateChange}
            placeholder="Type here..."
            style={styles.input}
          />
          <View style={styles.resultBoxImmediate}>
            {immediateQuery.trim() ? (
              <>
                <Text style={styles.resultLabel}>Last Result:</Text>
                <Text style={styles.resultValueImmediate}>{immediateQuery}</Text>
              </>
            ) : (
              <Text style={styles.placeholderText}>Results appear immediately</Text>
            )}
          </View>
        </View>

        {/* Debounced */}
        <View style={styles.inputSection}>
          <View style={[styles.headerBadge, { backgroundColor: '#4caf50' }]}>
            <Text style={styles.headerBadgeText}>✓ DEBOUNCED (500ms)</Text>
          </View>
          <TextInput
            value={pendingDebouncedQuery}
            onChangeText={handleDebouncedChange}
            placeholder="Type here..."
            style={styles.input}
          />
          <View style={styles.resultBoxDebounced}>
            {timeUntildebouncedRequest > 0 && pendingDebouncedQuery.trim() ? (
              <>
                <Text style={styles.resultLabel}>Waiting... {timeUntildebouncedRequest}ms</Text>
                <Text style={styles.resultValuePending}>{pendingDebouncedQuery}</Text>
              </>
            ) : finalDebouncedQuery.trim() ? (
              <>
                <Text style={styles.resultLabel}>✓ Result:</Text>
                <Text style={styles.resultValueDebounced}>{finalDebouncedQuery}</Text>
              </>
            ) : (
              <Text style={styles.placeholderText}>Results appear after 500ms</Text>
            )}
          </View>
        </View>
      </View>

      {/* Summary */}
      <View style={styles.summaryBox}>
        <Text style={styles.summaryTitle}>💡 Why Debounce?</Text>
        <Text style={styles.summaryText}>
          Both had {inputChanges} input changes, but immediate made {immediateApiCalls} API calls
          while debounced only made {debouncedApiCalls}! That&apos;s{' '}
          {immediateApiCalls - debouncedApiCalls} fewer requests.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    backgroundColor: '#fafafa',
  },
  heroCard: {
    marginBottom: 12,
    borderRadius: 12,
    padding: 12,
    backgroundColor: '#102347',
    borderWidth: 1,
    borderColor: '#1b3972',
  },
  badge: {
    alignSelf: 'flex-start',
    fontSize: fontSizes.caption,
    fontFamily: fontFamilies.accent,
    color: colors.badge.color,
    backgroundColor: colors.badge.backgroundColor,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginBottom: 8,
    fontWeight: '700',
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: 6,
  },
  description: {
    fontSize: 13,
    lineHeight: 18,
    color: '#cfdbff',
  },
  monitorBox: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#2196f3',
  },
  monitorTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#2196f3',
    marginBottom: 10,
  },
  monitorRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  monitorItem: {
    alignItems: 'center',
  },
  monitorLabel: {
    fontSize: 11,
    color: '#666',
    marginBottom: 4,
  },
  monitorValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2196f3',
  },
  comparisonRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  inputSection: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  headerBadge: {
    backgroundColor: '#f44336',
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 4,
    marginBottom: 8,
  },
  headerBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#fff',
  },
  input: {
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 6,
    padding: 8,
    marginBottom: 8,
    fontSize: 13,
  },
  resultBoxImmediate: {
    backgroundColor: '#ffebee',
    padding: 10,
    borderRadius: 6,
    borderLeftWidth: 3,
    borderLeftColor: '#f44336',
  },
  resultBoxDebounced: {
    backgroundColor: '#e8f5e9',
    padding: 10,
    borderRadius: 6,
    borderLeftWidth: 3,
    borderLeftColor: '#4caf50',
  },
  resultLabel: {
    fontSize: 11,
    color: '#666',
    marginBottom: 4,
  },
  resultValueImmediate: {
    fontSize: 14,
    fontWeight: '600',
    color: '#c62828',
  },
  resultValueDebounced: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2e7d32',
  },
  resultValuePending: {
    fontSize: 14,
    fontWeight: '600',
    color: '#f57f17',
  },
  placeholderText: {
    fontSize: 12,
    color: '#999',
    fontStyle: 'italic',
  },
  summaryBox: {
    backgroundColor: '#fff3cd',
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#ffc107',
  },
  summaryTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#856404',
    marginBottom: 6,
  },
  summaryText: {
    fontSize: 12,
    color: '#856404',
    lineHeight: 18,
  },
});

export default DebouncedTextInputScreen;
