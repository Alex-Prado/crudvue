<template>

  <div v-for="item in datos" class="card" :key="item.id">
    <p>
      {{ item.nombre }}
    </p>
    <p>
      {{ item.apellido }}
    </p>
    <p>
      {{ item.telefono }}
    </p>
    <div class="card-opt">
      <button class="edit" @click="BtnLoad(item)">EDIT</button>
      <button class="delete" @click="BtnDelet(item.idcontacto)">DELETE</button>
    </div>
  </div>

</template>

<script setup>
const emit = defineEmits(["estadomodal", "btndelete"]);
const props = defineProps({
  datos: Array,
});

const BtnDelet = (id) => {
  emit("btndelete", id);
};

const BtnLoad = (data) => {
  emit("estadomodal", data);
};
</script>
