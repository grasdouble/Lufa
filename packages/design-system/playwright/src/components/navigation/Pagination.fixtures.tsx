import { useState } from 'react';

import { Pagination } from '@grasdouble/lufa_design-system';

// Test wrapper for React state integration
export const PaginationWithState = () => {
  const [currentPage, setCurrentPage] = useState(1);
  return (
    <>
      <Pagination total={100} current={currentPage} onChange={setCurrentPage} />
      <div data-testid="current-page">Current: {currentPage}</div>
    </>
  );
};
