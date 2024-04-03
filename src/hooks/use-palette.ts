import { useTheme } from 'react-native-material';

export const usePalette = () => {
  return useTheme().palette;
};
