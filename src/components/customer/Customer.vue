<template>
  <md-card>
    <md-card-header>
      <div class="md-title">Your Personal Info</div>
    </md-card-header>
    <md-card-content>
      <ValidationProvider rules="required" v-slot="{ errors,failed}">
        <md-field :class="{'md-invalid': failed}">
          <label>First Name</label>
          <md-input v-model="firstName" @change="setFirstName()" required></md-input>
          <span class="md-error">{{ errors[0] }}</span>
        </md-field>
      </ValidationProvider>
      <ValidationProvider rules="required" v-slot="{ errors,failed }">
        <md-field :class="{'md-invalid': failed}">
          <label>Last Name</label>
          <md-input v-model="lastName" @change="setLastName()" required></md-input>
          <span class="md-error">{{ errors[0] }}</span>
        </md-field>
      </ValidationProvider>
    </md-card-content>
  </md-card>
</template>

<script>
import { ValidationProvider, extend } from "vee-validate";
import { required } from "vee-validate/dist/rules";

extend("required", {
  ...required,
  message: "This field is required"
});

export default {
  name: "Customer",
  components: {
    ValidationProvider
  },
  data: () => ({
    firstName: null,
    lastName: null
  }),
  methods: {
    setFirstName() {
      this.$emit("change:firstName", this.firstName);
    },
    setLastName() {
      this.$emit("change:lastName", event.target.value);
    }
  }
};
</script>