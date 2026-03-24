import { useMemo } from 'react';
import { type Employee } from './data';

function useEmployeeFilter(
  employees: Employee[],
  department: string,
  statuses: string[]
): Employee[] {
  const filtered = useMemo(() => {
    // TODO: Fix the bug causing this hook to always return all employees when filtering by department
    let result =
      department === 'All'
        ? employees
        : employees.filter(emp => emp.department === department);

    if (statuses.length > 0)
      result = result.filter(emp => statuses.includes(emp.status));

    return result;
  }, [employees, department, statuses]);

  return filtered;
}

export default useEmployeeFilter;
