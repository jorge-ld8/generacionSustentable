import { ActionA1FormData } from '../services/ActionA1Service';
import { formatDateForInput, formatDateForAPI } from '../utils/dateUtils';

export const useDateHandling = () => {
  const formatDates = (values: ActionA1FormData, direction: 'toAPI' | 'fromAPI') => {
    if (direction === 'toAPI') {
      return {
        ...values,
        fecha_inicio: values.fecha_inicio instanceof Date 
          ? formatDateForAPI(values.fecha_inicio) 
          : String(values.fecha_inicio),
        fecha_final: values.fecha_final instanceof Date 
          ? formatDateForAPI(values.fecha_final) 
          : String(values.fecha_final)
      };
    } else {
      return {
        ...values,
        fecha_inicio: values.fecha_inicio ? formatDateForInput(values.fecha_inicio) : '',
        fecha_final: values.fecha_final ? formatDateForInput(values.fecha_final) : ''
      };
    }
  };

  const handleDateChange = (setFieldValue: (field: string, value: Date | string) => void) => 
    (name: string) => (date: Date | null) => {
      setFieldValue(name, date);
    };

  return {
    formatDates,
    handleDateChange
  };
}; 