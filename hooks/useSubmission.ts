import { useState } from 'react';
import { useRouter } from 'next/router';
import { ActionA1FormData } from '../services/actionA1Service';
import { actionA1 } from '@prisma/client';

interface SubmissionHook {
  isSubmitting: boolean;
  error: string | null;
  handleSubmit: (values: ActionA1FormData) => Promise<void>;
}

interface SubmissionOptions {
  onSubmit: (values: ActionA1FormData) => Promise<actionA1>;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
  redirectPath?: string;
}

export const useSubmission = ({
  onSubmit,
  onSuccess,
  onError,
  redirectPath
}: SubmissionOptions): SubmissionHook => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (values: ActionA1FormData) => {
    setIsSubmitting(true);
    setError(null);
    
    try {
      await onSubmit(values);
      
      if (onSuccess) {
        onSuccess();
      }
      
      if (redirectPath) {
        router.push(redirectPath);
      }
    } catch (err) {
      console.error("Error during submission:", err);
      const errorMessage = err instanceof Error 
        ? err.message 
        : "Ocurrió un error. Por favor, inténtelo de nuevo.";
      
      setError(errorMessage);
      
      if (onError) {
        onError(err);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isSubmitting,
    error,
    handleSubmit
  };
}; 