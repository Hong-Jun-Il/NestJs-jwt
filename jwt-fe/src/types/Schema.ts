import { z } from "zod";

export const SignUpSchema = z.object({
  id: z
    .string()
    .min(1, { message: "아이디를 입력해주세요" })
    .max(15, { message: "최대 15글자까지 입력 가능" }),
  password: z
    .string()
    .min(1, { message: "비밀번호를 입력해주세요" })
    .max(15, { message: "최대 15글자까지 적용" }),
  age: z.number(),
});

export type SignUpSchemaType = z.infer<typeof SignUpSchema>;

export const SignUpDefaultValues: SignUpSchemaType = {
  id: "",
  password: "",
  age: 0,
};
