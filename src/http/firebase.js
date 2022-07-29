import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyD89gdUuIS1tGM32uPFO5-fF3q2UaNXU_8",
	authDomain: "react-app-331de.firebaseapp.com",
	projectId: "react-app-331de",
	storageBucket: "react-app-331de.appspot.com",
	messagingSenderId: "811821185133",
	appId: "1:811821185133:web:caee986a36501aa4146764",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
