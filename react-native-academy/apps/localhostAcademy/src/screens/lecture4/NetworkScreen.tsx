import React, { useCallback, useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

type RequestStatus = 'idle' | 'loading' | 'done' | 'error';

export const NetworkScreen = () => {
  const [status, setStatus] = useState<RequestStatus>('idle');
  const [message, setMessage] = useState(
    'Otvor DevTools kartu Network a prejdi na túto obrazovku.',
  );

  const runRequests = useCallback(async () => {
    setStatus('loading');
    setMessage('Odosielajú sa ukážkové requesty...');

    try {
      await Promise.allSettled([
        fetch('https://jsonplaceholder.typicode.com/posts/1').then(response => response.json()),
        fetch('https://jsonplaceholder.typicode.com/users/1').then(response => response.json()),
        fetch('https://jsonplaceholder.typicode.com/posts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: 'Ukážka React Native DevTools',
            body: 'Tento request je tu kvôli Network karte.',
            userId: 1,
          }),
        }).then(response => response.json()),
        fetch('https://jsonplaceholder.typicode.com/does-not-exist').then(response => {
          if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`);
          }
          return response.json();
        }),
      ]);

      setStatus('done');
      setMessage('Ukážkové requesty sa dokončili. Môžeš ich spustiť znova.');
    } catch {
      setStatus('error');
      setMessage('Niektoré requesty zlyhali neočakávane.');
    }
  }, []);

  useEffect(() => {
    runRequests();
  }, [runRequests]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ukážka sekcie Network</Text>
      <Text style={styles.description}>
        Táto obrazovka po otvorení odošle niekoľko requestov, aby sa zobrazili v React Native
        DevTools.
      </Text>
      <Text style={styles.status}>Stav: {status}</Text>
      <Text style={styles.message}>{message}</Text>

      <Pressable style={styles.button} onPress={runRequests}>
        <Text style={styles.buttonText}>Spustiť requesty znova</Text>
      </Pressable>
    </View>
  );
};

export default NetworkScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    gap: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
  },
  description: {
    textAlign: 'center',
    fontSize: 16,
  },
  status: {
    fontSize: 16,
    fontWeight: '600',
  },
  message: {
    textAlign: 'center',
    fontSize: 15,
    color: '#444',
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderStyle: 'solid',
    borderColor: 'black',
    borderWidth: 1,
    backgroundColor: '#f2f2f2',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
