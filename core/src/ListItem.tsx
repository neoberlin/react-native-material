import React, { useMemo } from "react";
import { View } from "react-native";
import chroma from "chroma-js";
import { useTheme } from "./base";
import Divider from "./Divider";
import Text from "./Text";
import Touchable, { TouchableProps } from "./Touchable";

export interface ListItemProps extends TouchableProps {
  title?: string;

  secondaryText?: string;

  overline?: string;

  meta?: string;

  leadingMode?: "icon" | "avatar" | "image";

  leading?: React.ReactElement;

  trailing?: React.ReactElement;
}

const ListItem: React.FC<ListItemProps> = ({
  title,
  secondaryText,
  overline,
  meta,
  leadingMode = "icon",
  leading,
  trailing,
  ...rest
}) => {
  const { palette } = useTheme();
  const scale = useMemo(
    () => chroma.scale([palette.surface, palette.onSurface]),
    [palette.surface, palette.onSurface],
  )
  return (
    <Touchable style={{ backgroundColor: scale(0).hex() }} disabled={!rest.onPress} {...rest}>
      <View style={{ flexDirection: "row", alignItems: "center", marginVertical: 12 }}>
        {leading &&
        <View
          style={{
            width: leadingMode === 'icon' ? 24 : leadingMode === 'avatar' ? 56 : 100,
            height: leadingMode === 'icon' ? 24 : leadingMode === 'avatar' ? 56 : 56,
            justifyContent: 'center',
            alignItems: 'center',
            marginStart: leadingMode === 'image' ? 0 : 16,
            backgroundColor: 'gray',
          }}
        >{leading}</View>}
        <View style={{ flex: 1, marginHorizontal: 16 }}>
          {overline &&
          <Text variant="overline" style={{ marginBottom: 2, color: scale(0.6).hex() }}>{overline}</Text>}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            {title &&
            <Text variant="subtitle1" style={{ color: scale(0.87).hex() }}>{title}</Text>}
            {meta &&
            <Text variant="caption" style={{ color: scale(0.87).hex() }}>{meta}</Text>}
          </View>
          {secondaryText &&
          <Text variant="body2" style={{ marginTop: 4, color: scale(0.6).hex() }}>{secondaryText}</Text>}
        </View>
        {trailing &&
        <View style={{
          width: 24,
          height: 24,
          marginEnd: 16,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          {trailing}
        </View>}
      </View>
      <Divider />
    </Touchable>
  )
};

export default ListItem;