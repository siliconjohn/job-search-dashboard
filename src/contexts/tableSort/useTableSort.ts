import { useContext } from 'react';
import { TableSortContext } from './TableSortTypes';

export const useTableSortContext = () => {
  const context = useContext(TableSortContext);
  if (!context) throw new Error('useTableSortContext must be used within a TableSortProvider');
  return context;
};
