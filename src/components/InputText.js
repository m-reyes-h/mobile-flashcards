import React from "react";
import { TextInput } from "react-native";

import { gray } from "../utils/colors";
import { global } from "../utils/globalStyles";

export default function InputText({
  handleChange,
  marginBottom,
  placeholder,
  value
}) {
  return (
    <TextInput
      onChangeText={handleChange}
      placeholder={placeholder}
      placeholderTextColor={gray}
      style={[global.inputField, { marginBottom: marginBottom }]}
      value={value}
    />
  );
}
