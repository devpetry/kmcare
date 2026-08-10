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
import { colors, spacing, radius } from "../../theme";

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
  container: { flex: 1, backgroundColor: colors.white },
  scroll: { padding: spacing.xl },
  field: { marginBottom: spacing.lg, marginTop: spacing.lg },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 6,
    color: colors.textPrimary,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: 14,
    paddingVertical: spacing.md,
    fontSize: 16,
  },
  inputError: { borderColor: colors.error },
  errorText: { color: colors.error, fontSize: 12, marginTop: spacing.xs },
  chipContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
  chip: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.pill,
    paddingVertical: spacing.sm,
    paddingHorizontal: 14,
  },
  chipSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  chipText: { fontSize: 13, color: colors.textPrimary },
  chipTextSelected: { color: colors.white, fontWeight: "600" },
  button: {
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: spacing.xxl,
  },
  buttonDisabled: { opacity: 0.6 },
  buttonText: { color: colors.white, fontSize: 16, fontWeight: "600" },
});
