import React, { useCallback, useMemo } from 'react';
import { ActivityIndicator, TextStyle, View, ViewStyle } from 'react-native';
import {
  Color,
  useStyleSheet,
  useTheme,
} from '@react-native-material/lab/lib/foundation';
import Surface from '../surface/Surface';
import Typography from '../typography/Typography';

export interface ButtonProps {
  title: string;
  variant?: 'contained' | 'outlined' | 'text';
  color?: Color;
  leading?: (info: { color?: string }) => React.ReactElement | null;
  trailing?: (info: { color?: string }) => React.ReactElement | null;
  loading?: boolean;
  uppercase?: boolean;
  disableElevation?: boolean;
  indicatorColor?: string;
  indciatorSize?: number | 'small' | 'large' | undefined;
  style?: ViewStyle;
  titleStyle?: TextStyle;
  leadingContainerStyle?: ViewStyle;
  trailingContainerStyle?: ViewStyle;
  indicatorStyle?: ViewStyle;
}

const Button: React.FC<ButtonProps> = ({
  title,
  variant,
  color,
  leading,
  trailing,
  loading,
  uppercase,
  disableElevation,
  indicatorColor,
  indciatorSize,
  style,
  titleStyle,
  leadingContainerStyle,
  trailingContainerStyle,
  indicatorStyle,
}) => {
  const theme = useTheme();

  const styles = useStyleSheet(
    ({ colors, elevations, typographyStyles }) => ({
      container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 14,
        paddingVertical: 9,
      },
      contained: {
        ...elevations[disableElevation ? 0 : 2],
        backgroundColor: colors[color!].main,
      },
      outlined: {
        paddingHorizontal: 13,
        paddingVertical: 8,
        borderWidth: 1,
        borderColor: colors[color!].main,
        backgroundColor: 'transparent',
      },
      text: {
        backgroundColor: 'transparent',
      },
      title: {
        ...typographyStyles.button,
        textTransform: uppercase ? 'uppercase' : 'none',
      },
      leading: {
        marginEnd: 8,
      },
      trailing: {
        marginStart: 8,
      },
    }),
    [color, uppercase, disableElevation],
  );

  const select = useCallback(
    <C, O, T>(contained?: C, outlined?: O, text?: T) => {
      switch (variant) {
        case 'contained':
          return contained;
        case 'outlined':
          return outlined;
        case 'text':
          return text;
      }
    },
    [variant],
  );

  const foregroundColor = useMemo(
    () =>
      select(
        theme.colors[color!].on,
        theme.colors[color!].main,
        theme.colors[color!].main,
      ),
    [select, theme.colors, color],
  );

  const leadingView = useMemo(() => {
    if (loading) {
      return (
        <ActivityIndicator
          style={indicatorStyle}
          color={indicatorColor ?? foregroundColor}
          size={indciatorSize}
        />
      );
    }

    let view = leading && leading({ color: foregroundColor });
    if (view) return view;
  }, [
    loading,
    indicatorStyle,
    indicatorColor,
    indciatorSize,
    foregroundColor,
    leading,
  ]);

  const trailingView = useMemo(() => {
    let view = trailing && trailing({ color: foregroundColor });
    if (view) return view;
  }, [trailing, foregroundColor]);

  return (
    <Surface
      style={[
        styles.container,
        select(styles.contained, styles.outlined, styles.text),
        style,
      ]}>
      {leadingView && (
        <View style={[styles.leading, leadingContainerStyle]}>
          {leadingView}
        </View>
      )}
      <Typography
        variant="button"
        style={[styles.title, { color: foregroundColor }, titleStyle]}>
        {title}
      </Typography>
      {trailingView && (
        <View style={[styles.trailing, trailingContainerStyle]}>
          {trailingView}
        </View>
      )}
    </Surface>
  );
};

Button.defaultProps = {
  variant: 'contained',
  color: 'primary',
  uppercase: true,
};

export default Button;
