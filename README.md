HI THERE 
# Signup Example Application (VueJS)

This project is an example of a basic Signup application in JS
 by using [SubscriptionJS](https://developer.billwerk.io/Docs/subscriptionJS_Introduction)
 and [REST API](https://developer.billwerk.io/Docs/ApiReference)
 through [billwerk node wrapper](https://www.npmjs.com/package/billwerk)

## **IMPORTANT!** Before you launch the application

- Clone repo `https://github.com/billwerk/vuejs.git`
- Run `npm install` in the cloned repo to install all dependencies
- Login to your account on [Sandbox](https://sandbox.billwerk.com) server
- Make sure that your account has any active planvariants ([Products](https://sandbox.billwerk.com/#/products))
  - Allow signup via selfservice in the planvariant itself
  - If you see "undefined" in the planvariant selection dropdown, please fill the description of the planvariant in the billwerk UI
- Make sure that your account has set both whitelabel FakeProvider payment methods ([Settings/Payment Settings](https://sandbox.billwerk.com/#/settings/payment-providers-list))
- Populate your settings in `envs\environment.js`:
  - `publicApiKey` - please visit [Settings/Self-Service](https://sandbox.billwerk.com/#/settings/self-service) and copy your `Public API Key` on `General` tab
  - `clientId` and `clientSecret` - please visit [Settings/My Apps](https://sandbox.billwerk.com/#/settings/oauth-clients), create a new `Confidential` client and copy `Id` and `Secret`

## Launch application with Sandbox server

- Run `npm run serve` in the cloned repo for a sandbox server
- Navigate to http://localhost:8080/ in your browser
