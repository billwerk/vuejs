<template>
  <md-card>
    <md-card-header>
      <div class="md-title">Your Cart</div>
    </md-card-header>
    <md-card-content>
      <md-field appearance="outline" style="width: 100%">
        <label for="cart">Cart</label>
        <md-select
          v-model="selectedPayment"
          name="cart"
          id="cart"
          placeholder="Your Plan Variant"
          @md-selected="setSelectedPaymentVariant()"
        >
          <md-option
            class="mat-option-text"
            v-for="planVariant in PlanVariants"
            :value="planVariant.id"
            :key="planVariant.id"
          >{{planVariant.description}}</md-option>
        </md-select>
      </md-field>
    </md-card-content>
  </md-card>
</template>

<script>
import BillwerkAPI from "billwerk/dist";
import { environment } from "../../../envs/environment.js";

export default {
  name: "Cart",
  data() {
    return {
      PlanVariants: null,
      selectedPayment: ""
    };
  },
  mounted() {
    let apiService = new BillwerkAPI(
      environment.clientId,
      environment.clientSecret,
      window.location.host,
      "/api/v1",
      false
    );
    apiService.getPlans().then(plans => {
      apiService.getPlanVariants().then(planVariants => {
        this.PlanVariants = this.populatePlanVariants(plans, planVariants);
      });
    });
  },

  methods: {
    populatePlanVariants(plans, planVariants) {
      const getPlan = planVariant =>
        plans.find(plan => plan.Id === planVariant.PlanId);
      return planVariants.map(planVariant =>
        this.composePlanVariant(getPlan(planVariant), planVariant)
      );
    },

    composePlanVariant(plan, planVariant) {
      return {
        id: planVariant.Id,
        description: `${plan.Name._c} (${planVariant.Description._c})`,
        originPlan: plan,
        originPlanVariant: planVariant
      };
    },

    setSelectedPaymentVariant() {
      this.$emit("change:planVariantId", this.selectedPayment);
    }
  }
};
</script>

<style>
.mat-option-text {
  display: inline-block;
  flex-grow: 1;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>