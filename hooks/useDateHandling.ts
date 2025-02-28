import { formatDateForInput, formatDateForAPI } from '../utils/dateUtils';

export const useDateHandling = () => {
  const formatDates = (values: any, direction: 'toAPI' | 'fromAPI') => {
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

  const handleDateChange = (setFieldValue: (field: string, value: any) => void) => 
    (name: string) => (date: Date | null) => {
      setFieldValue(name, date);
    };

  return {
    formatDates,
    handleDateChange
  };
}; 