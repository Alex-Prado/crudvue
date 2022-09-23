import { ref } from "vue";

const estado = ref(true);
export const apiUrl = async (
  url,
  action,
  json = true,
  element = false,
  body = null
) => {
  if (estado.value) {
    estado.value = false;
    const formdata = new FormData((body ??= undefined));
    if (element) {
      formdata.append(element.key, element.value);
    }

    formdata.append("action", action);
    const data = await fetch(url, {
      method: "POST",
      body: formdata,
    });
    const dato = await (json ? data.json() : data.text());
    estado.value = true;
    return dato;
  }
};
export const contact = ref({
  id: null,
  nombre: "",
  apellido: "",
  telefono: "",
});

export const dataload = (data) => {
  contact.value.id = data.idcontacto;
  contact.value.nombre = data.nombre;
  contact.value.apellido = data.apellido;
  contact.value.telefono = data.telefono;
};

export const clear = () => {
  contact.value.id = null;
  contact.value.nombre = "";
  contact.value.apellido = "";
  contact.value.telefono = "";
};
