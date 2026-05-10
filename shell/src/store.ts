import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

// ── Auth Slice ──────────────────────────────────────────────────
interface AuthState {
  user: { id: string; name: string; role: string } | null;
  isAuthenticated: boolean;
  token: string | null;
}

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, isAuthenticated: false, token: null } as AuthState,
  reducers: {
    login: (state, action: PayloadAction<AuthState['user'] & { token: string }>) => {
      state.user = { id: action.payload!.id, name: action.payload!.name, role: action.payload!.role };
      state.token = action.payload!.token;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
  },
});

// ── UI Slice ─────────────────────────────────────────────────────
interface UIState {
  theme: 'light' | 'dark';
  sidebarOpen: boolean;
  notifications: { id: string; message: string; type: 'info' | 'warning' | 'error' }[];
}

const uiSlice = createSlice({
  name: 'ui',
  initialState: { theme: 'light', sidebarOpen: true, notifications: [] } as UIState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    addNotification: (state, action: PayloadAction<UIState['notifications'][0]>) => {
      state.notifications.push(action.payload);
    },
    removeNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter(n => n.id !== action.payload);
    },
  },
});

// ── Store ────────────────────────────────────────────────────────
export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    ui: uiSlice.reducer,
  },
});

export const { login, logout } = authSlice.actions;
export const { toggleTheme, toggleSidebar, addNotification, removeNotification } = uiSlice.actions;

// ── Typed Hooks ──────────────────────────────────────────────────
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
