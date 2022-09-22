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
  const formdata = new FormData(data);
  formdata.append("action", type);
  if (id) {
    formdata.append("id", id);
  }
  const dato = await fetch(url.value, {
    method: "POST",
    body: formdata,
  });
  const resp = await dato.text();
  console.log(resp);
  list();
};

const btndelete = async (id) => {
  const formdata = new FormData();
  formdata.append("action", "delete");
  formdata.append("id", id);
  const data = await fetch(url.value, {
    method: "POST",
    body: formdata,
  });
  const dato = await data.text();
  console.log(dato);
  list();
};

const list = async () => {
  const formdata = new FormData();
  formdata.append("action", "list");
  const data = await fetch(url.value, {
    method: "POST",
    body: formdata,
  });
  const dato = await data.json();
  datos.value = dato;
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
@import url("https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap");
@import url("https://kit-pro.fontawesome.com/releases/v6.1.1/css/pro.min.css");
@import url("./assets/components/card.css");
@import url("./assets/components/modal.css");
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Quicksand", sans-serif;
}
section {
  width: min(96%, 1200px);
  margin: auto;
}

.add {
  border: none;
  outline: none;
  padding: 10px 0;
  width: 120px;
  background-color: darkmagenta;
  color: #fff;
  margin: 1rem 0;
  cursor: pointer;
}
.container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 15px;
}
@media (max-width: 850px) {
  .container {
    grid-template-columns: repeat(3, 1fr);
  }
}
@media (max-width: 670px) {
  .container {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 430px) {
  .container {
    grid-template-columns: repeat(1, 1fr);
  }
}
</style>
