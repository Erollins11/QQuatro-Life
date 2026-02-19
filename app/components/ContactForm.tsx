"use client";

import { FormEvent, useState } from "react";

type ContactFormProps = {
  labels: {
    title: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    submit: string;
    success: string;
    errors: {
      name: string;
      email: string;
      subject: string;
      message: string;
    };
  };
};

type ContactValues = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const initialValues: ContactValues = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

export default function ContactForm({ labels }: ContactFormProps) {
  const [values, setValues] = useState<ContactValues>(initialValues);
  const [errors, setErrors] = useState<Partial<ContactValues>>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const nextErrors: Partial<ContactValues> = {};

    if (!values.name.trim()) {
      nextErrors.name = labels.errors.name;
    }

    if (!/^\S+@\S+\.\S+$/.test(values.email)) {
      nextErrors.email = labels.errors.email;
    }

    if (values.subject.trim().length < 3) {
      nextErrors.subject = labels.errors.subject;
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

      <form className="grid gap-4" noValidate onSubmit={handleSubmit}>
        <label className="text-sm text-brand-muted">
          {labels.name}
          <input
            className="input-base mt-1"
            value={values.name}
            onChange={(event) => setValues((prev) => ({ ...prev, name: event.target.value }))}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "contact-name-error" : undefined}
            required
          />
          {errors.name ? (
            <span id="contact-name-error" className="mt-1 block text-xs text-red-300" role="alert">
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
            aria-describedby={errors.email ? "contact-email-error" : undefined}
            required
          />
          {errors.email ? (
            <span id="contact-email-error" className="mt-1 block text-xs text-red-300" role="alert">
              {errors.email}
            </span>
          ) : null}
        </label>

        <label className="text-sm text-brand-muted">
          {labels.subject}
          <input
            className="input-base mt-1"
            value={values.subject}
            onChange={(event) => setValues((prev) => ({ ...prev, subject: event.target.value }))}
            aria-invalid={Boolean(errors.subject)}
            aria-describedby={errors.subject ? "contact-subject-error" : undefined}
            required
          />
          {errors.subject ? (
            <span id="contact-subject-error" className="mt-1 block text-xs text-red-300" role="alert">
              {errors.subject}
            </span>
          ) : null}
        </label>

        <label className="text-sm text-brand-muted">
          {labels.message}
          <textarea
            className="input-base mt-1 min-h-36"
            value={values.message}
            onChange={(event) => setValues((prev) => ({ ...prev, message: event.target.value }))}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? "contact-message-error" : undefined}
            required
          />
          {errors.message ? (
            <span id="contact-message-error" className="mt-1 block text-xs text-red-300" role="alert">
              {errors.message}
            </span>
          ) : null}
        </label>

        <button type="submit" className="button-primary w-fit text-sm">
          {labels.submit}
        </button>

        {submitted ? (
          <p className="text-sm text-emerald-300" role="status">
            {labels.success}
          </p>
        ) : null}
      </form>
    </section>
  );
}
