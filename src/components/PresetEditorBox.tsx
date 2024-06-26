import { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import WheelPicker from "react-native-wheely";
import Interval from "../utils/Interval";
import Styles from "../utils/Styles";
import Preset, { PresetValue } from "../constants/Preset";
import { Picker } from "@react-native-picker/picker";
import Alert from "../constants/Alert";
import { Dropdown } from "react-native-element-dropdown";

const numbers = Array.from(Array(60).keys());
const items = numbers.reverse().map((n) => String(n));

export default (props: {
  preset: Preset;
  submitPreset: (newValue: Preset) => void;
}) => {
  return (
    <View style={Styles.presetModal}>
      {props.preset.presetValues.map(function (value: PresetValue) {
        return (
          <View
            style={Styles.presetItem}
            key={props.preset.presetValues.indexOf(value)}
          >
            <Text>{value.name}</Text>
            <WheelPicker
              containerStyle={Styles.picker}
              selectedIndex={numbers.indexOf(value.numUnits)}
              options={items}
              onChange={(index) => {
                value.numUnits = parseInt(items[index]);
              }}
              visibleRest={1}
            />
            {value.alert && (
              <Dropdown
                style={[Styles.dropdown, Styles.alertDropdown]}
                value={value.alert}
                onChange={(item: any) => {
                  value.alert = item.value;
                }}
                placeholder={value.alert.name}
                data={Alert.values.map(function (alert: Alert) {
                  return { label: alert.name, value: alert };
                })}
                labelField="label"
                valueField="value"
                maxHeight={350}
              />
            )}
          </View>
        );
      })}
    </View>
  );
};
