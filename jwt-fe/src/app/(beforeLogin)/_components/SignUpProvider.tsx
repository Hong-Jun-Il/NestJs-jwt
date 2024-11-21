"use client";

import {
  SignUpDefaultValues,
  SignUpSchema,
  SignUpSchemaType,
} from "@/types/Schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import SignUp from "./SignUp";

export default function SignUpProvider() {
  const methods = useForm<SignUpSchemaType>({
    mode: "all",
    resolver: zodResolver(SignUpSchema),
    defaultValues: SignUpDefaultValues,
  });
  return (
    <FormProvider {...methods}>
      <SignUp />
    </FormProvider>
  );
}
