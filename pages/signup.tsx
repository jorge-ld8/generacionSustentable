import React, { useState } from 'react';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import MenuItem from '@mui/material/MenuItem';
import { organizaciones } from '../lib/constants';
import { signupValidationSchema } from '../utils/validationSchemas';
import styles from '../styles/Signup.module.css';

interface SignupPageProps {
  error?: string;
}

const SignupPage: React.FC<SignupPageProps> = ({ error: serverError }) => {
  const router = useRouter();
  const { msg } = router.query;
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(serverError || (typeof msg === 'string' ? msg : null));

  const formik = useFormik({
    initialValues: {
      nombre: '',
      apellido: '',
      username: '',
      organizacion: '',
      password: '',
      passwordagain: ''
    },
    validationSchema: signupValidationSchema,
    onSubmit: async (values) => {
      await handleSubmit(values);
    },
  });

  const handleSubmit = async (values: typeof formik.values) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al registrar el usuario');
      }
      
      router.push('/login?msg=Registro exitoso. Por favor inicie sesión.');
    } catch (err) {
      console.error('Error en el registro:', err);
      setError(err instanceof Error ? err.message : 'Error al registrar el usuario');
    } finally {
      setIsSubmitting(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Registrar Usuario</h1>
      
      {error && (
        <div className={styles.errorContainer}>
          <p className={styles.errorMessage}>{error}</p>
        </div>
      )}
      
      <form onSubmit={formik.handleSubmit} className={styles.form}>
        <ul className={styles.formList}>
          <li className={styles.formItem}>
            <TextField
              fullWidth
              id="nombre"
              name="nombre"
              label="Nombre"
              variant="outlined"
              value={formik.values.nombre}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.nombre && Boolean(formik.errors.nombre)}
              helperText={formik.touched.nombre && formik.errors.nombre}
            />
          </li>
          
          <li className={styles.formItem}>
            <TextField
              fullWidth
              id="apellido"
              name="apellido"
              label="Apellido"
              variant="outlined"
              value={formik.values.apellido}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.apellido && Boolean(formik.errors.apellido)}
              helperText={formik.touched.apellido && formik.errors.apellido}
            />
          </li>
          
          <li className={styles.formItem}>
            <TextField
              fullWidth
              id="username"
              name="username"
              label="Nombre de Usuario"
              variant="outlined"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
            />
          </li>
          
          <li className={styles.formItem}>
            <TextField
              fullWidth
              select
              id="organizacion"
              name="organizacion"
              label="Organización"
              variant="outlined"
              value={formik.values.organizacion}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.organizacion && Boolean(formik.errors.organizacion)}
              helperText={formik.touched.organizacion && formik.errors.organizacion}
              InputProps={{
                style: { textAlign: 'left' }
              }}
              SelectProps={{
                MenuProps: {
                  anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'left'
                  }
                }
              }}
            >
              {organizaciones.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </li>
          
          <li className={styles.formItem}>
            <TextField
              fullWidth
              id="password"
              name="password"
              label="Contraseña"
              type={showPassword ? 'text' : 'password'}
              variant="outlined"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={togglePasswordVisibility}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </li>
          
          <li className={styles.formItem}>
            <TextField
              fullWidth
              id="passwordagain"
              name="passwordagain"
              label="Confirmar Contraseña"
              type={showConfirmPassword ? 'text' : 'password'}
              variant="outlined"
              value={formik.values.passwordagain}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.passwordagain && Boolean(formik.errors.passwordagain)}
              helperText={formik.touched.passwordagain && formik.errors.passwordagain}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={toggleConfirmPasswordVisibility}
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </li>
        </ul>
        
        <div className={styles.buttonContainer}>
          <Button
            type="submit"
            variant="contained"
            color="success"
            disabled={!(formik.isValid && formik.dirty) || isSubmitting}
            className={styles.submitButton}
          >
            {isSubmitting ? 'Registrando...' : 'Registrar'}
          </Button>
        </div>
      </form>
      
      <div className={styles.loginLink}>
        ¿Ya tienes una cuenta? <Link href="/login">Iniciar Sesión</Link>
      </div>
    </div>
  );
};

export default SignupPage;