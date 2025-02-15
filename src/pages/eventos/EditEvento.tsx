import { useEffect, useState } from "react";
import { useForm } from "../../hooks/useForm";
import { InputField } from "../../components/InputField";
import { TextField } from "../../components/TextField";
import { OptionType, SelectField } from "../../components/SelectField";
import { FormValidation } from "../../types/useFormTypes";
import { toast } from "sonner";
import { GetEstado, GetEventoType } from "../../service/GetCatalogsInfo";
import { eventoInterface } from "../../types/eventoType";
import { useUIStore } from "../../stores/UIStore";
import { PatchEvento } from "../../service/EventosService";

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
  const initForm = {
    nombre: eventoData.nombre as string,
    descripcion: eventoData.descripcion as string,
    eventoTipoId: eventoData.eventoTipoId as string,
    fechaInicio: eventoData.fechaInicio as string, // Fecha y hora incluida
    fechaFin: eventoData.fechaFin as string, // Fecha y hora incluida
    estadoId: eventoData.estadoId as string, // Opcional, si no se envía se agrega en 1
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
  };
  const {
    formValues,
    formValidation,
    isFormValid,
    isFormSent,
    updateForm,
    sendForm,
    onChange,
  } = useForm(initForm, validations);
  const { nombre, descripcion, eventoTipoId, fechaInicio, fechaFin, estadoId } =
    formValues;
  const { nombreValid, eventoTipoIdValid, fechaInicioValid } = formValidation;

  const SetLoading = useUIStore((state) => state.SetLoading);

  const [CATEstados, setCATEstados] = useState<OptionType[]>([]);
  const [CATTipoEvento, setCATTipoEvento] = useState<OptionType[]>([]);
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
      const response = await PatchEvento(
        {
          nombre: nombre as string,
          descripcion: descripcion as string,
          estadoId: estadoId as string,
          eventoTipoId: eventoTipoId as string,
          fechaInicio: (fechaInicio as string).replace("T", " "),
          fechaFin: fechaFin
            ? (fechaFin as string).replace("T", " ")
            : undefined,
        },
        eventoData.id
      );
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
        if (response.errors) {
          response.errors.map((validacionError) => {
            toast.error(validacionError, { duration: 50000 });
          });
        }
      }
      toast.error("No se logró registar el evento");
      SetLoading(false);
    }
  };
  useEffect(() => {
    getCatalogs();
  }, []);

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
