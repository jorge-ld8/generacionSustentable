import { useFormik, FormikHelpers } from 'formik';
import { ActionA1ValidationSchema } from '../utils/validationSchemas';
import { ActionA1FormData } from '../services/ActionA1Service';

export const useActionForm = (
  initialValues: ActionA1FormData,
  onSubmit: (values: ActionA1FormData) => Promise<void>
) => {
  return useFormik({
    initialValues,
    validationSchema: ActionA1ValidationSchema,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: async (values, helpers: FormikHelpers<ActionA1FormData>) => {
      await onSubmit(values);
      helpers.setSubmitting(false);
    },
  });
}; 