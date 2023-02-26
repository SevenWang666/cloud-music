import React, { createContext, useReducer } from "react";
import { fromJS } from "immutable";
export const DataContext = createContext({});

// 相当于之前的 constants
export const CHANGE_CATEGORY = "singers/CHANGE_CATEGORY";
export const CHANGE_ALPHA = "singers/CHANGE_ALPHA";
export const CHANGE_AREA = "singers/CHANGE_AREA";

//reducer 纯函数
const reducer = (state, action) => {
  switch (action.type) {
    case CHANGE_CATEGORY:
      return state.set("category", action.data);
    case CHANGE_ALPHA:
      return state.set("alpha", action.data);
    case CHANGE_AREA:
      return state.set("area", action.data);
    default:
      return state;
  }
};

export const ProviderData = (props) => {
  const [data, dispatch] = useReducer(
    reducer,
    fromJS({
      category: "",
      alpha: "",
      area: "",
    })
  );

  return (
    <DataContext.Provider value={{ data, dispatch }}>
      {props.children}
    </DataContext.Provider>
  );
};
