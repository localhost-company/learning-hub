import { describe, jest, test } from '@jest/globals';
import React from 'react';
import { measureRenders } from 'reassure';
import { ListExampleScreen } from '../ListExampleScreen';

jest.mock('uuid', () => ({ v4: () => 'benchmark-item-id' }));

jest.mock('react-native-reanimated', () => {
  const { View } = require('react-native');

  return {
    __esModule: true,
    default: { View },
    FadeIn: {},
    FadeOut: {},
  };
});

describe('ListExampleScreen performance', () => {
  test('mounts the 5,000-item list viewport', async () => {
    await measureRenders(<ListExampleScreen />, { runs: 5 });
  }, 10000000);
});
