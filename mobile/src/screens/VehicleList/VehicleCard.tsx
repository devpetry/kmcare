import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { Vehicle } from "../../types/vehicle";
import { colors, spacing, radius } from "../../theme";

type Props = {
  vehicle: Vehicle;
  onPress: () => void;
};

export default function VehicleCard({ vehicle, onPress }: Props) {
  const hasAlert = !!vehicle.nextMaintenance;

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.header}>
        <Text style={styles.nickname}>{vehicle.nickname}</Text>
        <Text style={styles.km}>
          {vehicle.currentKm.toLocaleString("pt-BR")} km
        </Text>
      </View>

      <Text style={styles.details}>
        {vehicle.brand} {vehicle.model} • {vehicle.year}
      </Text>

      {hasAlert && (
        <View style={styles.alertBox}>
          <Text style={styles.alertText}>
            {vehicle.nextMaintenance!.typeName} em{" "}
            {vehicle.nextMaintenance!.dueInKm
              ? `${vehicle.nextMaintenance!.dueInKm} km`
              : `${vehicle.nextMaintenance!.dueInDays} dias`}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: radius.xl,
    padding: spacing.lg,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  nickname: { fontSize: 17, fontWeight: "600" },
  km: { fontSize: 14, color: colors.textSecondary },
  details: { fontSize: 14, color: colors.textSecondary, marginTop: spacing.xs },
  alertBox: {
    backgroundColor: colors.warningBg,
    borderRadius: radius.sm,
    paddingVertical: 6,
    paddingHorizontal: 10,
    marginTop: spacing.md,
    alignSelf: "flex-start",
  },
  alertText: { fontSize: 12, color: colors.warningText, fontWeight: "600" },
});