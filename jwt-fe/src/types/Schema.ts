import { z } from "zod";

export const SignUpSchema = z.object({
  id: z
    .string()
    .min(3, { message: "아이디는 최소 3글자를 입력해주셔야 합니다" })
    .max(15, { message: "최대 15글자까지 입력 가능" }),
  password: z
    .string()
    .min(8, { message: "비밀번호는 최소 8글자를 입력해주셔야 합니다" })
    .max(15, { message: "최대 15글자까지 적용" }),
  age: z
    .string()
    .min(1, { message: "나이를 입력해 주세요" })
    .refine((e) => !isNaN(Number(e)), { message: "숫자만 입력" }),
});

export type SignUpSchemaType = z.infer<typeof SignUpSchema>;

export const SignUpDefaultValues: SignUpSchemaType = {
  id: "",
  password: "",
  age: "",
};

export const LoginSchema = z.object({
  id: z
    .string()
    .min(3, { message: "아이디는 최소 3글자" })
    .max(15, { message: "아이디는 최대 15글자" })
    .regex(/^(?!.*[ㄱ-ㅎ가-힣])(?=.*[a-zA-Z])(?=.*\d).+$/, {
      message: "아이디는 영문자 및 숫자 포함하여야 함",
    }),
  password: z
    .string()
    .min(8, { message: "비밀번호는 최소 8글자" })
    .max(18, { message: "비밀번호는 최대 18글자" })
    .regex(
      /^(?!.*[ㄱ-ㅎ가-힣])(?=.*[a-zA-Z])(?=.*\d)(?=.*[~!@#$%^&*()_+\-=\|\[\]\{\}\\;\':\",.<>?\/]).+$/,
      { message: "비밀번호는 영문자, 숫자 및 특수문자를 포함해야 함" },
    ),
});

export type LoginSchemaType = z.infer<typeof LoginSchema>;

export const LoginDefaultValues = {
  id: "",
  password: "",
};
