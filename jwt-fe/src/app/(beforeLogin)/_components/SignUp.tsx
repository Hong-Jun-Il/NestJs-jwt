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

export default function SignUp() {
  const { control, handleSubmit } = useFormContext<SignUpSchemaType>();

  const onSubmit = () => {};

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormField
        control={control}
        name="id"
        render={({ field }) => (
          <FormItem>
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
          <FormItem>
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
          <FormItem>
            <FormLabel>나이</FormLabel>
            <FormControl>
              <Input type="number" placeholder="나이 입력" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </form>
  );
}
