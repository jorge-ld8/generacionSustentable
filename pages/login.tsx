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
import { toast } from 'react-toastify';
import { loginValidationSchema } from '../utils/validationSchemas';
import styles from '../styles/Login.module.css';

interface LoginPageProps {
  setUser: (username: string) => void;
  error?: string;
}

const LoginPage: React.FC<LoginPageProps> = ({ setUser, error: serverError }) => {
  const router = useRouter();
  const { msg } = router.query;
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(serverError || (typeof msg === 'string' ? msg : null));

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: loginValidationSchema,
    onSubmit: async (values) => {
      await handleSubmit(values);
    },
  });

  const handleSubmit = async (values: typeof formik.values) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values)
      });

      if (!response.ok) {
        throw new Error("Usuario o contraseña incorrecta. Intente nuevamente.");
      }
      
      setUser(values.username);
      toast.success("Inicio de sesión exitoso", { 
        autoClose: 5000,
        position: "top-right",
        theme: "light",
      });
      router.push("/");
    } catch (err) {
      console.error('Error en el login:', err);
      setError(err instanceof Error ? err.message : 'Error al iniciar sesión');
      formik.resetForm();
    } finally {
      setIsSubmitting(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Iniciar Sesión</h1>
      
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
        </ul>
        
        <div className={styles.buttonContainer}>
          <Button
            type="submit"
            variant="contained"
            color="success"
            disabled={!(formik.isValid && formik.dirty) || isSubmitting}
            className={styles.submitButton}
          >
            {isSubmitting ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </Button>
        </div>
      </form>
      
      <div className={styles.signupLink}>
        ¿No tienes una cuenta? <Link href="/signup">Regístrate</Link>
      </div>
    </div>
  );
};

export default LoginPage;