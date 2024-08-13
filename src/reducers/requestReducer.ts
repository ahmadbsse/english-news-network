import { RootState } from "../rootReducer";
import { store } from "../store";
import { STATES } from "../interfaces";
import {
  AsyncThunk,
  AnyAction,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";

type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>;

type PendingAction = ReturnType<GenericAsyncThunk["pending"]>;
type RejectedAction = ReturnType<GenericAsyncThunk["rejected"]>;
type FulfilledAction = ReturnType<GenericAsyncThunk["fulfilled"]>;

const isPendingAction = (action: AnyAction): action is PendingAction => {
  return action.type.endsWith("/pending");
};
const isRejectedAction = (action: AnyAction): action is RejectedAction => {
  return action.type.endsWith("/rejected");
};
const isFulfilledAction = (action: AnyAction): action is FulfilledAction => {
  return action.type.endsWith("/fulfilled");
};

const actionsSelector = (state: RootState) => state.request.actions;

export const getShowLoader = (actionName?: string): boolean => {
  return createSelector(actionsSelector, (actions) => {
    if (actionName) {
      return actions[actionName]?.state === STATES.pending;
    } else {
      return !!Object.values(actions).find(
        ({ state }) => state === STATES.pending
      );
    }
  })(store.getState());
};

export const getActionState = (actionName: string): STATES => {
  return createSelector(
    actionsSelector,
    (actions) => actions[actionName]?.state
  )(store.getState());
};
export const getAction = (actionName: string): RequestState => {
  return createSelector(
    actionsSelector,
    (actions) => actions[actionName]
  )(store.getState());
};

export type RequestState = {
  state: STATES;
  success: "";
  error: "";
  data?: any;
};
export type RequestActions = {
  [actionName: string]: RequestState;
};

export interface LoadingState {
  actions: RequestActions;
  success: string;
  error: string;
}

export const initialState: LoadingState = {
  actions: {},
  success: "",
  error: "",
};

const requestSlice = createSlice({
  name: "requestSlice",
  initialState,
  reducers: {
    resetAction: (state, { payload }) => {
      delete state.actions[payload];
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(isPendingAction, (state, action) => {
      const actionName = action.type.split("/").slice(0, -1).join("/");
      state.actions[actionName] = {
        state: STATES.pending,
        success: "",
        error: "",
      };
      state.success = "";
      state.error = "";
    });
    builder.addMatcher(isRejectedAction, (state, action: AnyAction) => {
      const actionName = action.type.split("/").slice(0, -1).join("/");
      state.actions[actionName].state = STATES.failed;
      const error = action.payload?.errorText;

      if (state.actions[actionName]) {
        state.actions[actionName].error = error;
      }
      state.error = error;
    });
    builder.addMatcher(isFulfilledAction, (state, action: AnyAction) => {
      const { type, payload } = action;
      const actionName = type.split("/").slice(0, -1).join("/");
      const success = payload?.message || "";

      if (state.actions[actionName]) {
        state.actions[actionName].state = STATES.success;
        state.actions[actionName].success = state.success = success;
        if (payload?.data) state.actions[actionName].data = payload.data;
      }
    });
  },
});

export const { resetAction } = requestSlice.actions;

export default requestSlice.reducer;
