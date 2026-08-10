import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/types";
import { mockVehicles } from "../../services/mockData";
import VehicleCard from "./VehicleCard";
import { colors, spacing, radius } from "../../theme";

type VehicleListNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "VehicleList"
>;

export default function VehicleListScreen() {
  const navigation = useNavigation<VehicleListNavigationProp>();

  // substituir por chamada real à API quando o backend existir
  const vehicles = mockVehicles;

  return (
    <View style={styles.container}>
      {vehicles.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>
            Você ainda não tem veículos cadastrados
          </Text>
        </View>
      ) : (
        <FlatList
          data={vehicles}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <VehicleCard
              vehicle={item}
              onPress={() =>
                navigation.navigate("VehicleDetail", { vehicleId: item.id })
              }
            />
          )}
        />
      )}

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate("VehicleForm")}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  list: { padding: spacing.lg },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: spacing.xxxl,
  },
  emptyText: { fontSize: 16, color: colors.textMuted, textAlign: "center" },
  fab: {
    position: "absolute",
    right: 20,
    bottom: 30,
    width: 56,
    height: 56,
    borderRadius: radius.circle,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
  },
  fabText: { color: colors.white, fontSize: 28, lineHeight: 30 },
});