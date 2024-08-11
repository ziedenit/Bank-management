dateInferieureAujourdhuiValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value?.toString().trim();
    if (!value) {
      return null; // Skip validation for empty values
    }

    const currentYear = new Date().getFullYear();
    const inputYear = parseInt(value, 10);

    if (isNaN(inputYear) || inputYear > currentYear) {
      return { invalidDate: true };
    }

    return null;
  };
}
