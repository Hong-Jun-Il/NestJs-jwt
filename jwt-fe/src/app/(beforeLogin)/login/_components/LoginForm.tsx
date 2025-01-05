import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoginSchemaType } from "@/types/Schema";
import { useFormContext } from "react-hook-form";
import style from "./loginForm.module.scss";
import Image from "next/image";
import visible from "@/../public/visible.png";
import hidden from "@/../public/hidden.png";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const { control, handleSubmit, setError } = useFormContext<LoginSchemaType>();
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  const onSubmit = async (e: LoginSchemaType) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/users/login`, {
      credentials: "include",
      method: "POST",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: e.id,
        password: e.password,
      }),
      mode: "cors",
    });

    const data = await res.json();

    if (!res.ok) {
      if (data.statusCode === 404) {
        setError("id", { message: data.response });
      } else if (data.statusCode === 401) {
        setError("password", { message: data.response });
      } else {
        alert("서버 처리 중 오류가 발생했습니다");
      }
      return;
    }

    alert("로그인 성공");
    router.push("/home");
  };
  return (
    <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
      <FormField
        control={control}
        name="id"
        render={({ field }) => (
          <FormItem className="mb-5">
            <FormControl>
              <Input placeholder="아이디" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="password"
        render={({ field }) => (
          <FormItem className={style.inputWrapper}>
            <FormControl>
              <Input
                placeholder="비밀번호"
                {...field}
                type={isPasswordVisible ? "text" : "password"}
              />
            </FormControl>
            <div
              className={style.inputTypeBtn}
              onClick={() => setIsPasswordVisible((prev) => !prev)}
            >
              {isPasswordVisible ? (
                <Image src={hidden} alt="hidden" />
              ) : (
                <Image src={visible} alt="visible" />
              )}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
      <Button className="absolute bottom-5 right-8">로그인하기</Button>
    </form>
  );
}
