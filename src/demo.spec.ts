import { validateForm } from "$lib/formValidator";
import { describe, it, expect } from "vitest";

describe('Form Validation', () => {
  it('should return errors for empty fields', () => {
    const errors = validateForm('', '', '', '');
    expect(errors).toEqual({
      name: "Name is required.",
      email: "Email is required.",
      phoneNumber: "Phone number is required.",
      address: "Address is required."
    });
  });

  it('should return an error for invalid email', () => {
    const errors = validateForm('John Doe', 'invalid-email', '1234567890', '123 Main St');
    expect(errors.email).toBe("Email is invalid.");
  });

  it('should return an error for invalid phone number', () => {
    const errors = validateForm('John Doe', 'john@example.com', '12345', '123 Main St');
    expect(errors.phoneNumber).toBe("Phone number must be exactly 10 digits long.");
  });

  it('should return no errors for valid inputs', () => {
    const errors = validateForm('John Doe', 'john@example.com', '1234567890', '123 Main St');
    expect(errors).toEqual({});
  });
});