"use client";

import {
  LoginDefaultValues,
  LoginSchema,
  LoginSchemaType,
} from "@/types/Schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import LoginForm from "./LoginForm";

export default function LoginProvider() {
  const method = useForm<LoginSchemaType>({
    mode: "all",
    resolver: zodResolver(LoginSchema),
    defaultValues: LoginDefaultValues,
  });
  return (
    <FormProvider {...method}>
      <LoginForm />
    </FormProvider>
  );
}
