import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';

import LoginScreen from '../screens/Login';
import VehicleListScreen from '../screens/VehicleList';
import VehicleDetailScreen from '../screens/VehicleDetail';
import MaintenanceFormScreen from '../screens/MaintenanceForm';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Entrar' }} />
        <Stack.Screen name="VehicleList" component={VehicleListScreen} options={{ title: 'Meus Veículos' }} />
        <Stack.Screen name="VehicleDetail" component={VehicleDetailScreen} options={{ title: 'Detalhes' }} />
        <Stack.Screen name="MaintenanceForm" component={MaintenanceFormScreen} options={{ title: 'Registrar Manutenção' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}