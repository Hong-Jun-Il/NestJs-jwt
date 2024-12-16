import GoogleMaps from "../_components/GoogleMaps/GoogleMaps";
import style from "./beforeLogin.module.scss";

export default function BeforeLogin() {
  return (
    <main className={style.main}>
      <GoogleMaps />
    </main>
  );
}
