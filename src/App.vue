<template>
  <section>
    <button class="add" @click="openmodal">ADD</button>
    <div class="container">
      <Card @estadomodal="estadomodal" @btndelete="btndelete" :datos="datos" />
    </div>
  </section>
  <Modal
    @estadomodal="estadomodal"
    @addcontact="addcontact"
    :clase="clase"
    :contact="contact"
  />
</template>

<script setup>
import { computed, ref } from "@vue/runtime-core";

import Card from "./components/Card.vue";
import Modal from "./components/Modal.vue";

const estado = ref(false);
const datos = ref([]);
const contact = ref({
  id: null,
  nombre: "",
  apellido: "",
  telefono: "",
});
const url = ref("http://localhost/APPCRUD/controller/Contacto.controller.php");

const apiUrl = async (
  urls,
  action,
  json = true,
  body = false,
  element = false
) => {
  let formdata = null;
  if (body) {
    formdata = new FormData(body);
  } else {
    formdata = new FormData();
    if (element) {
      formdata.append(element.key, element.value);
    }
  }
  formdata.append("action", action);
  const data = await fetch(urls, {
    method: "POST",
    body: formdata,
  });
  const dato = await (json ? data.json() : data.text());
  return dato;
};

const estadomodal = (data) => {
  data ? (dataload(data), openmodal()) : (clear(), closemodal());
};
const openmodal = () => {
  estado.value = true;
};
const closemodal = () => {
  estado.value = false;
};
const addcontact = async (data, type, id = false) => {
  apiUrl(url.value, type, false, data, { key: "id", value: id }).then(
    (data) => {
      list();
      clear();
      closemodal();
    }
  );
};

const btndelete = async (id) => {
  apiUrl(url.value, "delete", false, false, { key: "id", value: id }).then(
    (data) => {
      list();
    }
  );

  list();
};

const list = async () => {
  apiUrl(url.value, "list").then((data) => (datos.value = data));
};
const dataload = (data) => {
  contact.value.id = data.idcontacto;
  contact.value.nombre = data.nombre;
  contact.value.apellido = data.apellido;
  contact.value.telefono = data.telefono;
};
list();
const clear = () => {
  contact.value.id = null;
  contact.value.nombre = "";
  contact.value.apellido = "";
  contact.value.telefono = "";
};
const clase = computed(() => {
  return estado.value ? "active" : null;
});
</script>

<style>
@import url("./assets/style.css");
</style>
