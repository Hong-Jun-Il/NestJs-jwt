import Link from "next/link";
import style from "./beforeLogin.module.scss";

export default function BeforeLogin() {
  return (
    <main className={style.main}>
      <Link href="/signUp">회원가입하기</Link>
      <Link href="/login">로그인하기</Link>
    </main>
  );
}
