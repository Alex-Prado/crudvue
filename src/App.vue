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
import { apiUrl, contact, dataload, clear } from "./hooks/Apiurl";

const modal = ref(false);
const datos = ref([]);

const api = ref("http://localhost/APPCRUD/controller/Contacto.controller.php");

const estadomodal = (data) => {
  data ? (dataload(data), openmodal()) : (clear(), closemodal());
};
const openmodal = () => {
  modal.value = true;
};
const closemodal = () => {
  modal.value = false;
};
const addcontact = async (data, type) => {
  apiUrl(api.value, type, false, false, data).then((data) => {
    list();
    clear();
    closemodal();
  });
};

const btndelete = async (id) => {
  apiUrl(api.value, "delete", false, { key: "id", value: id }).then((data) => {
    list();
  });
};

const list = async () => {
  apiUrl(api.value, "list").then((data) => (datos.value = data));
};

list();
const clase = computed(() => {
  return modal.value ? "active" : null;
});
</script>

<style>
@import url("./assets/style.css");
</style>
