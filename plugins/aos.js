import AOS from "aos";
import "aos/dist/aos.css";

export default ({ app }) => {
  app.AOS = new AOS.init();
  /* 不讓手機觸發aos */
  /* new AOS.init({ disable: "phone" }) */
}