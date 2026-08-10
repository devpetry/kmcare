import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { mockVehicles, mockMaintenanceRecords } from '../../services/mockData';

type VehicleDetailNavigationProp = NativeStackNavigationProp<RootStackParamList, 'VehicleDetail'>;
type VehicleDetailRouteProp = RouteProp<RootStackParamList, 'VehicleDetail'>;

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
        <Text style={styles.km}>{vehicle.currentKm.toLocaleString('pt-BR')} km atuais</Text>

        {vehicle.nextMaintenance && (
          <View style={styles.alertBox}>
            <Text style={styles.alertText}>
              Próxima: {vehicle.nextMaintenance.typeName} em{' '}
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
          <Text style={styles.emptyText}>Nenhuma manutenção registrada ainda</Text>
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
                  {new Date(item.performedAt).toLocaleDateString('pt-BR')}
                </Text>
              </View>
              <Text style={styles.recordDetails}>
                {item.kmAtService.toLocaleString('pt-BR')} km
                {item.cost ? ` • R$ ${item.cost.toFixed(2)}` : ''}
              </Text>
              {item.notes && <Text style={styles.recordNotes}>{item.notes}</Text>}
            </View>
          )}
        />
      )}

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('MaintenanceForm', { vehicleId })}
      >
        <Text style={styles.buttonText}>Registrar manutenção</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f7f7f7' },
  header: { backgroundColor: '#fff', padding: 20, borderBottomWidth: 1, borderBottomColor: '#eee' },
  nickname: { fontSize: 22, fontWeight: 'bold' },
  details: { fontSize: 14, color: '#666', marginTop: 2 },
  km: { fontSize: 14, color: '#666', marginTop: 6 },
  alertBox: {
    backgroundColor: '#fff3e0',
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 10,
    marginTop: 10,
    alignSelf: 'flex-start',
  },
  alertText: { fontSize: 12, color: '#e65100', fontWeight: '600' },
  sectionTitle: { fontSize: 15, fontWeight: '600', paddingHorizontal: 20, paddingTop: 16, paddingBottom: 8, color: '#333' },
  list: { paddingHorizontal: 20, paddingBottom: 90 },
  recordCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#eee',
  },
  recordHeader: { flexDirection: 'row', justifyContent: 'space-between' },
  recordType: { fontSize: 15, fontWeight: '600' },
  recordDate: { fontSize: 13, color: '#999' },
  recordDetails: { fontSize: 13, color: '#666', marginTop: 4 },
  recordNotes: { fontSize: 12, color: '#999', marginTop: 4, fontStyle: 'italic' },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 32 },
  emptyText: { fontSize: 14, color: '#999', textAlign: 'center' },
  button: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#1a73e8',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});