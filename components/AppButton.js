import { StyleSheet, Text, TouchableOpacity } from "react-native";

const AppButton = ({ onPress, title }) => (
  <TouchableOpacity
    activeOpacity={0.8}
    onPress={onPress}
    style={styles.button}
  >
    <Text style={styles.label}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    elevation: 8,
    backgroundColor: "#009688",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 12
  },
  label: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  }
});


export default AppButton