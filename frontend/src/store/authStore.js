import { create } from 'zustand';
import axios from 'axios';

// Configure Axios Defaults
axios.defaults.baseURL = 'http://localhost:5000';
axios.defaults.withCredentials = true;

const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem('mockUser')) || null,
  isAuthenticated: !!localStorage.getItem('mockUser'),
  isLoading: false,
  error: null,

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      // Mock network delay
      await new Promise(r => setTimeout(r, 800));
      
      const mockUser = {
        _id: 'mock123',
        name: email.includes('admin') ? 'System Admin' : 'Volunteer User',
        email: email,
        role: email.includes('admin') ? 'admin' : 'volunteer'
      };
      
      localStorage.setItem('mockUser', JSON.stringify(mockUser));

      set({ 
        user: mockUser, 
        isAuthenticated: true, 
        isLoading: false,
        error: null 
      });
      return mockUser;
    } catch (error) {
      set({ error: 'Login failed', isLoading: false });
      throw error;
    }
  },

  register: async (name, email, password) => {
    set({ isLoading: true, error: null });
    try {
      // Mock network delay
      await new Promise(r => setTimeout(r, 800));
      
      const mockUser = {
        _id: 'mock123',
        name: name,
        email: email,
        role: 'volunteer'
      };

      localStorage.setItem('mockUser', JSON.stringify(mockUser));

      set({ 
        user: mockUser, 
        isAuthenticated: true, 
        isLoading: false,
        error: null 
      });
      return mockUser;
    } catch (error) {
      set({ error: 'Registration failed', isLoading: false });
      throw error;
    }
  },

  logout: async () => {
    set({ isLoading: true });
    try {
      // Mock network delay
      await new Promise(r => setTimeout(r, 500));
      
      localStorage.removeItem('mockUser');
      
      set({ user: null, isAuthenticated: false, isLoading: false });
    } catch (error) {
      set({ error: 'Logout failed', isLoading: false });
    }
  },

  checkAuth: async () => {
    set({ isLoading: true });
    try {
      const storedUser = JSON.parse(localStorage.getItem('mockUser'));
      if (storedUser) {
        set({ user: storedUser, isAuthenticated: true, isLoading: false });
      } else {
        set({ user: null, isAuthenticated: false, isLoading: false });
      }
    } catch (error) {
      set({ user: null, isAuthenticated: false, isLoading: false });
    }
  }
}));

export default useAuthStore;
