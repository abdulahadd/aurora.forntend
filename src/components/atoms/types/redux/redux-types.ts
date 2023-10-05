
export default interface userState{
    _id:'';
    username: string;
    password: string;
    token: string;
    role: string;
    orgId: string;
    isLoggedIn: boolean
}

interface PersistedState extends userState {
    _persist: {
      version: number;
      rehydrated: boolean;
    };
  }