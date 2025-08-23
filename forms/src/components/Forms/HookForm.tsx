import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import type { ReactElement } from "react";
import type { InferType } from "yup";
import { formSchema } from "../../utils/validation";
import "./HookForm.styles.css";

type FormData = InferType<typeof formSchema>;

interface Props {
  onSuccess: () => void;
}

export function HookForm({ onSuccess }: Props): ReactElement {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(formSchema),
    mode: "onChange",
  });

  const onSubmit = (data: FormData) => {
    console.log("data:", data);
    reset();
    onSuccess();
  };

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <h2>React Hook Form</h2>

      <label>
        Name:
        <input type="text" {...register("name")} />
      </label>
      {errors.name && <p className="error">{errors.name.message}</p>}

      <label>
        Age:
        <input type="number" {...register("age")} />
      </label>
      {errors.age && <p className="error">{errors.age.message}</p>}

      <label>
        Email:
        <input type="email" {...register("email")} />
      </label>
      {errors.email && <p className="error">{errors.email.message}</p>}

      <label>
        Password:
        <input type="password" {...register("password")} />
      </label>
      {errors.password && <p className="error">{errors.password.message}</p>}

      <label>
        Confirm Password:
        <input type="password" {...register("confirmPassword")} />
      </label>
      {errors.confirmPassword && (
        <p className="error">{errors.confirmPassword.message}</p>
      )}

      <label>
        Gender:
        <select {...register("gender")} defaultValue="">
          <option value="" disabled>
            Select gender
          </option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </label>
      {errors.gender && <p className="error">{errors.gender.message}</p>}

      <label>
        <input type="checkbox" {...register("terms")} /> Accept Terms &
        Conditions
      </label>
      {errors.terms && <p className="error">{errors.terms.message}</p>}

      <label>
        Picture:
        <input
          type="file"
          accept="image/png, image/jpeg"
          {...register("picture")}
        />
      </label>
      {errors.picture && <p className="error">{errors.picture.message}</p>}

      <label>
        Country:
        <input
          type="text"
          placeholder="Start typing..."
          {...register("country")}
        />
      </label>
      {errors.country && <p className="error">{errors.country.message}</p>}

      <button type="submit" disabled={!isValid}>
        Submit
      </button>
    </form>
  );
}
