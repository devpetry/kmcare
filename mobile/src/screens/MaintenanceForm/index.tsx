import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { maintenanceSchema, MaintenanceFormData } from "./schema";
import { RootStackParamList } from "../../navigation/types";
import { mockMaintenanceTypes } from "../../services/mockData";
import { formatDateInput } from "./utils";

type MaintenanceFormNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "MaintenanceForm"
>;
type MaintenanceFormRouteProp = RouteProp<
  RootStackParamList,
  "MaintenanceForm"
>;

export default function MaintenanceFormScreen() {
  const navigation = useNavigation<MaintenanceFormNavigationProp>();
  const route = useRoute<MaintenanceFormRouteProp>();
  const { vehicleId } = route.params;

  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<MaintenanceFormData>({
    resolver: zodResolver(maintenanceSchema),
    defaultValues: {
      maintenanceTypeId: "",
      performedAt: "",
      kmAtService: "",
      cost: "",
      notes: "",
    },
  });

  const selectedTypeId = watch("maintenanceTypeId");

  const onSubmit = async (data: MaintenanceFormData) => {
    setIsSubmitting(true);
    try {
      // substituir por chamada real à API quando o backend existir
      console.log("Nova manutenção:", {
        vehicleId,
        ...data,
        kmAtService: Number(data.kmAtService),
        cost: data.cost ? Number(data.cost) : undefined,
      });
      await new Promise((resolve) => setTimeout(resolve, 600));

      navigation.goBack();
    } catch (error) {
      console.error("Erro ao registrar manutenção:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.label}>Tipo de manutenção</Text>
        <View style={styles.chipContainer}>
          {mockMaintenanceTypes.map((type) => (
            <TouchableOpacity
              key={type.id}
              style={[
                styles.chip,
                selectedTypeId === type.id && styles.chipSelected,
              ]}
              onPress={() =>
                setValue("maintenanceTypeId", type.id, { shouldValidate: true })
              }
            >
              <Text
                style={[
                  styles.chipText,
                  selectedTypeId === type.id && styles.chipTextSelected,
                ]}
              >
                {type.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        {errors.maintenanceTypeId && (
          <Text style={styles.errorText}>
            {errors.maintenanceTypeId.message}
          </Text>
        )}

        <View style={styles.field}>
          <Text style={styles.label}>Data</Text>
          <Controller
            control={control}
            name="performedAt"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[styles.input, errors.performedAt && styles.inputError]}
                placeholder="DD/MM/AAAA"
                keyboardType="numeric"
                maxLength={10}
                onBlur={onBlur}
                onChangeText={(text) => onChange(formatDateInput(text))}
                value={value}
              />
            )}
          />
          {errors.performedAt && (
            <Text style={styles.errorText}>{errors.performedAt.message}</Text>
          )}
        </View>
        <Field
          label="Quilometragem no momento"
          name="kmAtService"
          control={control}
          error={errors.kmAtService?.message}
          placeholder="Ex: 48200"
          keyboardType="numeric"
        />
        <Field
          label="Custo (opcional)"
          name="cost"
          control={control}
          error={errors.cost?.message}
          placeholder="Ex: 180.00"
          keyboardType="numeric"
        />
        <Field
          label="Observações (opcional)"
          name="notes"
          control={control}
          error={errors.notes?.message}
          placeholder="Ex: Óleo sintético 5W30"
        />

        <TouchableOpacity
          style={[styles.button, isSubmitting && styles.buttonDisabled]}
          onPress={handleSubmit(onSubmit)}
          disabled={isSubmitting}
        >
          <Text style={styles.buttonText}>
            {isSubmitting ? "Salvando..." : "Salvar manutenção"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

type FieldProps = {
  label: string;
  name: keyof MaintenanceFormData;
  control: any;
  error?: string;
  placeholder?: string;
  keyboardType?: "default" | "numeric";
};

function Field({
  label,
  name,
  control,
  error,
  placeholder,
  keyboardType = "default",
}: FieldProps) {
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
  container: { flex: 1, backgroundColor: "#fff" },
  scroll: { padding: 20 },
  field: { marginBottom: 16, marginTop: 16 },
  label: { fontSize: 14, fontWeight: "600", marginBottom: 6, color: "#333" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
  },
  inputError: { borderColor: "#e53935" },
  errorText: { color: "#e53935", fontSize: 12, marginTop: 4 },
  chipContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 8,
  },
  chip: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 14,
  },
  chipSelected: { backgroundColor: "#1a73e8", borderColor: "#1a73e8" },
  chipText: { fontSize: 13, color: "#333" },
  chipTextSelected: { color: "#fff", fontWeight: "600" },
  button: {
    backgroundColor: "#1a73e8",
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 24,
  },
  buttonDisabled: { opacity: 0.6 },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});
