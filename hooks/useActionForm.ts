import { useFormik, FormikHelpers } from 'formik';
import { actionA1ValidationSchema } from '../utils/validationSchemas';
import { ActionA1FormData } from '../services/actionA1Service';

export const useActionForm = (
  initialValues: ActionA1FormData,
  onSubmit: (values: ActionA1FormData) => Promise<void>
) => {
  return useFormik({
    initialValues,
    validationSchema: actionA1ValidationSchema,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: async (values, helpers: FormikHelpers<ActionA1FormData>) => {
      await onSubmit(values);
      helpers.setSubmitting(false);
    },
  });
}; 