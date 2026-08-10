export type RootStackParamList = {
  Login: undefined;
  VehicleList: undefined;
  VehicleDetail: { vehicleId: string };
  MaintenanceForm: { vehicleId: string; maintenanceTypeId?: string };
};