import { actionsA1, actionsA2, actionsA3, actionsA4, actionTypes } from '../lib/constants';

export const useActionTypes = () => {
  // Determine which action list to show based on selected type
  const getActionsList = (selectedType: string) => {
    switch(selectedType) {
      case actionTypes[0]:
        return actionsA1;
      case actionTypes[1]:
        return actionsA2;
      case actionTypes[2]:
        return actionsA3;
      case actionTypes[3]:
        return actionsA4;
      default:
        return [];
    }
  };

  return {
    actionTypes,
    getActionsList
  };
}; 