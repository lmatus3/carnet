import { useEffect, useState } from "react";
import { useForm } from "../../hooks/useForm";
import { InputField } from "../../components/InputField";
import { TextField } from "../../components/TextField";
import { OptionType, SelectField } from "../../components/SelectField";
import { FormValidation, FormValues } from "../../types/useFormTypes";
import { toast } from "sonner";
import { GetEstado, GetEventoType } from "../../service/GetCatalogsInfo";
import { eventoInterface, eventoPatchInterface } from "../../types/eventoType";
import { useUIStore } from "../../stores/UIStore";
import { PatchEvento } from "../../service/EventosService";
import { validateResponseError } from "../../utils/validateResponseError";
import { useSessionStore } from "../../stores";
import { ChecklistCatalogo } from "../../components/Eventos/ChecklistCatalogo";

type EditEventoProps = {
  closeModal: () => void;
  eventoData: eventoInterface;
  update: () => void;
};

export const EditEvento = ({
  closeModal,
  eventoData,
  update,
}: EditEventoProps) => {
  const grupo = eventoData.EventoGrupo;
  let integrantesForm: FormValues[] = [];
  if (grupo && grupo.length > 0) {
    integrantesForm = grupo.map((integrante) => {
      return { correoIntegrante: integrante.miembro };
    });
    console.log(integrantesForm);
    // updateForm({
    //   ...formValues,
    //   agregarGrupo: "1",
    //   eventoGrupo: integrantesForm,
    // });
  }
  console.log(eventoData)
  const initForm = {
    nombre: eventoData.nombre as string,
    descripcion: eventoData.descripcion as string,
    eventoTipoId: eventoData.eventoTipoId as string,
    fechaInicio: eventoData.fechaInicio as string, // Fecha y hora incluida
    fechaFin: eventoData.fechaFin as string, // Fecha y hora incluida
    estadoId: eventoData.estadoId as string, // Opcional, si no se envía se agrega en 1
    agregarGrupo: integrantesForm.length > 0 ? "1" : "0", // Opcional y para lógica de frontend 0 false y 1 true
    eventoGrupo: integrantesForm,
    // TODO Obtener del backend el público objetivo
    // publicoObjetivo: (eventoData.EventoPublicoObjetivo as string).join(","),
  };
  // Validaciones de formulario
  const validations: FormValidation = {
    nombre: [
      (value) => value.length > 0,
      "Favor, ingrese el nombre del evento",
    ],
    estadoId: [
      (value) => value.length > 0,
      "Favor, seleccione el tipo de evento",
    ],
    fechaInicio: [
      (value) => value.length > 0,
      "Favor, ingrese la fecha y hora de inicio",
    ],
    publicoObjetivo: [
      (value) => value.length > 0,
      "Favor, seleccione el público objetivo",
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
  } = useForm(initForm, validations);
  const {
    nombre,
    descripcion,
    eventoTipoId,
    fechaInicio,
    fechaFin,
    estadoId,
    agregarGrupo,
    eventoGrupo,
    publicoObjetivo,
  } = formValues;
  const {
    nombreValid,
    eventoTipoIdValid,
    fechaInicioValid,
    agregarGrupoValid,
  } = formValidation;

  const SetLoading = useUIStore((state) => state.SetLoading);

  const [CATEstados, setCATEstados] = useState<OptionType[]>([]);
  const [CATTipoEvento, setCATTipoEvento] = useState<OptionType[]>([]);
  const onLogOut = useSessionStore((state) => state.onLogout);
  const getCatalogs = async () => {
    SetLoading(true);
    // TODO Consumir los catálogos
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
      .finally(() => SetLoading(false));
  };
  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    sendForm();
    if (isFormValid) {
      // Si todo sale bien
      SetLoading(true);
      const payload: eventoPatchInterface = {
        nombre: nombre as string,
        descripcion: descripcion as string,
        estadoId: estadoId as string,
        eventoTipoId: eventoTipoId as string,
        fechaInicio: (fechaInicio as string).replace("T", " "),
        fechaFin: fechaFin ? (fechaFin as string).replace("T", " ") : undefined,
        eventoGrupo: [],
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
      const response = await PatchEvento(payload, eventoData.id);
      if (response.ok) {
        toast.dismiss();
        toast.success("Evento actualizado exitósamente");
        // TODO Redirigiendo a página de evento
        updateForm(initForm);
        closeModal();
        SetLoading(false);
        update();
        return;
      } else {
        if (response.status == 401 || response.status == 403) {
          validateResponseError(response.status, onLogOut);
          SetLoading(false);
          return;
        }
        if (response.errors) {
          response.errors.map((validacionError) => {
            toast.error(validacionError, { duration: 50000 });
          });
        }
      }
      toast.error("No se logró actualizar el evento");
      SetLoading(false);
    }
  };
  useEffect(() => {
    getCatalogs();
  }, []);

  // En caso de no agregar un grupo se reestablecen los campos a sus datos iniciales
  useEffect(() => {
    if (agregarGrupo === "0") {
      updateForm({ ...formValues, eventoGrupo: [] });
    }
  }, [agregarGrupo]);
  useEffect(() => {
    console.log(formValues);
  }, [formValues]);

  return (
    <>
      <h1 className="font-leagueGothic text-2xl md:text-4xl">Editar evento</h1>
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
              Nombre <span>*</span> (Sólo lectura)
            </p>
            <InputField
              id="nombre"
              name="nombre"
              cx="w-full"
              placeholder="Nombre de evento"
              value={nombre as string}
              onChange={onChange}
              required
              readOnly
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
              Descipción<span>*</span>
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
        <ChecklistCatalogo
          containerClassName="col-span-2"
          catalogo={[
            { id: "1", nombre: "Maestras y maestros" },
            { id: "2", nombre: "Estudiantes" },
            { id: "3", nombre: "Personal Administrativo" },
            { id: "4", nombre: "Padres y madres de familia" },
            { id: "5", nombre: "Personal directivo" },
            { id: "6", nombre: "Población general" },
          ]}
          value={publicoObjetivo ? (publicoObjetivo as string).split(",") : []}
          onSelectionChange={(selectFields) => {
            updateForm({
              ...formValues,
              publicoObjetivo: selectFields.join(","),
            });
          }}
          titulo="Público objetivo del evento"
        />
        <div>
          <label htmlFor="estadoId">
            <p className="text-sm font-bold">Estado de evento</p>
            <SelectField
              id="estadoId"
              name="estadoId"
              options={CATEstados}
              cx="w-full"
              selectMessage="Seleccione una opción"
              value={estadoId as string}
              onChange={onChange}
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
            className="text-blueDark bg-white border w-28 py-1 rounded shadow"
          >
            Revertir
          </button>
          <button
            type="submit"
            className="bg-blueDark text-white w-28 py-1 rounded shadow"
          >
            Editar
          </button>
        </div>
      </form>
    </>
  );
};
