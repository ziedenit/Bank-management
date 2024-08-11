dateInferieureAujourdhuiValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    // Log the control value for debugging
    console.log('Control value:', value);

    // Ensure the value is a string and trim any whitespace
    if (typeof value !== 'string') {
      return null; // If not a string, skip validation
    }

    const trimmedValue = value.trim();
    const currentYear = new Date().getFullYear();
    const inputYear = parseInt(trimmedValue, 10);

    // Log the parsed value and current year
    console.log('Parsed year:', inputYear);
    console.log('Current year:', currentYear);

    if (isNaN(inputYear) || inputYear > currentYear) {
      return { invalidDate: true };
    }

    return null;
  };
}
