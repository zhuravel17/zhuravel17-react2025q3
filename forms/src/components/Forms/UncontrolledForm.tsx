import { useRef, useState } from "react";
import type { ReactElement } from "react";
import { formSchema } from "../../utils/validation";
import { ValidationError } from "yup";
import "./UncontrolledForm.styles.css";

interface Props {
  onSuccess: () => void;
}

export function UncontrolledForm({ onSuccess }: Props): ReactElement {
  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLSelectElement>(null);
  const termsRef = useRef<HTMLInputElement>(null);
  const pictureRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLInputElement>(null);

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const file = pictureRef.current?.files?.[0] ?? null;

    const data = {
      name: nameRef.current?.value || "",
      age: ageRef.current?.value ? Number(ageRef.current.value) : "",
      email: emailRef.current?.value || "",
      password: passwordRef.current?.value || "",
      confirmPassword: confirmPasswordRef.current?.value || "",
      gender: genderRef.current?.value || "",
      terms: termsRef.current?.checked || false,
      picture: file,
      country: countryRef.current?.value || "",
    };

    try {
      await formSchema.validate(data, { abortEarly: false });
      setErrors({});
      console.log("data:", data);
      onSuccess();
    } catch (error) {
      if (error instanceof ValidationError) {
        const validationErrors: Record<string, string> = {};

        error.inner.forEach((e) => {
          if (e.path) {
            validationErrors[e.path] = e.message;
          }
        });

        setErrors(validationErrors);
      }
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit} noValidate>
      <h2>Uncontrolled Form</h2>

      <label>
        Name:
        <input type="text" ref={nameRef} />
      </label>
      {errors.name && <p className="error">{errors.name}</p>}

      <label>
        Age:
        <input type="number" ref={ageRef} />
      </label>
      {errors.age && <p className="error">{errors.age}</p>}

      <label>
        Email:
        <input type="email" ref={emailRef} />
      </label>
      {errors.email && <p className="error">{errors.email}</p>}

      <label>
        Password:
        <input type="password" ref={passwordRef} />
      </label>
      {errors.password && <p className="error">{errors.password}</p>}

      <label>
        Confirm Password:
        <input type="password" ref={confirmPasswordRef} />
      </label>
      {errors.confirmPassword && (
        <p className="error">{errors.confirmPassword}</p>
      )}

      <label>
        Gender:
        <select ref={genderRef} defaultValue="">
          <option value="" disabled>
            Select gender
          </option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </label>
      {errors.gender && <p className="error">{errors.gender}</p>}

      <label>
        <input type="checkbox" ref={termsRef} /> Accept Terms & Conditions
      </label>
      {errors.terms && <p className="error">{errors.terms}</p>}

      <label>
        Picture:
        <input type="file" ref={pictureRef} accept="image/png, image/jpeg" />
      </label>
      {errors.picture && <p className="error">{errors.picture}</p>}

      <label>
        Country:
        <input type="text" ref={countryRef} placeholder="Start typing..." />
      </label>
      {errors.country && <p className="error">{errors.country}</p>}

      <button type="submit">Submit</button>
    </form>
  );
}
