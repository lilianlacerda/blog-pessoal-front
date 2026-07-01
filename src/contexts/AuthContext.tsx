import { createContext, useState, type ReactNode } from "react";

import type UsuarioLogin from "../models/UsuarioLogin";
import { login } from "../services/Service";

//Iniciar o contexto
interface AuthContextProps {
  usuario: UsuarioLogin;
  handleLogout(): void;
  handleLogin(usuario: UsuarioLogin): Promise<void>;
  isLoading: boolean;
}

// children => Uma tag filha que está dentro de alguma tag
interface AuthProviderProps {
  children: ReactNode;
}

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext({} as AuthContextProps);

// Provider => provedor que vai fornecer as informações
export function AuthProvider({ children }: AuthProviderProps) {
  const [usuario, setUsuario] = useState<UsuarioLogin>({
    id: 0,
    nome: "",
    usuario: "",
    senha: "",
    foto: "",
    token: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  async function handleLogin(usuarioLogin: UsuarioLogin) {
    setIsLoading(true);
    try {
      await login(`/usuarios/logar`, usuarioLogin, setUsuario);
      alert("O usuário foi autenticado com sucesso!");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      alert("Os dados do usuário estão inconsistentes!");
    }
    setIsLoading(false);
  }

  function handleLogout() {
    setUsuario({
      id: 0,
      nome: "",
      usuario: "",
      senha: "",
      foto: "",
      token: "",
    });
  }

  return (
    <AuthContext.Provider
      value={{ usuario, handleLogin, handleLogout, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
}
