<script setup>
import { onMounted, reactive } from "vue";
import { useGenreStore } from "@/stores/genre.js";
import { useBookStore } from "@/stores/book.js";
import router from "../../router";
const genreStore = useGenreStore();
const deletedItem = ref(null);
const deleteDialog = ref(false);
const createDialog = ref(false);
const editDialog = ref(false);
const newItem = ref({
  name: "",
  type: "",
});
const currentItem = ref(null);
const dialogType = ref("");
const openDeleteDialog = (item, type) => {
  deletedItem.value = item;
  deletedItem.value.type = type;
  deleteDialog.value = true;
};
const openCreateDialog = (type, itemType) => {
  dialogType.value = type;
  newItem.value.type = itemType;
  createDialog.value = true;
};
const openEditDialog = (item, itemType) => {
  currentItem.value = Object.assign({}, item);
  currentItem.value.type = itemType;
  editDialog.value = true;
};
const deleteItem = async () => {
  await genreStore.deleteItem(deletedItem.value);
  await genreStore.fetchAll();
  deleteDialog.value = false;
};
const createItem = async () => {
  await genreStore.createItem(newItem.value);
  await genreStore.fetchAll();
  newItem.value.name = "";
  createDialog.value = false;
};
const editItem = async () => {
  await genreStore.editItem(currentItem.value);
  currentItem.value = { name: "", type: "" };
  editDialog.value = false;
};
</script>

<template>
  <v-container>
    <v-sheet class="pa-4 rounded-lg">
      <v-table>
        <thead>
          <tr>
            <th class="text-left">Назва</th>
            <th class="text-right">
              <v-btn
                @click="openCreateDialog('жанру', 'genre')"
                size="x-small"
                icon="mdi-plus"
              ></v-btn>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="genre in genreStore.getGenres" :key="genre._id">
            <td>{{ genre.name }}</td>
            <td class="text-right">
              <v-btn
                size="x-small"
                @click="openEditDialog(genre, 'genre')"
                icon="mdi-pencil"
              ></v-btn>
              <v-btn
                size="x-small"
                @click="openDeleteDialog(genre, 'genre')"
                class="ml-2"
                icon="mdi-trash-can"
              >
              </v-btn>
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-sheet>
    <v-sheet class="pa-4 mt-4 rounded-lg">
      <v-table>
        <thead>
          <tr>
            <th class="text-left">Назва</th>
            <th class="text-right">
              <v-btn
                @click="openCreateDialog('категорії', 'category')"
                size="x-small"
                icon="mdi-plus"
              ></v-btn>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="category in genreStore.getCategories"
            :key="category._id"
          >
            <td>{{ category.name }}</td>
            <td class="text-right">
              <v-btn
                size="x-small"
                @click="openEditDialog(category, 'category')"
                icon="mdi-pencil"
              ></v-btn>
              <v-btn
                size="x-small"
                @click="openDeleteDialog(category, 'category')"
                class="ml-2"
                icon="mdi-trash-can"
              >
              </v-btn>
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-sheet>
  </v-container>
  <v-dialog v-model="deleteDialog" width="auto">
    <v-card>
      <v-card-title class="text-h7">
        Ви впевнені що хочете видалити: {{ deletedItem.name }}?
      </v-card-title>
      <v-card-actions>
        <v-spacer> </v-spacer>
        <v-btn color="green-lighten-1" variant="text" @click="deleteItem">
          Так
        </v-btn>
        <v-btn
          color="red-lighten-1"
          variant="text"
          @click="deleteDialog = false"
        >
          ні
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <v-dialog v-model="createDialog" width="420">
    <v-card>
      <v-card-title class="text-h7">
        Введіть назву {{ dialogType }}
      </v-card-title>
      <VCardText>
        <VTextField
          variant="outlined"
          v-model="newItem.name"
          label="Назва"
          required
          type="text"
        />
      </VCardText>
      <v-card-actions>
        <v-spacer> </v-spacer>
        <v-btn
          :disabled="!newItem.name.length"
          color="green-lighten-1"
          variant="text"
          @click="createItem"
        >
          Створити
        </v-btn>
        <v-btn
          color="red-lighten-1"
          variant="text"
          @click="createDialog = false"
        >
          Відміна
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <v-dialog v-model="editDialog" width="420">
    <v-card>
      <v-card-title class="text-h7"> Введіть нову назву </v-card-title>
      <VCardText>
        <VTextField
          variant="outlined"
          v-model="currentItem.name"
          label="Назва"
          required
          type="text"
        />
      </VCardText>
      <v-card-actions>
        <v-spacer> </v-spacer>
        <v-btn
          :disabled="!currentItem.name.length"
          color="green-lighten-1"
          variant="text"
          @click="editItem"
        >
          Зберегти
        </v-btn>
        <v-btn color="red-lighten-1" variant="text" @click="editDialog = false">
          Відміна
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style lang="scss" scoped>
@media (min-width: 1920px) {
  .v-container {
    max-width: 1200px;
  }
}
</style>
<route lang="yaml">
meta:
  requiresAdmin: true
</route>
