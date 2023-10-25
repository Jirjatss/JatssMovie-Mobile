import { Text, View } from "react-native";

export default function CardAccount({ title, desc }) {
  return (
    <View style={{ backgroundColor: "hsla(0,0%,100%,.05)", width: 160, height: 160, borderRadius: 6, alignItems: "center", justifyContent: "center", gap: 6, marginHorizontal: 7 }}>
      <View style={{ backgroundColor: "hsla(0,0%,100%,.04)", width: 140, height: 100, alignItems: "center", justifyContent: "center", borderRadius: 6 }}>
        <Text style={{ color: "#5286ce", textAlign: "center" }}>{desc}</Text>
      </View>
      <View style={{ alignSelf: "flex-start", paddingHorizontal: 10 }}>
        <Text style={{ color: "white" }}>{title}</Text>
        <Text style={{ color: "gray" }}>0</Text>
      </View>
    </View>
  );
}
