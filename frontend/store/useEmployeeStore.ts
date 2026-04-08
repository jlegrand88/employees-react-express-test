import { create } from 'zustand';

interface Employee {
  id: number;
  name: string;
  email: string;
  position: string;
  department: string;
  salary: number;
  hiredate: string;
  avatar?: string;
}

interface EmployeeState {
  employees: Employee[];
  selectedEmployee: Employee | null;
  loading: boolean;
  error: string | null;
  fetchEmployees: () => Promise<void>;
  fetchEmployeeById: (id: number) => Promise<void>;
  clearSelected: () => void;
}

export const useEmployeeStore = create<EmployeeState>((set) => ({
  employees: [],
  selectedEmployee: null,
  loading: false,
  error: null,

  fetchEmployees: async () => {
    set({ loading: true, error: null });
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/employees`);
      if (!res.ok) throw new Error('Error al conectar con el servidor');
      const data = await res.json();
      set({ employees: data, loading: false });
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  fetchEmployeeById: async (id: number) => {
    set({ loading: true });
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/employees/${id}`);
      const data = await res.json();
      set({ selectedEmployee: data, loading: false });
    } catch (err) {
      set({ error: 'No se pudo cargar el detalle', loading: false });
    }
  },

  clearSelected: () => set({ selectedEmployee: null }),
}));