"use client";

import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";
import { SignUpSchemaType } from "@/types/Schema";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import style from "./signUp.module.scss";
import { Button } from "@/components/ui/button";

export default function SignUpForm() {
  const { control, handleSubmit } = useFormContext<SignUpSchemaType>();

  const onSubmit = async (e: SignUpSchemaType) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/users/signup`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: e.id,
          password: e.password,
          age: Number(e.age),
        }),
        credentials: "include",
        mode: "cors",
      },
    );

    if (!res.ok) {
      throw new Error("HTTP ERROR");
    }

    return res.json();
  };

  return (
    <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
      <FormField
        control={control}
        name="id"
        render={({ field }) => (
          <FormItem className="w-[50%]">
            <FormLabel>아이디</FormLabel>
            <FormControl>
              <Input placeholder="아이디 입력" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="password"
        render={({ field }) => (
          <FormItem className="w-[50%]">
            <FormLabel>비밀번호</FormLabel>
            <FormControl>
              <Input placeholder="비밀번호 입력" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="age"
        render={({ field }) => (
          <FormItem className="w-[50%]">
            <FormLabel>나이</FormLabel>
            <FormControl>
              <Input placeholder="나이 입력" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <Button className={style.submit}>회원가입</Button>
    </form>
  );
}
