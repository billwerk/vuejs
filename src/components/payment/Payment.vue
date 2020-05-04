<template>
  <md-card>
    <md-card-header>
      <div class="md-title">Your Payment Data</div>
    </md-card-header>
    <md-card-content>
      <md-field appearance="outline" style="width: 100%">
        <md-select @md-selected="setPayment()" name="payments" v-model="selectedPayment">
          <md-option
            v-for="payment in payments"
            :value="payment.key"
            :key="payment.key"
          >{{payment.value}}</md-option>
        </md-select>
      </md-field>
      <div v-show="selectedPayment === 'CreditCard:FakePSP'" id="Credit Card" style="width:100%">
        <validation-provider rules="required" v-slot="{ errors,failed}">
          <md-field :class="{'md-invalid': failed}">
            <label>Card Number</label>
            <md-input
              v-model="cardNumber"
              @change="setCardNumber()"
              required
              placeholder="0000000000000000"
            ></md-input>
            <span class="md-error">{{ errors[0] }}</span>
          </md-field>
        </validation-provider>
        <validation-provider rules="required" v-slot="{ errors,failed}">
          <md-field :class="{'md-invalid': failed}">
            <label>Card Holder</label>
            <md-input
              v-model="cardHolder"
              @change="setCardHolder()"
              required
              placeholder="JOHN SMITH"
            ></md-input>
            <span class="md-error">There is an error</span>
          </md-field>
        </validation-provider>
        <div style="display:flex;flex-direction:row">
          <div class="mat-form-field-infix">
            <md-field appearance="outline" class="select-payment-option">
              <label for="cart">Month</label>
              <md-select
                v-model="selectedMonth"
                @md-selected="setSelectedMonth()"
                name="expiryMonths"
              >
                <md-option v-for="month in expiryMonths" :value="month" :key="month">{{month}}</md-option>
              </md-select>
            </md-field>
          </div>
          <md-field appearance="outline" class="select-payment-option select-year">
            <label for="cart">Year</label>
            <md-select v-model="selectedYear" @md-selected="setSelectedYear()" name="expiryYear">
              <md-option v-for="year in expiryYears" :value="year" :key="year">{{year}}</md-option>
            </md-select>
          </md-field>
        </div>
        <validation-provider rules="required" v-slot="{ errors,failed}">
          <md-field :class="{'md-invalid': failed}">
            <label>CVC</label>
            <md-input v-model="cvc" @change="setCvc()" required placeholder="999" maxlength="3"></md-input>
            <span class="md-error">{{ errors[0] }}</span>
          </md-field>
        </validation-provider>
      </div>
      <div v-show="selectedPayment ==='Debit:FakePSP'" id="Debit">
        <validation-provider rules="required" v-slot="{ errors,failed}">
          <md-field :class="{'md-invalid': failed}">
            <label>Account Holder</label>
            <md-input
              @change="setAccountHolder()"
              v-model="accountHolder"
              required
              placeholder="JOHN SMITH"
            ></md-input>
            <span class="md-error">{{ errors[0] }}</span>
          </md-field>
        </validation-provider>
        <validation-provider rules="required" v-slot="{ errors,failed}">
          <md-field :class="{'md-invalid': failed}">
            <label>IBAN</label>
            <md-input
              @change="setIban()"
              v-model="iban"
              required
              placeholder="GB33BUKB20201555555555"
            ></md-input>
            <span class="md-error">{{ errors[0] }}</span>
          </md-field>
        </validation-provider>
        <validation-provider rules="required" v-slot="{ errors,failed}">
          <md-field :class="{'md-invalid': failed}">
            <label>BIC</label>
            <md-input @change="setBic()" v-model="bic" required placeholder="PBNKDEFF"></md-input>
            <span class="md-error">{{ errors[0] }}</span>
          </md-field>
        </validation-provider>
      </div>
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
  name: "Payment",
  components: {
    ValidationProvider
  },
  data() {
    return {
      payments: [
        { value: "Credit Card", key: "CreditCard:FakePSP" },
        { value: "Direct Debit", key: "Debit:FakePSP" }
      ],
      cardNumber: null,
      cardHolder: null,
      cvc: null,
      selectedPayment: "",
      expiryMonths: [
        "01",
        "02",
        "03",
        "04",
        "05",
        "06",
        "07",
        "08",
        "09",
        "10",
        "11",
        "12"
      ],
      selectedMonth: "",
      expiryYears: [
        "2020",
        "2021",
        "2022",
        "2023",
        "2024",
        "2025",
        "2026",
        "2027",
        "2028",
        "2029",
        "2030"
      ],
      selectedYear: "",
      accountHolder: "",
      iban: "",
      bic: ""
    };
  },
  methods: {
    setPayment() {
      this.$emit("change:payment", this.selectedPayment);
    },

    setCardNumber() {
      this.$emit("change:cardNumber", this.cardNumber);
    },
    setCardHolder() {
      this.$emit("change:cardHolder", this.cardHolder);
    },
    setSelectedMonth() {
      this.$emit("change:expiryMonth", this.selectedMonth);
    },
    setSelectedYear() {
      this.$emit("change:expiryYear", this.selectedYear);
    },
    setCvc() {
      this.$emit("change:cvc", this.cvc);
    },
    setAccountHolder() {
      this.$emit("change:accountHolder", this.accountHolder);
    },
    setIban() {
      this.$emit("change:iban", this.iban);
    },
    setBic() {
      this.$emit("change:bic", this.bic);
    }
  }
};
</script>

<style>
.select-payment-option {
  width: 180px !important;
}

.select-year {
  margin-left: 25px !important;
}
</style>