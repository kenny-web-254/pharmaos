import { create } from 'zustand';
import { User, Organization, Branch } from '../types/index';

interface AuthStore {
  user: User | null;
  token: string | null;
  organization: Organization | null;
  selectedBranch: Branch | null;
  isAuthenticated: boolean;

  setAuth: (user: User, token: string) => void;
  setOrganization: (org: Organization) => void;
  setSelectedBranch: (branch: Branch) => void;
  logout: () => void;
  loadFromStorage: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  token: null,
  organization: null,
  selectedBranch: null,
  isAuthenticated: false,

  setAuth: (user, token) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    if (user.organization) {
      localStorage.setItem('organization', JSON.stringify(user.organization));
    }
    if (user.branch) {
      localStorage.setItem('selectedBranch', JSON.stringify(user.branch));
    }
    set({
      user,
      token,
      organization: user.organization || null,
      selectedBranch: user.branch || null,
      isAuthenticated: true,
    });
  },

  setOrganization: (org) => {
    localStorage.setItem('organization', JSON.stringify(org));
    set({ organization: org });
  },

  setSelectedBranch: (branch) => {
    localStorage.setItem('selectedBranch', JSON.stringify(branch));
    set({ selectedBranch: branch });
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('organization');
    localStorage.removeItem('selectedBranch');
    set({
      user: null,
      token: null,
      organization: null,
      selectedBranch: null,
      isAuthenticated: false,
    });
  },

  loadFromStorage: () => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    const organization = localStorage.getItem('organization');
    const selectedBranch = localStorage.getItem('selectedBranch');

    if (token && user) {
      set({
        token,
        user: JSON.parse(user),
        organization: organization ? JSON.parse(organization) : null,
        selectedBranch: selectedBranch ? JSON.parse(selectedBranch) : null,
        isAuthenticated: true,
      });
    }
  },
}));

// Provide a default export so files using default imports work as expected
export default useAuthStore;
