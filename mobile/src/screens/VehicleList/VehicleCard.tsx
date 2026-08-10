import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { Vehicle } from '../../types/vehicle';

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
        <Text style={styles.km}>{vehicle.currentKm.toLocaleString('pt-BR')} km</Text>
      </View>

      <Text style={styles.details}>
        {vehicle.brand} {vehicle.model} • {vehicle.year}
      </Text>

      {hasAlert && (
        <View style={styles.alertBox}>
          <Text style={styles.alertText}>
            {vehicle.nextMaintenance!.typeName} em{' '}
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
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#eee',
  },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  nickname: { fontSize: 17, fontWeight: '600' },
  km: { fontSize: 14, color: '#666' },
  details: { fontSize: 14, color: '#666', marginTop: 4 },
  alertBox: {
    backgroundColor: '#fff3e0',
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 10,
    marginTop: 10,
    alignSelf: 'flex-start',
  },
  alertText: { fontSize: 12, color: '#e65100', fontWeight: '600' },
});