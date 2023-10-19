import * as z from "zod";
import { getKeys } from "./common";

export const userFormSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1),
  age: z.number().min(18),
});

export const todoFormSchema = z.object({
  title: z.string().min(4),
  completed: z.boolean().default(false),
});

export type FieldErrors<TSchema extends z.AnyZodObject> =
  z.inferFlattenedErrors<TSchema>["fieldErrors"];

export type FormValues<TSchema extends z.AnyZodObject> = z.infer<TSchema>;

export function getZodDefaults<TSchema extends z.AnyZodObject>(
  schema: TSchema
): z.infer<TSchema> {
  return Object.entries(schema.shape).reduce(
    (prev, [key, value]) => ({
      ...prev,
      [key]:
        value instanceof z.ZodDefault ? value._def.defaultValue() : undefined,
    }),
    {}
  );
}

export function validateField<
  TSchema extends z.AnyZodObject,
  TField extends keyof FormValues<TSchema>
>(schema: TSchema, fieldName: TField) {
  return (value: unknown): string => {
    const result = schema
      .pick({ [fieldName]: true } as { [x: string]: true | undefined })
      .safeParse({ [fieldName]: value });
    return !result.success ? result.error.errors[0].message : "";
  };
}

export function getDefaultErrors<TSchema extends z.AnyZodObject>(
  schema: TSchema
) {
  return getKeys(schema.shape).reduce(
    (prev, field) => ({ ...prev, [field]: [] as string[] }),
    {}
  );
}
