import React from "react";
import { render } from "@testing-library/react";
import App from "./App";
import ContactForm from "./components/ContactForm";

test("renders App without crashing", () => {
  render(<App />);
});

test("renders ContactForm without crashing", () => {
  const { getByTestId } = render(<ContactForm />);
  const form = getByTestId("contact-form");
  expect(form).toBeInTheDocument();
});

test("properly validates First Name field", () => {
  const { getByText } = render(<ContactForm />);
  const firstName = getByText(/First Name*/i);
  expect(firstName).toHaveValue('Darren');
});