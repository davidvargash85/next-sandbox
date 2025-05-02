import { FormEvent, useState } from "react";
import type { Input, ApiError } from "@/types";

const formInitial: Input = {
  name: "",
  email: "",
  phone: "",
};

type NotifType = "Error" | "Success";

interface Notification {
  message: string;
  type: NotifType;
}

const Form = () => {
  const [formState, setFormState] = useState<Input>(formInitial);
  const [notif, setNotif] = useState<Notification | undefined>();

  const clearForm = () => setFormState(formInitial);

  const addNotification = (notification: Notification) => {
    setNotif({
      message: notification.message,
      type: notification.type,
    });
    setTimeout(() => {
      setNotif(undefined);
    }, 1000);
  };

  const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData: Input = {
      email: formState.email,
      name: formState.name,
      phone: formState.phone,
    };
    const response = await fetch(`http://localhost:3000/api/form`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer your_token",
        "Custom-Header": "custom_value",
      },
      body: JSON.stringify({ formData }),
    });
    console.log(">> response.status", response.status);
    const result = await response.json();

    if (response.ok) {
      clearForm();
      addNotification({
        message: "Form submitted successfully",
        type: "Success",
      });
    }
  };

  const onChangeHandler = (e: FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.currentTarget;

    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="m-8 mx-auto">
      <form
        onSubmit={onSubmitHandler}
        className="max-w-md mx-auto p-4 bg-gray-100 rounded-lg shadow-xl flex flex-col gap-4"
      >
        {notif && (
          <div
            className={`${notif.type === "Success" ? "bg-green-100" : "bg-red-100"}`}
            aria-live="polite"
          >
            <p
              className={`p-2 font-bold text-sm ${`${notif.type === "Success" ? "text-green-500" : "text-red-500"}`}`}
            >
              {notif.message}
            </p>
          </div>
        )}
        <div>
          <h1>Form Completion</h1>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              name="name"
              id="name"
              onChange={onChangeHandler}
              value={formState.name}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              name="email"
              id="email"
              onChange={onChangeHandler}
              value={formState.email}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="phone">Phone:</label>
            <input
              type="text"
              name="phone"
              id="phone"
              onChange={onChangeHandler}
              value={formState.phone}
            />
          </div>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-1 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Form;
