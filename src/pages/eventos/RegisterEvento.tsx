import { useEffect, useState } from "react";
import { useForm } from "../../hooks/useForm";
import { InputField } from "../../components/InputField";
import { TextField } from "../../components/TextField";
import { OptionType, SelectField } from "../../components/SelectField";
import { FormValidation, FormValues } from "../../types/useFormTypes";
import { toast } from "sonner";
import { GetEstado, GetEventoType } from "../../service/GetCatalogsInfo";
import { PostEvento } from "../../service/EventosService";
import { useUIStore } from "../../stores/UIStore";
import { useSessionStore } from "../../stores";
import { eventoPostInterface } from "../../types/eventoType";

type RegisterEventoProps = {
  closeModal: () => void;
  update: () => void;
};
const initGrupoStatus = [{ correoIntegrante: "" }];

export const RegisterEvento = ({ closeModal, update }: RegisterEventoProps) => {
  const initForm = {
    nombre: "",
    descripcion: "",
    eventoTipoId: "",
    fechaInicio: "", // Fecha y hora incluida
    fechaFin: "", // Fecha y hora incluida
    estadoId: "", // Opcional, si no se envía se agrega en 1
    agregarGrupo: "0", // Opcional y para lógica de frontend 0 false y 1 true
    eventoGrupo: initGrupoStatus,
  };
  // Validaciones de formulario
  const formValidations: FormValidation = {
    nombre: [
      (value) => value.length > 0,
      "Favor, ingrese el nombre del evento",
    ],
    eventoTipoId: [
      (value) => value.length > 0,
      "Favor, seleccione el tipo de evento",
    ],
    fechaInicio: [
      (value) => value.length > 0,
      "Favor, ingrese la fecha y hora de inicio",
    ],
    agregarGrupo: [
      (value) => value === "0" || value === "1",
      "Favor, seleccione si quiere o no crear un grupo",
    ],
  };
  const {
    formValues,
    formValidation,
    isFormValid,
    isFormSent,
    updateForm,
    sendForm,
    onChange,
    onChangeMultiNested,
  } = useForm(initForm, formValidations);
  const {
    nombre,
    descripcion,
    eventoTipoId,
    fechaInicio,
    fechaFin,
    estadoId,
    agregarGrupo,
    eventoGrupo,
  } = formValues;
  const {
    nombreValid,
    eventoTipoIdValid,
    fechaInicioValid,
    agregarGrupoValid,
  } = formValidation;

  // Loader
  const SetLoading = useUIStore((state) => state.SetLoading);
  const onLogout = useSessionStore((state) => state.onLogout);

  const [CATEstados, setCATEstados] = useState<OptionType[]>([]);
  const [CATTipoEvento, setCATTipoEvento] = useState<OptionType[]>([]);

  const getCatalogs = async () => {
    // TODO Consumir los catálogos
    SetLoading(true);
    const EstadosPromise = GetEstado();
    const TiposEventoPromise = GetEventoType();
    Promise.all([EstadosPromise, TiposEventoPromise])
      .then((responses) => {
        // Adaptando cada catalogo a options de select
        const EstadosBackendCat = responses[0];
        if (EstadosBackendCat) {
          if (EstadosBackendCat.data) {
            const { data } = EstadosBackendCat.data;
            if (data) {
              const { Estados } = data;
              const CatEstados: OptionType[] = [];
              // console.log(Estados);
              Estados?.map((Estado) => {
                if (Estado.id != "1" && Estado.id != "2") {
                  CatEstados.push({
                    value: Estado.id,
                    name: Estado.nombre,
                  });
                }
              });
              setCATEstados(CatEstados);
            }
          }
        }
        const TiposEventosCat = responses[1];
        if (TiposEventosCat) {
          if (TiposEventosCat.data) {
            const { data } = TiposEventosCat.data;
            if (data) {
              const { EventoTipos } = data;
              const CatTiposEventos = EventoTipos?.map((tipoEvento) => {
                return {
                  value: tipoEvento.id,
                  name: tipoEvento.nombre,
                };
              });
              setCATTipoEvento(CatTiposEventos);
            }
          }
        }
      })
      .catch((error) => {
        console.log(error);
        toast.info(
          "No se logró obtener los catálogos para el registro, por favor recargue la página"
        );
      })
      .finally(() => SetLoading(false));
  };
  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    sendForm();
    if (isFormValid) {
      // Si todo sale bien
      SetLoading(true);
      const payload: eventoPostInterface = {
        nombre: nombre as string,
        descripcion: descripcion as string,
        estadoId: estadoId as string,
        eventoTipoId: eventoTipoId as string,
        fechaInicio: (fechaInicio as string).replace("T", " "),
        eventoGrupo: [],
        fechaFin:
          (fechaFin as string).length > 0
            ? (fechaFin as string).replace("T", " ")
            : undefined,
      };
      let integrantesValidos = true;
      if (agregarGrupo === "1") {
        // Consiguiendo valores de grupo
        (eventoGrupo as FormValues[]).map((Integrante, i) => {
          if (
            (Integrante.correoIntegrante as string).length > 0 &&
            (Integrante.correoIntegrante as string).includes("@unica.edu.ni") &&
            payload.eventoGrupo
          ) {
            payload.eventoGrupo.push(Integrante.correoIntegrante as string);
          } else {
            toast.info(
              `El integrante ${
                i + 1
              } no es válido, debe ingresar un correo institucional`
            );
            integrantesValidos = false;
            return;
          }
        });
      }
      if (!integrantesValidos) {
        SetLoading(false);
        return;
      }
      const response = await PostEvento(payload);
      // console.log(response);
      if (response.ok) {
        // Eliminando toasts
        toast.dismiss();
        // Agregando toast de éxito
        toast.success("Evento creado exitósamente");
        // TODO Redirigiendo a página de evento
        updateForm(initForm);
        closeModal();
        SetLoading(false);
        // Actualizando eventos
        update();
        return;
      }
      // ! Agregando cierre de sesión al enviar token vencido
      if (response.status === 401) {
        toast.error("La sesión no es válida");
        onLogout();
        return;
      }
      if (response.errors) {
        response.errors.map((validacionError) => {
          toast.error(validacionError, { duration: 50000 });
        });
      }
      toast.error("No se logró registar el evento");
      SetLoading(false);
    }
  };
  // Obteniendo catálogos iniciales
  useEffect(() => {
    getCatalogs();
  }, []);
  // En caso de no agregar un grupo se reestablecen los campos a sus datos iniciales
  useEffect(() => {
    if (agregarGrupo === "0") {
      updateForm({ ...formValues, eventoGrupo: initGrupoStatus });
    }
  }, [agregarGrupo]);

  return (
    <>
      <h1 className="font-leagueGothic text-2xl md:text-4xl">
        Registrar nuevo evento
      </h1>
      <button
        onClick={() => closeModal()}
        className="absolute right-6 top-4 opacity-70 transition-all duration-150 hover:opacity-100"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8"
          viewBox="0 -960 960 960"
        >
          <path d="M480-424 284-228q-11 11-28 11t-28-11q-11-11-11-28t11-28l196-196-196-196q-11-11-11-28t11-28q11-11 28-11t28 11l196 196 196-196q11-11 28-11t28 11q11 11 11 28t-11 28L536-480l196 196q11 11 11 28t-11 28q-11 11-28 11t-28-11L480-424Z" />
        </svg>
      </button>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col md:grid md:grid-cols-2 gap-2"
      >
        <div>
          <label htmlFor="nombre">
            <p className="text-sm font-bold">
              Nombre <span>*</span>
            </p>
            <InputField
              id="nombre"
              name="nombre"
              cx="w-full"
              placeholder="Nombre de evento"
              value={nombre as string}
              onChange={onChange}
              required
            />
            {isFormSent && <span className="text-red-500">{nombreValid}</span>}
          </label>
        </div>
        <div>
          <label htmlFor="eventoTipoId">
            <p className="text-sm font-bold">
              Tipo de evento <span>*</span>
            </p>
            <SelectField
              id="eventoTipoId"
              name="eventoTipoId"
              options={CATTipoEvento}
              cx="w-full"
              selectMessage="Seleccione un tipo de evento"
              value={eventoTipoId as string}
              onChange={onChange}
              required
            />
            {isFormSent && (
              <span className="text-red-500">{eventoTipoIdValid}</span>
            )}
          </label>
        </div>
        <div className="col-span-2">
          <label htmlFor="descripcion">
            <p className="text-sm font-bold">
              Descipción <span>*</span>
            </p>

            <TextField
              id="descripcion"
              name="descripcion"
              cx="w-full"
              rows={5}
              placeholder="Descripción de evento"
              value={descripcion as string}
              onChange={onChange}
              required
            />
          </label>
        </div>
        <div>
          <label htmlFor="fechaInicio">
            <p className="text-sm font-bold">
              Fecha y hora de inicio <span>*</span>
            </p>
            <InputField
              id="fechaInicio"
              name="fechaInicio"
              cx="w-full"
              type="datetime-local"
              value={fechaInicio as string}
              onChange={onChange}
              required
            />
            {isFormSent && (
              <span className="text-red-500">{fechaInicioValid}</span>
            )}
          </label>
        </div>
        <div>
          <label htmlFor="fechaFin">
            <p className="text-sm font-bold">Fecha y hora finalización</p>
            <InputField
              id="fechaFin"
              name="fechaFin"
              cx="w-full"
              type="datetime-local"
              value={fechaFin as string}
              onChange={onChange}
            />
          </label>
        </div>
        <div>
          <label htmlFor="estadoId">
            <p className="text-sm font-bold">
              Estado de evento <span>*</span>
            </p>
            <SelectField
              id="estadoId"
              name="estadoId"
              options={CATEstados}
              cx="w-full"
              selectMessage="Seleccione una opción"
              value={estadoId as string}
              onChange={onChange}
              required
            />
            {isFormSent && (
              <span className="text-red-500">{eventoTipoIdValid}</span>
            )}
          </label>
        </div>
        <div>
          <label htmlFor="agregarGrupo">
            <p className="text-sm font-bold">
              ¿Crear grupo para este evento?<span>*</span>
            </p>

            <SelectField
              id="agregarGrupo"
              name="agregarGrupo"
              options={[
                { value: "0", name: "No" },
                { value: "1", name: "Si" },
              ]}
              cx="w-full"
              selectMessage="Seleccione una opción"
              value={agregarGrupo as string}
              onChange={onChange}
              required
            />
            {isFormSent && (
              <span className="text-red-500">{agregarGrupoValid}</span>
            )}
          </label>
        </div>
        {/* Grupo de evento */}
        {agregarGrupo === "1" && (
          <div className="col-span-2 bg-slate-50 rounded p-2">
            <p className="font-bold">Grupo de evento</p>
            <span>
              Todos los integrantes podrán consultar y editar la información de
              este evento, incluyendo la asistencia del mismo.
            </span>
            {Array.isArray(formValues.eventoGrupo) &&
              formValues.eventoGrupo.every(
                (item) => typeof item === "object"
              ) &&
              formValues.eventoGrupo.map((eventoGrupo, i) => (
                <div key={`integrante${i}`}>
                  <label htmlFor={`eventoGrupo.${i}.correoIntegrante`}>
                    <p className="text-sm font-bold">
                      Correo integrante {i + 1}
                      <span>*</span>
                    </p>
                    <InputField
                      id={`eventoGrupo.${i}.correoIntegrante`}
                      name={`eventoGrupo.${i}.correoIntegrante`}
                      cx="w-full"
                      placeholder="Correo integrante"
                      value={eventoGrupo.correoIntegrante as string}
                      onChange={onChangeMultiNested}
                      required
                    />
                  </label>
                  {/* Separador, sólo se activa si no es la última posición */}
                  <hr
                    className={`my-4 md:my-1  ${
                      (formValues.eventoGrupo as FormValues[]).length - 1 ===
                        i && "hidden"
                    }`}
                  />
                </div>
              ))}

            <div className="my-2 w-full flex justify-start gap-2">
              <button
                onClick={() => {
                  // Haciendo una copia de la comision
                  const tempEnventoGrupo = [
                    ...(formValues.eventoGrupo as FormValues[]),
                  ];
                  // Si se tiene más de un registro se elimina el último
                  if (tempEnventoGrupo.length > 1) {
                    // Eliminando el último registro
                    tempEnventoGrupo.pop();
                    // Actualizando el formulario
                    updateForm({
                      ...formValues,
                      eventoGrupo: tempEnventoGrupo,
                    });
                  }
                }}
                type="button"
                className="border bg-white border-black rounded px-4 py-1 transition-all duration-200 hover:bg-black hover:text-white"
              >
                Eliminar integrantes
              </button>
              <button
                onClick={() => {
                  // Haciendo una copia de la comision
                  const tempEnventoGrupo = [
                    ...(formValues.eventoGrupo as FormValues[]),
                  ];
                  // Agregando un nuevo registro por defecto con rol colaborador
                  tempEnventoGrupo.push({ correoIntegrante: "" });
                  // Actualizando el formulario
                  updateForm({ ...formValues, eventoGrupo: tempEnventoGrupo });
                }}
                type="button"
                className="border bg-white border-black rounded px-4 py-1 transition-all duration-200 hover:bg-black hover:text-white"
              >
                Añadir integrantes
              </button>
            </div>
          </div>
        )}
        <div className="md:col-span-2 flex justify-around">
          <button
            onClick={() => updateForm(initForm)}
            className="text-blueDark bg-white border w-20 py-1 rounded shadow"
          >
            Limpiar
          </button>
          <button
            type="submit"
            className="bg-blueDark text-white w-20 py-1 rounded shadow"
          >
            Guardar
          </button>
        </div>
      </form>
    </>
  );
};
