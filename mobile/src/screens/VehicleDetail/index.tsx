import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/types";
import { mockVehicles, mockMaintenanceRecords } from "../../services/mockData";
import { colors, spacing, radius } from "../../theme";

type VehicleDetailNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "VehicleDetail"
>;
type VehicleDetailRouteProp = RouteProp<RootStackParamList, "VehicleDetail">;

export default function VehicleDetailScreen() {
  const navigation = useNavigation<VehicleDetailNavigationProp>();
  const route = useRoute<VehicleDetailRouteProp>();
  const { vehicleId } = route.params;

  // substituir por chamada real à API quando o backend existir
  const vehicle = mockVehicles.find((v) => v.id === vehicleId);

  const records = mockMaintenanceRecords
    .filter((r) => r.vehicleId === vehicleId)
    .sort((a, b) => (a.performedAt < b.performedAt ? 1 : -1));

  if (!vehicle) {
    return (
      <View style={styles.centered}>
        <Text style={styles.emptyText}>Veículo não encontrado</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.nickname}>{vehicle.nickname}</Text>
        <Text style={styles.details}>
          {vehicle.brand} {vehicle.model} • {vehicle.year}
        </Text>
        <Text style={styles.km}>
          {vehicle.currentKm.toLocaleString("pt-BR")} km atuais
        </Text>

        {vehicle.nextMaintenance && (
          <View style={styles.alertBox}>
            <Text style={styles.alertText}>
              Próxima: {vehicle.nextMaintenance.typeName} em{" "}
              {vehicle.nextMaintenance.dueInKm
                ? `${vehicle.nextMaintenance.dueInKm} km`
                : `${vehicle.nextMaintenance.dueInDays} dias`}
            </Text>
          </View>
        )}
      </View>

      <Text style={styles.sectionTitle}>Histórico de manutenções</Text>

      {records.length === 0 ? (
        <View style={styles.centered}>
          <Text style={styles.emptyText}>
            Nenhuma manutenção registrada ainda
          </Text>
        </View>
      ) : (
        <FlatList
          data={records}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <View style={styles.recordCard}>
              <View style={styles.recordHeader}>
                <Text style={styles.recordType}>{item.typeName}</Text>
                <Text style={styles.recordDate}>
                  {new Date(item.performedAt).toLocaleDateString("pt-BR")}
                </Text>
              </View>
              <Text style={styles.recordDetails}>
                {item.kmAtService.toLocaleString("pt-BR")} km
                {item.cost ? ` • R$ ${item.cost.toFixed(2)}` : ""}
              </Text>
              {item.notes && (
                <Text style={styles.recordNotes}>{item.notes}</Text>
              )}
            </View>
          )}
        />
      )}

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("MaintenanceForm", { vehicleId })}
      >
        <Text style={styles.buttonText}>Registrar manutenção</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: {
    backgroundColor: colors.white,
    padding: spacing.xl,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  nickname: { fontSize: 22, fontWeight: "bold" },
  details: { fontSize: 14, color: colors.textSecondary, marginTop: 2 },
  km: { fontSize: 14, color: colors.textSecondary, marginTop: spacing.sm },
  alertBox: {
    backgroundColor: colors.warningBg,
    borderRadius: radius.sm,
    paddingVertical: 6,
    paddingHorizontal: 10,
    marginTop: spacing.md,
    alignSelf: "flex-start",
  },
  alertText: { fontSize: 12, color: colors.warningText, fontWeight: "600" },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "600",
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.lg,
    paddingBottom: spacing.sm,
    color: colors.textPrimary,
  },
  list: { paddingHorizontal: spacing.xl, paddingBottom: 90 },
  recordCard: {
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    padding: 14,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  recordHeader: { flexDirection: "row", justifyContent: "space-between" },
  recordType: { fontSize: 15, fontWeight: "600" },
  recordDate: { fontSize: 13, color: colors.textMuted },
  recordDetails: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  recordNotes: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: spacing.xs,
    fontStyle: "italic",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: spacing.xxxl,
  },
  emptyText: { fontSize: 14, color: colors.textMuted, textAlign: "center" },
  button: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    paddingVertical: 14,
    alignItems: "center",
  },
  buttonText: { color: colors.white, fontSize: 16, fontWeight: "600" },
});