import { createApp } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import "./style.scss";
import App from "./App.vue";
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

const app = createApp(App);
app.component("font-awesome-icon", FontAwesomeIcon);
app.use(VueSweetalert2);
app.mount("#app");
