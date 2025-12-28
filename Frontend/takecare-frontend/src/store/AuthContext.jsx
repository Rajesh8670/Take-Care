// src/store/AuthContext.jsx
import { createContext, useReducer, useEffect } from "react";
import {
  getOtpFromServer,
  checkOtpWithServer,
  CreateAccountInServer,
  loginToServer,
  resetPassword,
} from "../../service/AuthService";

export const AuthContext = createContext({
  signupData: {},
  isLogin: false,
  user: null,
  token: null,
  setSignupData: () => {},
  verifyOtp: () => {},
  createAccount: () => {},
  logIn: () => {},
  logout: () => {},
  resetAuth: () => {},
});

const initialState = {
  signupData: {},
  isLogin: !!localStorage.getItem("token"),
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: localStorage.getItem("token") || null,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case "SET_SIGNUP_DATA":
      return { ...state, signupData: action.payload };
    case "SET_LOGIN":
      return {
        ...state,
        isLogin: true,
        user: action.payload.user,
        token: action.payload.token,
      };
    case "SET_LOGOUT":
      return { signupData: {}, isLogin: false, user: null, token: null };
    case "RESET_AUTH":
      return { signupData: {}, isLogin: false, user: null, token: null };
    default:
      return state;
  }
};

const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Persist login info in localStorage
  useEffect(() => {
    if (state.isLogin && state.token && state.user) {
      localStorage.setItem("token", state.token);
      localStorage.setItem("user", JSON.stringify(state.user));
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  }, [state.isLogin, state.token, state.user]);

  const setSignupData = async (data) => {
    const res = await getOtpFromServer(data);
    dispatch({ type: "SET_SIGNUP_DATA", payload: data });
    return res;
  };

  const verifyOtp = async (userOtp) => {
    try {
      const email = state.signupData.email;
      if (!email) {
        return { isVerified: false, message: "Email not found. Please signup again." };
      }
      const res = await checkOtpWithServer({ userOtp, email });
      return res;
    } catch (error) {
      return { isVerified: false, message: error.message };
    }
  };

  const createAccount = async (data) => {
    try {
      const res = await CreateAccountInServer(data);
      return res;
    } catch (error) {
      return { status: 500, message: error.message };
    }
  };

  const logIn = async (data) => {
    try {
      const res = await loginToServer(data);
      if (res.session?.isLogin) {
        dispatch({
          type: "SET_LOGIN",
          payload: { user: res.user, token: res.token },
        });
      }
      return res;
    } catch (error) {
      return { status: 500, message: error.message };
    }
  };

  const logout = () => {
    dispatch({ type: "SET_LOGOUT" });
  };

  const resetAuth = async (data) => {
    const res = await resetPassword(data);
    if (res.status === 201) {
      dispatch({ type: "RESET_AUTH" });
    }
    return res;
  };

  return (
    <AuthContext.Provider
      value={{
        signupData: state.signupData,
        isLogin: state.isLogin,
        user: state.user,
        token: state.token,
        setSignupData,
        verifyOtp,
        createAccount,
        logIn,
        logout,
        resetAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
