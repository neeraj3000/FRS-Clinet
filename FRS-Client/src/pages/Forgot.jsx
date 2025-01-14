import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Link } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object({
  email: yup
    .string()
    .email('Invalid email format')
    .required('Email is required'),
});

const ForgotPassword = () => {
  const [message, setMessage] = useState('');
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
      // Replace with your backend call to send the reset link
      // Example:
      // axios.post('/setpassword', { email: values.email })
      //   .then(response => {
      //     setMessage('Password reset link sent to your email!');
      //   })
      //   .catch(error => {
      //     setMessage('There was an error sending the reset link.');
      //   });

      // Simulating the success message for now
      setMessage('Password reset link sent to your email!');
    },
  });

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* FRS Heading */}
      <Typography variant="h4" sx={{ mb: 10 }}>
        FACE RECOGNITION SYSTEM
      </Typography>

      <Box
        sx={{
          maxWidth: 400,
          width: '100%',
          p: 3,
          boxShadow: 3,
          borderRadius: 2,
        }}
      >
        <Typography variant="h5" gutterBottom>
          Forgot Password
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            name="email"
            label="Email"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <Button
            fullWidth
            variant="contained"
            type="submit"
            sx={{ mt: 2 }}
          >
            Send Link
          </Button>

          {message && (
            <Typography sx={{ mt: 2, color: message.includes('error') ? 'red' : 'green' }} variant="body2">
              {message}
            </Typography>
          )}

          {/* Back to Login Link */}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <Link href="/login" variant="body2">
              Back to Login
            </Link>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default ForgotPassword;
