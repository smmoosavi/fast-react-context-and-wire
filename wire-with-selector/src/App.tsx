import {
  useSelector,
  useWire,
  useWireValue,
  Wire,
} from "@forminator/react-wire";
import React, { createContext, useCallback, useContext } from "react";

type State = { first: string; last: string };
const StoreContext = createContext<Wire<State> | undefined>(undefined);

function useFieldSelector(state$: Wire<State>, field: "first" | "last") {
  return useSelector(
    {
      get({ get }) {
        return get(state$)[field];
      },
      set({ get, set }, value) {
        const state = get(state$);
        set(state$, { ...state, [field]: value });
      },
    },
    [state$, field]
  );
}

const TextInput = ({ field }: { field: "first" | "last" }) => {
  const state$ = useContext(StoreContext)!;
  const value$ = useFieldSelector(state$, field);
  const value = useWireValue(value$);
  return (
    <div className="field">
      {field}:{" "}
      <input
        value={value}
        onChange={(e) => {
          const state = state$.getValue();

          value$.setValue(e.target.value);
        }}
      />
    </div>
  );
};

const Display = ({ field }: { field: "first" | "last" }) => {
  const state$ = useContext(StoreContext)!;
  const value$ = useFieldSelector(state$, field);
  const value = useWireValue(value$);
  return (
    <div className="value">
      {field}: {value}
    </div>
  );
};

const FormContainer = () => {
  return (
    <div className="container">
      <h5>FormContainer</h5>
      <TextInput field="first" />
      <TextInput field="last" />
    </div>
  );
};

const DisplayContainer = () => {
  return (
    <div className="container">
      <h5>DisplayContainer</h5>
      <Display field="first" />
      <Display field="last" />
    </div>
  );
};

const ContentContainer = () => {
  return (
    <div className="container">
      <h5>ContentContainer</h5>
      <FormContainer />
      <DisplayContainer />
    </div>
  );
};

function App() {
  const state$ = useWire(null, { first: "", last: "" });
  return (
    <StoreContext.Provider value={state$}>
      <div className="container">
        <h5>App</h5>
        <ContentContainer />
      </div>
    </StoreContext.Provider>
  );
}

export default App;
