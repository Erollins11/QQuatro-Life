"use client";

import { FormEvent, useState } from "react";

type EventRequestFormProps = {
  labels: {
    title: string;
    name: string;
    email: string;
    phone: string;
    date: string;
    message: string;
    submit: string;
    success: string;
    errors: {
      name: string;
      email: string;
      phone: string;
      date: string;
      message: string;
    };
  };
};

type EventFormValues = {
  name: string;
  email: string;
  phone: string;
  date: string;
  message: string;
};

const initialValues: EventFormValues = {
  name: "",
  email: "",
  phone: "",
  date: "",
  message: "",
};

export default function EventRequestForm({ labels }: EventRequestFormProps) {
  const [values, setValues] = useState<EventFormValues>(initialValues);
  const [errors, setErrors] = useState<Partial<EventFormValues>>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const nextErrors: Partial<EventFormValues> = {};

    if (!values.name.trim()) {
      nextErrors.name = labels.errors.name;
    }

    if (!/^\S+@\S+\.\S+$/.test(values.email)) {
      nextErrors.email = labels.errors.email;
    }

    if (!values.phone.trim()) {
      nextErrors.phone = labels.errors.phone;
    }

    if (!values.date) {
      nextErrors.date = labels.errors.date;
    }

    if (values.message.trim().length < 10) {
      nextErrors.message = labels.errors.message;
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    setSubmitted(true);
    setValues(initialValues);
  };

  return (
    <section className="glass-card rounded-2xl p-6">
      <h2 className="mb-5 text-2xl text-brand-paper">{labels.title}</h2>

      <form className="grid gap-4 md:grid-cols-2" noValidate onSubmit={handleSubmit}>
        <label className="text-sm text-brand-muted">
          {labels.name}
          <input
            className="input-base mt-1"
            value={values.name}
            onChange={(event) => setValues((prev) => ({ ...prev, name: event.target.value }))}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "event-name-error" : undefined}
            required
          />
          {errors.name ? (
            <span id="event-name-error" className="mt-1 block text-xs text-red-300" role="alert">
              {errors.name}
            </span>
          ) : null}
        </label>

        <label className="text-sm text-brand-muted">
          {labels.email}
          <input
            type="email"
            className="input-base mt-1"
            value={values.email}
            onChange={(event) => setValues((prev) => ({ ...prev, email: event.target.value }))}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "event-email-error" : undefined}
            required
          />
          {errors.email ? (
            <span id="event-email-error" className="mt-1 block text-xs text-red-300" role="alert">
              {errors.email}
            </span>
          ) : null}
        </label>

        <label className="text-sm text-brand-muted">
          {labels.phone}
          <input
            className="input-base mt-1"
            value={values.phone}
            onChange={(event) => setValues((prev) => ({ ...prev, phone: event.target.value }))}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "event-phone-error" : undefined}
            required
          />
          {errors.phone ? (
            <span id="event-phone-error" className="mt-1 block text-xs text-red-300" role="alert">
              {errors.phone}
            </span>
          ) : null}
        </label>

        <label className="text-sm text-brand-muted">
          {labels.date}
          <input
            type="date"
            className="input-base mt-1"
            value={values.date}
            onChange={(event) => setValues((prev) => ({ ...prev, date: event.target.value }))}
            aria-invalid={Boolean(errors.date)}
            aria-describedby={errors.date ? "event-date-error" : undefined}
            required
          />
          {errors.date ? (
            <span id="event-date-error" className="mt-1 block text-xs text-red-300" role="alert">
              {errors.date}
            </span>
          ) : null}
        </label>

        <label className="text-sm text-brand-muted md:col-span-2">
          {labels.message}
          <textarea
            className="input-base mt-1 min-h-32"
            value={values.message}
            onChange={(event) => setValues((prev) => ({ ...prev, message: event.target.value }))}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? "event-message-error" : undefined}
            required
          />
          {errors.message ? (
            <span id="event-message-error" className="mt-1 block text-xs text-red-300" role="alert">
              {errors.message}
            </span>
          ) : null}
        </label>

        <button type="submit" className="button-primary w-fit text-sm">
          {labels.submit}
        </button>

        {submitted ? (
          <p className="text-sm text-emerald-300 md:col-span-2" role="status">
            {labels.success}
          </p>
        ) : null}
      </form>
    </section>
  );
}
