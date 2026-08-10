import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { vehicleSchema, VehicleFormData } from './schema';
import { RootStackParamList } from '../../navigation/types';

type VehicleFormNavigationProp = NativeStackNavigationProp<RootStackParamList, 'VehicleForm'>;

export default function VehicleFormScreen() {
  const navigation = useNavigation<VehicleFormNavigationProp>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<VehicleFormData>({
    resolver: zodResolver(vehicleSchema),
    defaultValues: { nickname: '', brand: '', model: '', year: '', currentKm: '' },
  });

  const onSubmit = async (data: VehicleFormData) => {
    setIsSubmitting(true);
    try {
      // substituir por chamada real à API quando o backend existir
      console.log('Novo veículo:', {
        ...data,
        year: Number(data.year),
        currentKm: Number(data.currentKm),
      });
      await new Promise((resolve) => setTimeout(resolve, 600));

      navigation.goBack();
    } catch (error) {
      console.error('Erro ao cadastrar veículo:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.scroll}>
        <Field
          label="Apelido do veículo"
          name="nickname"
          control={control}
          error={errors.nickname?.message}
          placeholder="Ex: Carro do João"
        />
        <Field
          label="Marca"
          name="brand"
          control={control}
          error={errors.brand?.message}
          placeholder="Ex: Volkswagen"
        />
        <Field
          label="Modelo"
          name="model"
          control={control}
          error={errors.model?.message}
          placeholder="Ex: Gol"
        />
        <Field
          label="Ano"
          name="year"
          control={control}
          error={errors.year?.message}
          placeholder="Ex: 2019"
          keyboardType="numeric"
        />
        <Field
          label="Quilometragem atual"
          name="currentKm"
          control={control}
          error={errors.currentKm?.message}
          placeholder="Ex: 48200"
          keyboardType="numeric"
        />

        <TouchableOpacity
          style={[styles.button, isSubmitting && styles.buttonDisabled]}
          onPress={handleSubmit(onSubmit)}
          disabled={isSubmitting}
        >
          <Text style={styles.buttonText}>{isSubmitting ? 'Salvando...' : 'Salvar veículo'}</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

type FieldProps = {
  label: string;
  name: keyof VehicleFormData;
  control: any;
  error?: string;
  placeholder?: string;
  keyboardType?: 'default' | 'numeric';
};

function Field({ label, name, control, error, placeholder, keyboardType = 'default' }: FieldProps) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[styles.input, error && styles.inputError]}
            placeholder={placeholder}
            keyboardType={keyboardType}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scroll: { padding: 20 },
  field: { marginBottom: 16 },
  label: { fontSize: 14, fontWeight: '600', marginBottom: 6, color: '#333' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
  },
  inputError: { borderColor: '#e53935' },
  errorText: { color: '#e53935', fontSize: 12, marginTop: 4 },
  button: {
    backgroundColor: '#1a73e8',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonDisabled: { opacity: 0.6 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});