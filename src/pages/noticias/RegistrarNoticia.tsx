import { useEffect, useState } from "react";
import { InputField } from "../../components/InputField";
import { SelectField } from "../../components/SelectField";
import { useForm } from "../../hooks/useForm";
import { TagsField } from "../../components/TagsField";
import { RichTextEditor } from "../../components/RichText/RichText";
import { toast } from "sonner";
import { noticiaInterface } from "../../types/noticiaType";

export const RegistrarNoticia = () => {
  const initForm = {
    titulo: "",
    mensaje: "",
    severidadId: "", // 1: Baja, 2: Media, 3:Alta
    categoria: "", // Id de categoría de noticia
    fechaDePublicacion: "",
    fechaDeExpiracion: "",
    etiquetas: "", // Un solo string separado por guión bajo
    publico: "", // Array de IDs de perfiles que pueden ver la noticia
    estadoId: "", // 1: Activa, 2: Inactiva
  };
  const {
    formValues,
    formValidation,
    isFormSent,
    isFormValid,
    onChange,
    updateForm,
  } = useForm(initForm);
  const {
    titulo,
    mensaje,
    severidadId,
    categoria,
    fechaDePublicacion,
    fechaDeExpiracion,
    etiquetas,
    estadoId,
    publico,
  } = formValues;
  const {
    tituloValid,
    mensajeValid,
    severidadIdValid,
    categoriaValid,
    fechaDePublicacionValid,
    fechaDeExpiracionValid,
    estadoIdValid,
    publicoIdValid,
  } = formValidation;
  //   Publicos objetivos
  const [estudiante, setEstudiante] = useState(false);
  const [docente, setDocente] = useState(false);
  const [administrativo, setAdministrativo] = useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid) {
      // Caso positivo
      // Armando datos finales
      const newNoticia: noticiaInterface = {
        categoria: categoria as string,
        estadoId: estadoId as "1" | "2",
        fechaDePublicacion: fechaDePublicacion as string,
        fechaDeExpiracion: fechaDeExpiracion as string,
        etiquetas: etiquetas as string,
        mensaje: mensaje as string,
        publico: publico as string,
        severidadId: severidadId as "1" | "2" | "3",
        titulo: titulo as string,
      };
      console.log(newNoticia);
      // TODO Enviar a backend para registrar noticia
    } else {
      if (mensajeValid) {
        toast.info("Por favor, ingrese el mensaje de la noticia.");
      }
      if (publicoIdValid) {
        toast.info(
          "Por favor, seleccione el público objetivo para la noticia."
        );
      }
    }
  };
  const clearForm = () => {
    updateForm(initForm);
    setDocente(false);
    setAdministrativo(false);
    setEstudiante(false);
  };
  const ChoosePublic = () => {
    let tempPublico: string = "";
    if (estudiante) {
      tempPublico += "1,";
    } else {
      tempPublico.replace("1,", "");
    }
    if (docente) {
      tempPublico += "2,";
    } else {
      tempPublico.replace("2,", "");
    }
    if (administrativo) {
      tempPublico += "3,";
    } else {
      tempPublico.replace("1,", "");
    }
    // Eliminando última coma
    if (tempPublico.length > 0) {
      tempPublico = tempPublico.slice(0, -1);
    }
    updateForm({ ...formValues, publico: tempPublico });
  };
  useEffect(() => {
    console.log(formValues);
  }, [formValues]);
  useEffect(() => {
    ChoosePublic();
  }, [estudiante, docente, administrativo]);
  // useEffect(() => {
  //   // Esto es en html
  //   console.log(mensajeNoticia);
  // }, [mensajeNoticia]);

  return (
    <div className="bg-white p-2 rounded">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col md:grid md:grid-cols-2 gap-2 p-1 text-black"
      >
        <div>
          <label htmlFor="titulo">
            <p className="text-sm font-bold">
              Título de noticia <span>*</span>
            </p>
            <InputField
              id="titulo"
              name="titulo"
              cx="w-full"
              placeholder="Título de noticia"
              value={titulo as string}
              onChange={onChange}
              required
            />
            {isFormSent && <span className="text-red-500">{tituloValid}</span>}
          </label>
        </div>
        <div>
          <label htmlFor="severidadId">
            <p className="text-sm font-bold">
              Severidad de noticia<span>*</span>
            </p>
            <SelectField
              id="severidadId"
              name="severidadId"
              options={[
                { value: "1", name: "Baja" },
                { value: "2", name: "Media" },
                { value: "1", name: "Alta" },
              ]}
              cx="w-full"
              selectMessage="Seleccione una severidad para la noticia"
              value={severidadId as string}
              onChange={onChange}
              required
            />
            {isFormSent && (
              <span className="text-red-500">{severidadIdValid}</span>
            )}
          </label>
        </div>
        <div className="col-span-2 flex flex-col py-2">
          <p className="text-sm font-bold">
            Mensaje de noticia <span>*</span>
          </p>
          <div className="min-h-64 overflow-auto">
            <RichTextEditor
              value={mensaje as string}
              onChange={(value) =>
                updateForm({ ...formValues, mensaje: value })
              }
            />
          </div>
        </div>

        <div className="col-span-2">
          <p className="text-sm font-bold">Etiquetas</p>
          <div>
            <TagsField
              onTagsChange={(tags) => {
                let newTags = "";
                tags.map((tag) => {
                  newTags += tag.id + ",";
                });
                updateForm({ ...formValues, etiquetas: newTags });
              }}
            />
          </div>
        </div>
        <div>
          <label htmlFor="categoria">
            <p className="text-sm font-bold">
              Categoría de noticia<span>*</span>
            </p>
            <SelectField
              id="categoria"
              name="categoria"
              options={[{ value: "1", name: "Entretenimiento" }]}
              cx="w-full"
              selectMessage="Seleccione una categoría para la noticia"
              value={categoria as string}
              onChange={onChange}
              required
            />
            {isFormSent && (
              <span className="text-red-500">{categoriaValid}</span>
            )}
          </label>
        </div>
        <div>
          <label htmlFor="estadoId">
            <p className="text-sm font-bold">
              Estado de noticia<span>*</span>
            </p>
            <SelectField
              id="estadoId"
              name="estadoId"
              options={[
                { value: "1", name: "Activa" },
                { value: "2", name: "Inactiva" },
              ]}
              cx="w-full"
              selectMessage="Seleccione una categoría para la noticia"
              value={estadoId as string}
              onChange={onChange}
              required
            />
            {isFormSent && (
              <span className="text-red-500">{estadoIdValid}</span>
            )}
          </label>
        </div>
        <div className="col-span-2 p">
          <p className="text-sm font-bold">Público objetivo</p>
          <div className="flex gap-2 flex-wrap">
            <div className="flex gap-4">
              <label
                className="flex gap-2 rounded bg-BlueLight text-white px-2 py-1"
                htmlFor="estudiantes"
              >
                <p className="select-none">Estudiantes</p>
                <input
                  checked={estudiante}
                  onChange={(e) => setEstudiante(e.target.checked)}
                  id="estudiantes"
                  type="checkbox"
                />
              </label>
            </div>
            <div className="flex flex-wrap gap-4">
              <label
                className="flex gap-2 rounded bg-BlueLight text-white px-2 py-1"
                htmlFor="docentes"
              >
                <p className="select-none">Docentes</p>
                <input
                  checked={docente}
                  onChange={(e) => setDocente(e.target.checked)}
                  id="docentes"
                  type="checkbox"
                />
              </label>
            </div>
            <div className="flex gap-4">
              <label
                className="flex gap-2 rounded bg-BlueLight text-white px-2 py-1"
                htmlFor="administrativos"
              >
                <p className="select-none">Administrativos</p>
                <input
                  checked={administrativo}
                  onChange={(e) => setAdministrativo(e.target.checked)}
                  id="administrativos"
                  type="checkbox"
                />
              </label>
            </div>
          </div>
        </div>
        <div>
          <label htmlFor="fechaDePublicacion">
            <p className="text-sm font-bold">
              Fecha de publicación <span>*</span>
            </p>
            <InputField
              id="fechaDePublicacion"
              name="fechaDePublicacion"
              cx="w-full"
              type="date"
              placeholder="Fecha de inicio de anuncio"
              value={fechaDePublicacion as string}
              onChange={onChange}
              required
            />
            {isFormSent && (
              <span className="text-red-500">{fechaDePublicacionValid}</span>
            )}
          </label>
        </div>
        <div>
          <label htmlFor="fechaDeExpiracion">
            <p className="text-sm font-bold">
              Fecha de expiracion <span>*</span>
            </p>
            <InputField
              id="fechaDeExpiracion"
              name="fechaDeExpiracion"
              cx="w-full"
              type="date"
              placeholder="Fecha de cierre de anuncio"
              value={fechaDeExpiracion as string}
              onChange={onChange}
              required
            />
            {isFormSent && (
              <span className="text-red-500">{fechaDeExpiracionValid}</span>
            )}
          </label>
        </div>
        <div className="md:col-span-2 flex justify-around">
          <button
            onClick={() => clearForm()}
            type="button"
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
    </div>
  );
};
