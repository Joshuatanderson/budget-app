import { createContext } from "react";

import {db} from "./db";

export const FirebaseContext = createContext(db);