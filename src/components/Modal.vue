<template>
  <div class="modal" :class="clase">
    <i class="fa-light fa-xmark-large close" @click="close"></i>
    <form @submit.prevent="agregar" class="form">
      <input type="text" name="id" style="display: none" v-model="contact.id" />
      <div class="form-content">
        <i class="fa-thin fa-user"></i>
        <input
          type="text"
          class="form-input"
          name="nombre"
          placeholder="Nombre"
          v-model="contact.nombre"
        />
      </div>
      <div class="form-content">
        <i class="fa-thin fa-user"></i>
        <input
          type="text"
          class="form-input"
          name="apellido"
          placeholder="Apellido"
          v-model="contact.apellido"
        />
      </div>
      <div class="form-content">
        <i class="fa-thin fa-phone"></i>
        <input
          type="text"
          class="form-input"
          name="telefono"
          v-model="contact.telefono"
          placeholder="Telefono"
        />
      </div>
      <div class="form-content">
        <button class="form-btn">
          <i class="fa-thin fa-user-plus"></i>
          ADD
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
const emit = defineEmits(["estadomodal", "addcontact"]);
const props = defineProps({
  clase: String,
  contact: Object,
});

const close = () => {
  emit("estadomodal", "");
};
const agregar = (e) => {
  props.contact.id
    ? emit("addcontact", e.target, "update")
    : emit("addcontact", e.target, "create");
};
</script>
