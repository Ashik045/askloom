import { Action, State } from "@/types.global";

/**
 * The Reducer function updates the state based on dispatched actions.
 * @param {State} state - The current state of the application.
 * @param {Action} action - An object representing the dispatched action.
 * @returns The updated state object based on the action type.
 */
export const Reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        ...state,
        user: null,
        isLoading: true,
        error: null,
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        user: action.payload,
        isLoading: false,
        error: null,
      };
    case "LOGIN_FAILURE":
      return {
        ...state,
        user: null,
        isLoading: false,
        error: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
        isLoading: false,
        error: null,
      };
    case "USER_UPDATE_START":
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case "USER_UPDATE_SUCCESS":
      return {
        ...state,
        user: action.payload,
        isLoading: false,
        error: null,
      };
    case "USER_UPDATE_FAILURE":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
