import React from "react";
import { useForm } from "react-hook-form";

let renderCount = 0;

export default function ReactHookFormApp() {
  renderCount++;

  return (
    <div className="px-4 py-4">
      <Headers renderCount={renderCount} description=""></Headers>
      <RegisterForm />
    </div>
  );
}

function Headers({ renderCount, description }) {
  return (
    <div className="flex justify-end items-end mt-2 mr-2">
      <label className="px-4 py-2 bg-white rounded-sm">
        Render Count: {renderCount}
      </label>
    </div>
  );
}

function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
      <input
        placeholder="First name"
        className="mt-2 p-2 border"
        aria-invalid={errors.firstName ? "true" : "false"}
        {...register("firstName", {
          required: true,
          maxLength: 20,
        })}
      ></input>

      {errors.firstName?.type === "required" && (
        <p role="alert" className="text-red-600">
          First name is required
        </p>
      )}

      <input
        placeholder="Last name"
        className="mt-2 p-2 border"
        {...register("lastName", {
          required: true,
          pattern: /^[A-Za-z]+$/i,
        })}
      ></input>

      {errors.lastName?.type === "required" && (
        <p role="alert" className="text-red-600">
          Last name is required
        </p>
      )}

      {errors.lastName?.type === "pattern" && (
        <p role="alert" className="text-red-600">
          Last name is not correct format
        </p>
      )}

      <input
        placeholder="Age"
        className="mt-2 p-2 border"
        type="number"
        {...register("age", {
          min: 18,
          max: 28,
        })}
      ></input>

      {(errors.age?.type === "min" || errors.age?.type === "max") && (
        <p role="alert" className="text-red-600">
          Age must be between 18 and 28
        </p>
      )}

      <input className="mt-2 p-2 border bg-white" type="submit"></input>
    </form>
  );
}
