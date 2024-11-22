import SignUpProvider from "./_components/SignUpProvider";
import style from "./beforeLogin.module.scss";

export default function BeforeLogin() {
  return (
    <main className={style.main}>
      <SignUpProvider />
    </main>
  );
}
