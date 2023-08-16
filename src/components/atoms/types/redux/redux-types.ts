
export default interface userState{
    username: string;
    password: string;
    token: string;
    role: string;
    isLoggedIn: boolean
}

interface PersistedState extends userState {
    _persist: {
      version: number;
      rehydrated: boolean;
    };
  }