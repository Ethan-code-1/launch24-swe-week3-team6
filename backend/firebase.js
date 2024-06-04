import {initializeApp} from "firebase/app";
import { getFirestore } from "firebase/firestore";


import serviceAccount from './permissions.json' assert { type: 'json' };


const app = initializeApp(serviceAccount);
const db = getFirestore(app);

export { db };
