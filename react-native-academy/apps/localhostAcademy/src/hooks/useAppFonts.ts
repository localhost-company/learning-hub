import { useFonts } from 'expo-font';

export const useAppFonts = () => {
  const [loaded] = useFonts({});

  return loaded;
};
