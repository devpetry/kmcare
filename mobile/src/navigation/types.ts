export type RootStackParamList = {
  Login: undefined;
  VehicleList: undefined;
  VehicleDetail: { vehicleId: string };
  VehicleForm: undefined;          // <- nova tela
  MaintenanceForm: { vehicleId: string; maintenanceTypeId?: string };
};