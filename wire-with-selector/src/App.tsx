import { useWire, useWireValue, Wire } from "@forminator/react-wire";
import React, { createContext, useCallback, useContext } from "react";

type State = { first: string; last: string };
const StoreContext = createContext<Wire<State> | undefined>(undefined);

const TextInput = ({ field }: { field: "first" | "last" }) => {
  const state$ = useContext(StoreContext)!;
  const state = useWireValue(state$);
  const value = state[field];
  return (
    <div className="field">
      {field}:{" "}
      <input
        value={value}
        onChange={(e) => {
          const state = state$.getValue();

          state$.setValue({ ...state, [field]: e.target.value });
        }}
      />
    </div>
  );
};

const Display = ({ field }: { field: "first" | "last" }) => {
  const state$ = useContext(StoreContext)!;
  const state = useWireValue(state$);
  const value = state[field];
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
