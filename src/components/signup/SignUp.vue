<template>
  <div>
    <Cart v-on:change:planVariantId="cart.planVariantId = $event" />
    <Customer
      v-on:change:firstName="customer.firstName = $event"
      v-on:change:lastName="customer.lastName = $event"
    />
    <Payment
      v-on:change:payment="paymentData.bearer = $event"
      v-on:change:cardNumber="paymentData.cardNumber = $event"
      v-on:change:cardHolder="paymentData.cardHolder = $event"
      v-on:change:expiryMonth="paymentData.expiryMonth = $event"
      v-on:change:expiryYear="paymentData.expiryYear = $event"
      v-on:change:cvc="paymentData.cvc = $event"
      v-on:change:accountHolder="paymentData.accountHolder = $event"
      v-on:change:iban="paymentData.iban = $event"
      v-on:change:bic="paymentData.bic = $event"
    />
    <md-button class="md-raised md-primary" :disabled="!isFormValid" v-on:click="subscribe">Submit</md-button>
  </div>
</template>


<script src="https://selfservice.sandbox.billwerk.com/subscription.js" type="application/javascript"></script>
<script>
import Cart from "../cart/Cart.vue";
import Customer from "../customer/Customer.vue";
import Payment from "../payment/Payment.vue";
import { environment } from "../../../envs/environment.js";

export default {
  name: "SignUp",
  data() {
    return {
      customer: {
        firstName: "",
        lastName: ""
      },
      cart: {
        planVariantId: ""
      },
      paymentData: {
        bearer: "",
        cardNumber: "",
        expiryMonth: "",
        expiryYear: "",
        cardHolder: "",
        cvc: "",
        accountHolder: "",
        iban: "",
        bic: ""
      }
    };
  },
  components: {
    Cart,
    Customer,
    Payment
  },
  computed: {
    isFormValid: function() {
      let isCustomerValid = () =>
        this.customer.firstName != "" && this.customer.lastName != "";

      let isCartValid = () => this.cart.planVariantId != "";

      let isPaymentDataValid = () =>
        (this.paymentData.bearer != "" &&
          this.paymentData.cardNumber != "" &&
          this.paymentData.expiryMonth != "" &&
          this.paymentData.expiryYear != "" &&
          this.paymentData.cardHolder != "" &&
          this.paymentData.cvc != "") ||
        (this.paymentData.bearer &&
          this.paymentData.accountHolder &&
          this.paymentData.iban != "" &&
          this.paymentData.bic != "");

      return isCustomerValid() && isCartValid() && isPaymentDataValid();
    }
  },
  methods: {
    subscribe(event) {
      let signupService = new SubscriptionJS.Signup();
      var paymentService = new SubscriptionJS.Payment(
        {
          publicApiKey: environment.publicApiKey,
          providerReturnUrl: window.location.href
        },
        () => createOrder(this.cart, this.customer),
        function() {
          alert("PSP initialization failed.");
        }
      );

      let createOrder = function(cart, customer) {
        signupService.createOrder(cart, customer, pay, errorHandler);
      };

      let pay = order => {
        signupService.paySignupInteractive(
          paymentService,
          this.paymentData,
          order,
          paymentHandler,
          errorHandler
        );
      };

      let paymentHandler = function(result) {
        if (!result.Url) {
          alert("Signup successful completed!");
        } else {
          window.location.href = result.Url;
        }
      };

      let errorHandler = function(errorData) {
        console.log(errorData);
        alert("Subscription failed. Check your data.");
      };
    }
  },

  mounted() {
    let subscriptionJS = document.createElement("script");
    subscriptionJS.setAttribute(
      "src",
      "https://selfservice.sandbox.billwerk.com/subscription.js"
    );
    subscriptionJS.setAttribute("type", "application/javascript");
    document.head.appendChild(subscriptionJS);
  }
};
</script>