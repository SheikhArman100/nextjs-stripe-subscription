import { z } from "zod";

export const signinSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .email({
      message: "Not a valid email",
    }),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(6, {
      message: "Password too short - should be 6 chars minimum",
    }),
});

export const signupSchema = z
  .object({
    email: z
      .string({
        required_error: "Email is required",
      })
      .email({
        message: "Not a valid email",
      }),
    password: z
      .string({
        required_error: "Password is required",
      })
      .min(6, {
        message: "Password too short - should be 6 chars minimum",
      }),
    passwordConfirmation: z.string().nonempty("Confirm password is required"),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords do not match",
    path: ["passwordConfirmation"],
  });

  export const forgetPasswordSchema=z.object({
    email:z
    .string({
      required_error: "Email is required",
    })
    .email({
      message: "Not a valid email",
    })
  })
  export const ChangePasswordSchema=z.object({
    password: z
      .string({
        required_error: "Password is required",
      })
      .min(6, {
        message: "Password too short - should be 6 chars minimum",
      }),
    passwordConfirmation: z.string().nonempty("Confirm password is required")
  }).refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords do not match",
    path: ["passwordConfirmation"],
  });