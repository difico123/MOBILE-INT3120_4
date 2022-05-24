import { StyleSheet, View } from "react-native";
import { Menu, TextInput } from "react-native-paper";
// import { bs } from "../../styles";
import React, { useState } from "react";

const Autocomplete = ({
  value,
  setValue,
  label,
  detailData,
  containerStyle,
  onChange: origOnChange,
  icon = "bike",
  style = {},
  menuStyle = {},
  right = () => {},
  left = () => {},
  id,
  setId,
}) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const data = detailData.map(item => item.name);


  const filterData = (text) => {
    return detailData.filter(
      (val) => val.name?.toLowerCase()?.indexOf(text?.toLowerCase()) > -1
    );
  };

  const getIdByName = (name) => {
    const satisfied = detailData.filter(item => item.name === name);
    if (satisfied && satisfied.length > 0) {
      return satisfied[0].id;
    }
  };

  return (
    <View style={[containerStyle]}>
      <TextInput
        onFocus={() => {
          if (value && value.name && value.name.length === 0) {
            setMenuVisible(true);
          }
        }}
        //onBlur={() => setMenuVisible(false)}
        label={label}
        right={right}
        left={left}
        style={style}
        onChangeText={(text) => {
          origOnChange(text);
          if (text && text.length > 0) {
            setFilteredData(filterData(text));
          } else if (text && text.length === 0) {
            setFilteredData(detailData);
          }
          setMenuVisible(true);
          setValue(text);
        }}
        value={value}
      />
      {menuVisible && filteredData && (
        <View
          style={{
            flex: 1,
            backgroundColor: "white",
            borderWidth: 2,
            flexDirection: "column",
            borderColor: "grey",
          }}
        >
          {filteredData.map((datum, i) => (
            <Menu.Item
              key={i}
              style={[{ width: "100%" }, bs.borderBottom, menuStyle]}
              icon={icon}
              onPress={() => {
                setValue(datum);
                setMenuVisible(false);
                setId(datum.id);
              }}
              title={datum.name}
            />
          ))}
        </View>
      )}
    </View>
  );
};

export default Autocomplete;

const bs = StyleSheet.create({});
const style = StyleSheet.create({});
