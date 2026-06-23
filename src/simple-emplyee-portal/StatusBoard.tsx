import { useState } from 'react';
import employees from './data';
import useEmployeeFilter from './useEmployeeFilter';
import { type Employee } from './data';

const STATUSES = ['active', 'inactive', 'on-leave'];

function StatusBoard() {
  const [department, setDepartment] = useState<string>('All');
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);

  // TODO: Derive the list of unique department values from the employees mock data,
  // then prepend "All" to build the options for the department dropdown.
  // Do not hardcode the department list.
  const uniqDep: string[] = ['All'];
  for (const emp of employees) {
    // if (uniqDep.indexOf(emp.department) === -1) uniqDep.push(emp.department);
    if (!uniqDep.includes(emp.department)) uniqDep.push(emp.department);
  }
  console.log('unique Dep', uniqDep);

  // TODO: Pass department and selectedStatuses to useEmployeeFilter and use the result below
  const filtered = useEmployeeFilter(employees, department, selectedStatuses);

  return (
    <div>
      <h1>Employee Status Board</h1>
      <label htmlFor="department-select">Filter by department: </label>
      <select
        id="department-select"
        value={department}
        onChange={e => setDepartment(e.target.value)}
      >
        {uniqDep.map((uDep, idx) => (
          <option key={idx}>{uDep}</option>
        ))}
      </select>

      <fieldset>
        <legend>Filter by status:</legend>
        {/* TODO: Render a labelled checkbox for each entry in STATUSES.
            When checked, add the status to selectedStatuses; when unchecked, remove it. */}
        {STATUSES.map((state, idx) => (
          <label key={idx}>
            {state}
            <input
              type="checkbox"
              key={idx}
              value={state}
              onChange={() => {
                // if (selectedStatuses.indexOf(state) === -1) {
                if (!selectedStatuses.includes(state)) {
                  setSelectedStatuses(prev => [...prev, state]);
                } else
                  setSelectedStatuses(prev =>
                    prev.filter(sta => sta !== state)
                  );
              }}
              checked={selectedStatuses.includes(state)}
            ></input>
          </label>
        ))}
      </fieldset>

      <ul>
        {filtered.map((emp: Employee) => (
          <li key={emp.id}>
            {emp.name} — {emp.department} | {emp.status}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StatusBoard;
