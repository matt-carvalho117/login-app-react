import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import {
        signOut,
        signInWithEmailAndPassword,
        createUserWithEmailAndPassword,
        sendPasswordResetEmail
} from "firebase/auth";


const firebaseConfig = {
        apiKey: "AIzaSyBCHh9bCK42TenzhCV4fp6V7-RYYMdl2BI",
        authDomain: "login-react-75f97.firebaseapp.com",
        projectId: "login-react-75f97",
        storageBucket: "login-react-75f97.firebasestorage.app",
        messagingSenderId: "447841659347",
        appId: "1:447841659347:web:6f408783ef235671762726"
};
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const registrar = async (email, senha) => {
        try {
                await createUserWithEmailAndPassword(
                        auth,
                        email,
                        senha
                );
                alert("Usuário registrado com sucesso!");
        } catch (error) {
                alert("Erro: " + error.message);
        }
};

export const login = async (email, senha) => {
        try {
                await signInWithEmailAndPassword(auth, email, senha);
                alert("Login realizado!");
        } catch (error) {
                alert("Erro: " + error.message);
        }
};

export const reset = async (email, senha) => {
        try {
                await sendPasswordResetEmail(auth, 'user@example.com', actionCodeSettings);
                alert("Email enviado!");
        } catch (error) {
                alert("Erro: " + error.message);
        }
};

export const logout = async () => {
        await signOut(auth);
};