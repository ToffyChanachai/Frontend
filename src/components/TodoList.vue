<template>
  <div class="header">
    <h1>Todo List</h1>
  </div>
  <ul>
    <li v-for="todo in todos" :key="todo.id" @click="openDetailModal(todo)">
      <span
        :style="{ textDecoration: todo.completed ? 'line-through' : 'none' }"
      >
        {{ todo.title }}
      </span>
      <div class="nav-right">

        <!-- Comleted Button -->
        <button
          v-if="!todo.completed"
          class="btn btn-success btn-sm"
          @click.stop="markComplete(todo.id)"
        >
          <i class="fas fa-check"></i>
        </button>

        <!-- Incomleted Button -->
        <button
          v-if="todo.completed"
          class="btn btn-success btn-sm completed"
          @click.stop="markIncomplete(todo.id)"
        >
          <i class="fas fa-check"></i>
        </button>

        <!-- Edit Button -->
        <button
          class="btn btn-warning btn-sm"
          @click.stop="openEditModal(todo)"
        >
          <i class="fas fa-edit"></i>
        </button>

        <!-- Delete Button -->
        <button class="btn btn-danger btn-sm" @click.stop="confirmDelete(todo)">
          <i class="fas fa-close"></i>
        </button>
      </div>
    </li>
  </ul>

  <!-- Add Button -->
  <div class="nav-bottom">
    <span class="add-todo" @click="openAddModal">+ Add New Todo</span>
  </div>

  <!-- Modal Add -->
  <div class="modal" v-if="showAddModal" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Add New Todo</h5>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label for="newTodoTitle">Title</label>
            <input
              v-model="newTodo.title"
              type="text"
              class="form-control"
              id="newTodoTitle"
              placeholder="Enter title"
            />
          </div>
          <div class="form-group">
            <label for="newTodoDescription">Description</label>
            <textarea
              v-model="newTodo.description"
              class="form-control"
              id="newTodoDescription"
              placeholder="Enter description"
            ></textarea>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary btn-sm"
            @click="closeAddModal"
          >
            Cancel
          </button>
          <button type="button" class="btn btn-primary btn-sm" @click="addTodo">
            Save
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal Todo details -->
  <div class="modal" v-if="showDetailModal" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Todo Details</h5>
        </div>
        <div class="modal-body">
          <h6><strong>{{ selectedTodo.title }}</strong></h6>
          <p>{{ selectedTodo.description }}</p>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary btn-sm"
            @click="closeDetailModal"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal Edit -->
  <div class="modal" v-if="showEditModal" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Edit Todo</h5>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label for="editTodoTitle">Title</label>
            <input
              v-model="editTodo.title"
              type="text"
              class="form-control"
              id="editTodoTitle"
              placeholder="Enter title"
            />
          </div>
          <div class="form-group">
            <label for="editTodoDescription">Description</label>
            <textarea
              v-model="editTodo.description"
              class="form-control"
              id="editTodoDescription"
              placeholder="Enter description"
            ></textarea>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary btn-sm"
            @click="closeEditModal"
          >
            Cancel
          </button>
          <button
            type="button"
            class="btn btn-primary btn-sm"
            @click="updateTodo"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal Delete -->
  <div class="modal" v-if="showDeleteModal" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Confirm Delete</h5>
        </div>
        <div class="modal-body">
          <p>Are you sure you want to delete "{{ selectedTodo.title }}"?</p>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary btn-sm"
            @click="closeDeleteModal"
          >
            Cancel
          </button>
          <button
            type="button"
            class="btn btn-primary btn-sm"
            @click="deleteTodo(selectedTodo.id)"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      todos: [],
      newTodo: {
        title: "",
        description: "",
      },
      editTodo: {
        id: "",
        title: "",
        description: "",
      },
      showDetailModal: false,
      showAddModal: false, 
      showEditModal: false,
      showDeleteModal: false,
      selectedTodo: {},
    };
  },
  mounted() {
    this.fetchTodos();
  },
  methods: {
    async fetchTodos() {
      try {
        const response = await axios.get("http://127.0.0.1:3333/todos");
        this.todos = response.data;
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    },

    async addTodo() {
      try {
        const response = await axios.post(
          "http://127.0.0.1:3333/todos",
          this.newTodo,
        );
        this.todos.push(response.data);
        this.newTodo.title = "";
        this.newTodo.description = "";
        this.closeAddModal(); // close after saved
      } catch (error) {
        console.error("Error adding todo:", error);
      }
    },
    openAddModal() {
      this.showAddModal = true; // open modal add
    },
    closeAddModal() {
      this.showAddModal = false; // close modal add
      this.newTodo.title = "";
      this.newTodo.description = "";
    },

    async markComplete(id) {
      try {
        await axios.patch(`http://127.0.0.1:3333/todos/${id}/complete`);
        const todo = this.todos.find((t) => t.id === id);
        todo.completed = true;
      } catch (error) {
        console.error("Error marking todo as complete:", error);
      }
    },
    async markIncomplete(id) {
      try {
        await axios.patch(`http://127.0.0.1:3333/todos/${id}/incomplete`);
        const todo = this.todos.find((t) => t.id === id);
        todo.completed = false;
      } catch (error) {
        console.error("Error marking todo as incomplete:", error);
      }
    },
    openEditModal(todo) {
      this.editTodo = { ...todo }; // คัดลอกข้อมูล Todo ที่เลือกมาเพื่อแก้ไข
      this.showEditModal = true;
    },
    closeEditModal() {
      this.showEditModal = false;
      this.editTodo = {
        id: "",
        title: "",
        description: "",
      };
    },

    async updateTodo() {
      try {
        const response = await axios.put(
          `http://127.0.0.1:3333/todos/${this.editTodo.id}`,
          this.editTodo,
        );
        const index = this.todos.findIndex((t) => t.id === this.editTodo.id);
        this.todos[index] = response.data;
        this.closeEditModal();
      } catch (error) {
        console.error("Error updating todo:", error);
      }
    },

    confirmDelete(todo) {
      this.selectedTodo = todo; 
      this.showDeleteModal = true;
    },

    closeDeleteModal() {
      this.showDeleteModal = false; 
      this.selectedTodo = {}; 
    },

    async deleteTodo(id) {
      try {
        await axios.delete(`http://127.0.0.1:3333/todos/${id}`);
        this.todos = this.todos.filter((todo) => todo.id !== id);
        this.closeDeleteModal(); 
      } catch (error) {
        console.error("Error deleting todo:", error);
      }
    },

    openDetailModal(todo) {
      this.selectedTodo = todo;
      this.showDetailModal = true; 
    },
    closeDetailModal() {
      this.showDetailModal = false; 
      this.selectedTodo = {}; 
    },
  },
};
</script>

<style></style>
