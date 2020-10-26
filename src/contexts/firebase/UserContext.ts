import { User } from "firebase";
import { createContext, Dispatch, SetStateAction } from "react";

interface UserContextType {
	user: User | undefined;
	setUser: Dispatch<SetStateAction<User | undefined>>;
}

export const UserContext = createContext<UserContextType>({
	user: undefined,
	setUser: () => {},
});
