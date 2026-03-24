export type Employee = {
  id: number;
  name: string;
  department: string;
  status: 'active' | 'inactive' | 'on-leave';
};

const employees: Employee[] = [
  { id: 1, name: 'Alice Chen', department: 'Design', status: 'active' },
  { id: 2, name: 'Jordan Park', department: 'Design', status: 'on-leave' },
  { id: 3, name: 'Marcus Webb', department: 'Engineering', status: 'active' },
  { id: 4, name: 'Priya Nair', department: 'Engineering', status: 'active' },
  { id: 5, name: 'Sam Torres', department: 'Engineering', status: 'inactive' },
  { id: 6, name: 'Dana Kim', department: 'HR', status: 'active' },
  { id: 7, name: 'Riley Osei', department: 'HR', status: 'on-leave' },
];

export default employees;
