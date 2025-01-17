import { produce, Draft } from "immer";
import { useEffect, useMemo, useState } from "react";
import type {
  FieldValidated,
  FormValidation,
  FormValues,
} from "../types/useFormTypes";

export const useForm = (
  initialForm: FormValues,
  formValidations?: FormValidation
) => {
  // Estado para manejar el estado del formulario
  const [formValues, setFormValues] = useState<FormValues>(initialForm);
  // Estado para manejar las validaciones ¡YA RESUELTAS!
  const [formValidation, setFormValidation] = useState<FieldValidated>({});
  const [isFormSent, setisFormSent] = useState<boolean>(false);
  useEffect(() => {
    createValidators();
  }, [formValues]);
  // *Este useMemo es para memorizar el valor de validación del formulario
  const isFormValid = useMemo(() => {
    for (const formValue of Object.keys(formValidation as object)) {
      if (formValidation[formValue]) return false;
    }
    return true;
  }, [formValidation]);
  // Manejar cambio de formulario
  const onChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormValues((prevValues) =>
      produce(prevValues, (draft: Draft<FormValues>) => {
        const keys = name.split("."); // Convierte "nombre.apellido" en ["nombre", "apellido"]
        let current: Draft<FormValues> = draft;

        keys.forEach((key, index) => {
          if (index === keys.length - 1) {
            // Última clave, asignar valor
            current[key] = value;
          } else {
            // Asegurar que current[key] es un objeto o array
            if (!(key in current) || typeof current[key] !== "object") {
              current[key] = {}; // Inicializa como objeto si no existe o no es objeto
            }
            current = current[key] as Draft<FormValues>; // Navega al siguiente nivel
          }
        });
      })
    );
  };
  //* Función para las validaciones
  const createValidators = () => {
    if (formValidations) {
      const formCheckedValues: FieldValidated = {};
      for (const formField of Object.keys(formValidations)) {
        const [fn, errorMessage = "Error de validación"] =
          formValidations[formField];
        formCheckedValues[`${formField}Valid`] = fn(
          formValues[formField] as string
        )
          ? null
          : errorMessage;
      }
      setFormValidation(formCheckedValues);
    }
  };

  const onChangeMultiNested = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormValues((prevValues) =>
      produce(prevValues, (draft: Draft<FormValues>) => {
        const keys = name.split(".");
        let current: Draft<FormValues> = draft;
        keys.forEach((key, index) => {
          if (index === keys.length - 1) {
            current[key] = value;
          } else {
            if (!(key in current) || typeof current[key] !== "object") {
              current[key] = {};
            }
            current = current[key] as Draft<FormValues>;
          }
        });
      })
    );
  };
  //   Actualizar toda la composición de un formulario
  const updateForm = (newForm: FormValues) => {
    setFormValues(newForm);
  };
  // Esto se utiliza para limpiar el formulario
  const resetForm = () => {
    setFormValues(initialForm);
  };
  // Esto se utiliza en las validaciones, sólo ocurre una vez por relleno de formulario
  const sendForm = () => {
    setisFormSent(true);
  };
  const updateSentForm = (newValue: boolean) => {
    setisFormSent(newValue);
  };
  return {
    formValues,
    isFormValid,
    formValidation,
    isFormSent,
    onChange,
    sendForm,
    onChangeMultiNested,
    updateForm,
    resetForm,
    updateSentForm,
  };
};
