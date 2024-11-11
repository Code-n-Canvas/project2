import { validateForm } from "$lib/formValidator";
import { describe, it, expect } from "vitest";

describe('Form Validation', () => {
  it('should return errors for empty fields in contact form', () => {
    const errors = validateForm('', '', '', '', '');
    expect(errors).toEqual({
      name: "Name is required.",
      email: "Email is required.",
      phoneNumber: "Phone number is required.",
      address: "Address is required.",
      reason: "Reason for contact is required.",
    });
  });

  it('should return errors for empty fields in shop form', () => {
    const errors = validateForm('', '', '', '', '', true);
    expect(errors).toEqual({
      name: "Name is required.",
      email: "Email is required.",
      phoneNumber: "Phone number is required.",
      address: "Address is required.",
    });
  });

  it('should return an error for invalid email', () => {
    const errors = validateForm('John Doe', 'invalid-email', '1234567890', '123 Main St', 'General Inquiry');
    expect(errors.email).toBe("Email is invalid.");
  });

  it('should return no errors for valid shop form inputs', () => {
    const errors = validateForm('John Doe', 'john@example.com', '1234567890', '123 Main St', '', true);
    expect(errors).toEqual({});
  });

  it('should return no errors for valid contact form inputs', () => {
    const errors = validateForm('John Doe', 'john@example.com', '1234567890', '123 Main St', 'General Inquiry');
    expect(errors).toEqual({});
  });
});