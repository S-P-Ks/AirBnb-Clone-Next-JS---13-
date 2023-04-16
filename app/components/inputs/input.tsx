"use client";
import React from "react";
import {
  FieldError,
  FieldErrors,
  FieldValues,
  UseFormRegister,
} from "react-hook-form";

interface InputProps {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  formatPrice?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  error: FieldErrors;
}

const input = () => {
  return <div></div>;
};

export default input;
