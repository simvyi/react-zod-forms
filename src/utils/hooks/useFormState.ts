import { useState } from "react";
import type { FormEvent } from "react";
import { getKeys } from "../common";
import type { FieldErrors, FormValues } from "../types";
import { validateField, getZodDefaults } from "../types";

function getDefaultErrors<TSchema extends Zod.AnyZodObject>(schema: TSchema) {
  return getKeys(schema.shape).reduce(
    (prev, field) => ({ ...prev, [field]: [] as string[] }),
    {}
  );
}

export function useFormState<TSchema extends Zod.AnyZodObject>(
  schema: TSchema
) {
  const [formState, setFormState] = useState<FormValues<TSchema>>(
    getZodDefaults(schema)
  );
  const [errors, setErrors] = useState<FieldErrors<TSchema>>(
    getDefaultErrors(schema)
  );

  function _updateErrors(errors: FieldErrors<TSchema>) {
    const allErrors = getKeys(formState).reduce((prev, field) => {
      return {
        ...prev,
        [field]:
          field in errors ? errors[field as keyof FieldErrors<TSchema>] : [],
      };
    }, {}) as FieldErrors<TSchema>;

    setErrors(allErrors);
  }

  function createHandleChange<TField extends keyof FormValues<TSchema>>(
    field: TField
  ) {
    return (newValue: FormValues<TSchema>[TField]) => {
      setFormState((prev) => ({ ...prev, [field]: newValue }));

      const error = validateField(schema, field)(newValue);
      setErrors((prev) => ({
        ...prev,
        [field]: [error],
      }));
    };
  }

  function createHandleSubmit(
    onSuccess: (v: FormValues<TSchema>) => void | Promise<void>
  ) {
    return function (e: FormEvent<HTMLFormElement>) {
      e.preventDefault();

      const result = schema.safeParse(formState);
      if (!result.success) {
        _updateErrors(result.error.flatten().fieldErrors);
        return;
      }
      void onSuccess(result.data);
    };
  }

  function getFieldError(field: keyof FieldErrors<TSchema>) {
    return errors[field]?.join("; ") ?? "";
  }

  return {
    formState,
    errors,
    createHandleChange,
    createHandleSubmit,
    getFieldError,
  };
}
