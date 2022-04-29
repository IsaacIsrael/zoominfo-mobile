import React, { useState } from 'react';
import {
  StyleSheet,
  StyleProp,
  TextStyle,
  TextInput,
  NativeSyntheticEvent,
  TextInputFocusEventData,
  TextInputProps,
  ViewStyle,
  Keyboard,
} from 'react-native';

import { Colors } from '../../constants/Colors';
import { Sizes } from '../../constants/Sizes';
import IconButton from '../button/IconButton';
import Row from '../Row';

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  input: {
    flex: 1,
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: 0.25,
    color: Colors.TEXT,
    backgroundColor: Colors.WHITE,
    borderWidth: 0,
    width: '100%',
    padding: Sizes.GUTTER * 0.75,
  },
  inputFocus: {
    borderColor: Colors.PRIMARY,
  },
});

type AFTextInputProps = {
  containerStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<TextStyle>;
  onSearch?: (value: string) => void;
};

type Props = AFTextInputProps & Omit<TextInputProps, keyof AFTextInputProps>;

const SearchInput: React.FC<Props> = ({
  containerStyle,
  style,
  onFocus,
  onBlur,
  onSearch: onSearchProps,
  ...props
}) => {
  const [focus, setFocus] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');

  const onInputFocus = (event: NativeSyntheticEvent<TextInputFocusEventData>): void => {
    setFocus(true);

    if (onFocus) {
      onFocus(event);
    }
  };
  const onInputBluer = (event: NativeSyntheticEvent<TextInputFocusEventData>): void => {
    setFocus(false);

    if (onBlur) {
      onBlur(event);
    }
  };

  const onSearch = (): void => {
    Keyboard.dismiss();

    if (onSearchProps) {
      onSearchProps(value);
    }
  };

  return (
    <Row style={[styles.container, containerStyle]}>
      <TextInput
        style={[styles.input, focus && styles.inputFocus, style]}
        keyboardType="web-search"
        placeholderTextColor={Colors.TEXT}
        onFocus={onInputFocus}
        onBlur={onInputBluer}
        onChangeText={setValue}
        value={value}
        onSubmitEditing={onSearch}
        {...props}
      />
      <IconButton name="search" onPress={onSearch} />
    </Row>
  );
};

SearchInput.defaultProps = {
  containerStyle: {},
  style: {},
  onSearch: () => undefined,
};

export default SearchInput;
