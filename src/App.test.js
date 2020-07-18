import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
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

test("properly validates First Name field", async () => {
  const { getByPlaceholderText, queryByText } = render(<ContactForm />);
  const firstName = getByPlaceholderText("Edd");

  fireEvent.change(firstName, { target: { value: "Darr" }});
  expect(firstName).toHaveValue("Darr");

  fireEvent.blur(firstName);
  
  await waitFor(() => {
    const error = queryByText("Looks like there was an error: maxLength");
    expect(error).not.toBeNull();
  });

  /*NOTE: This test is passing meaning that the firstName validation is incorrect*/
});

test("properly validates Last Name field", async () => {
  const { getByPlaceholderText, queryByText } = render(<ContactForm />);

  const lastName = getByPlaceholderText("Burke");

  fireEvent.change(lastName, { target: { value: "Tebo" }});
  expect(lastName).toHaveValue("Tebo");

  fireEvent.blur(lastName);

  await waitFor(() => {
    const error = queryByText("Looks like there was an error: required");
    expect(error).toBeNull();
  });
});