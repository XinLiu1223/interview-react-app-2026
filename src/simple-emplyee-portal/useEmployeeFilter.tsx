import { useMemo } from 'react';
import { type Employee } from './data';

function useEmployeeFilter(
  employees: Employee[],
  department: string,
  statuses: string[]
): Employee[] {
  const filtered = useMemo(() => {
    // TODO: Fix the bug causing this hook to always return all employees when filtering by department
    let result: Employee[];
    if (department === 'All') {
      result = employees;
    } else {
      result = employees.filter(emp => emp.department === department);
    }

    // TODO: If statuses is non-empty, further filter result to only include employees
    // whose status is in the statuses array
    if (statuses)
      result = employees.filter(emp => statuses.includes(emp.status));
    return result;
  }, [employees, department, statuses]);

  return filtered;
}

export default useEmployeeFilter;
