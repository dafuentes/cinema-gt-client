import { useEffect, useMemo, useReducer } from "react";
import { useNavigate } from "react-router-dom";

function createAction(type, payload) {
  return {
    type,
    payload,
  };
}

export function useAuth(defaultState) {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case "RESTORE_USER":
          return {
            ...prevState,
            user: action.payload,
            isLoading: false,
          };
        case "SIGN_IN":
          return {
            ...prevState,
            isSignout: false,
            user: action.payload,
            isLoading: false,
          };
        case "SIGN_OUT":
          return {
            ...prevState,
            isSignout: true,
            user: null,
          };
        case "SET_LOADING":
          return {
            ...prevState,
            isLoading: action.payload,
          };
        default:
          return prevState;
      }
    },
    {
      isLoading: true,
      isSignout: false,
      user: defaultState,
    }
  );

  const auth = useMemo(
    () => ({
      login: (data) => {
        localStorage.setItem("USER", JSON.stringify(data));
        dispatch(createAction("SIGN_IN", data));
        navigate("/dashboard/welcome", { replace: true });
      },
      logout: async () => {
        localStorage.removeItem("USER");
        dispatch(createAction("SIGN_OUT", null));
        navigate("/", { replace: true });
      },
    }),
    []
  );
  return { auth, state };
}
