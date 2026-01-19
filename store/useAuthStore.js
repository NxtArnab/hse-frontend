import { create } from 'zustand';

const useAuthStore = create((set) => ({
    user: null,
    isAuthenticated: false,
    loading: true,

    verify: async () => {

        set({ loading: true })

        // mock api call for verifying already loggedin user
        await new Promise((resolve) => {
            setTimeout(() => {
                resolve(true)
            }, 800)
        })

        set({ loading: false, user: { name: 'Ashish' }, isAuthenticated: true })
    },

    login: async (userData) => {
        set({ loading: true })

        // mock api call for login
        await new Promise((resolve) => {
            setTimeout(() => {
                resolve(true)
            }, 3000)
        })

        set({ loading: false, user: { name: 'Ashish' }, isAuthenticated: true })
    },

    logout: async () => {
        set({ loading: true })

        // mock api call for logout
        await new Promise((resolve) => {
            setTimeout(() => {
                resolve(true)
            }, 3000)
        })

        set({ loading: false, user: null, isAuthenticated: false })
    },
}));

export default useAuthStore;
