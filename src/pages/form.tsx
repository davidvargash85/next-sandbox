import {
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  Button,
  Container,
  CircularProgress,
  Typography
} from '@mui/material';
import React, { useState, useEffect } from 'react';

type FormData = {
  email: string;
  name: string;
  phone: string;
};

const postFormData = async (data: FormData) => {
  const res = await fetch(`http://localhost:3000/api/form`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  return res;
};

const Form = () => {
  // State to hold form data
  const [formData, setFormData] = useState<FormData>({
    email: '',
    name: '',
    phone: ''
  });

  // States to manage submission status, error messages, and field errors
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [fieldErrors, setFieldErrors] = useState({
    email: '',
    name: '',
    phone: ''
  });
  const [isFormValid, setIsFormValid] = useState(false); // Track form validity

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
    // Reset field-specific errors on change
    setFieldErrors((prevState) => ({
      ...prevState,
      [name]: ''
    }));
  };

  // Basic validations for each field
  const validateForm = () => {
    let isValid = true;
    const errors = { email: '', name: '', phone: '' };

    // Email validation (simple regex)
    if (!formData.email) {
      errors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is not valid';
      isValid = false;
    }

    // Name validation
    if (!formData.name) {
      errors.name = 'Name is required';
      isValid = false;
    }

    // Phone number validation (simple check for non-empty string)
    if (!formData.phone) {
      errors.phone = 'Phone number is required';
      isValid = false;
    } else if (!/^\d{10}$/.test(formData.phone)) {
      errors.phone = 'Phone number must be 10 digits';
      isValid = false;
    }

    setFieldErrors(errors);
    return isValid;
  };

  // Check form validity and update the submit button state
  useEffect(() => {
    const isValid = validateForm();
    setIsFormValid(isValid);
  }, [formData]);

  // Handle form submission with validation
  const onSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return; // Prevent submission if validation fails
    }

    setIsSubmitting(true);
    setSuccessMessage('');
    setErrorMessage('');

    try {
      const res = await postFormData(formData);

      if (res.ok) {
        setSuccessMessage('Form submitted successfully!');
        setFormData({ email: '', name: '', phone: '' }); // Reset form
      } else {
        setErrorMessage('Something went wrong, please try again.');
      }
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(
          'Network error, please try again later. ' + error.message
        );
      } else {
        setErrorMessage('An unexpected error occurred.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container maxWidth='md' sx={{ padding: 3 }}>
      <header>
        <Typography variant='h2' color='primary' sx={{ marginTop: 4 }}>
          Form Excercise
        </Typography>
      </header>
      <form onSubmit={onSubmitHandler}>
        {/* Email Input */}
        <FormControl fullWidth margin='normal' error={!!fieldErrors.email}>
          <InputLabel htmlFor='email-input'>Email address</InputLabel>
          <Input
            id='email-input'
            name='email'
            value={formData.email}
            onChange={handleInputChange}
            aria-describedby='email-helper-text'
          />
          <FormHelperText id='email-helper-text'>
            {fieldErrors.email || 'Will never share your email.'}
          </FormHelperText>
        </FormControl>

        {/* Name Input */}
        <FormControl fullWidth margin='normal' error={!!fieldErrors.name}>
          <InputLabel htmlFor='name-input'>Name</InputLabel>
          <Input
            id='name-input'
            name='name'
            value={formData.name}
            onChange={handleInputChange}
            aria-describedby='name-helper-text'
          />
          <FormHelperText id='name-helper-text'>
            {fieldErrors.name}
          </FormHelperText>
        </FormControl>

        {/* Phone Input */}
        <FormControl fullWidth margin='normal' error={!!fieldErrors.phone}>
          <InputLabel htmlFor='phone-input'>Phone number</InputLabel>
          <Input
            id='phone-input'
            name='phone'
            value={formData.phone}
            onChange={handleInputChange}
            aria-describedby='phone-helper-text'
          />
          <FormHelperText id='phone-helper-text'>
            {fieldErrors.phone}
          </FormHelperText>
        </FormControl>

        {/* Submit Button */}
        <Button
          type='submit'
          variant='contained'
          color='primary'
          disabled={isSubmitting || !isFormValid} // Disable button if not valid or submitting
          sx={{ marginTop: 2 }}
        >
          {isSubmitting ? (
            <CircularProgress size={24} color='inherit' />
          ) : (
            'Submit'
          )}
        </Button>
      </form>

      {/* Success or Error Message */}
      {successMessage && (
        <Typography variant='h6' color='success.main' sx={{ marginTop: 2 }}>
          {successMessage}
        </Typography>
      )}
      {errorMessage && (
        <Typography variant='h6' color='error.main' sx={{ marginTop: 2 }}>
          {errorMessage}
        </Typography>
      )}
    </Container>
  );
};

export default Form;
