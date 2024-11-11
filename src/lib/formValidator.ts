export interface ValidationErrors {
  name?: string;
  email?: string;
  phoneNumber?: string;
  address?: string;
  reason?: string;
}

export function validateForm(
  name: string,
  email: string,
  phoneNumber: string,
  address: string,
  reason: string = '',
  isShopForm: boolean = false,
): ValidationErrors {
  const errors: ValidationErrors = {};

  if (!name.trim()) {
    errors.name = "Name is required.";
  }

  if (!email.trim()) {
    errors.email = "Email is required.";
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    errors.email = "Email is invalid.";
  }

  if (!phoneNumber.trim()) {
    errors.phoneNumber = "Phone number is required.";
  } else if (!/^\d{10}$/.test(phoneNumber.replace(/\D/g, ""))) {
    errors.phoneNumber = "Phone number must be exactly 10 digits long.";
  }

  if (!address.trim()) {
    errors.address = "Address is required.";
  }

  if (!isShopForm && !reason.trim()) {
    errors.reason = "Reason for contact is required.";
  }

  return errors;
}
