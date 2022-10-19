import React from "react";

const TextInput = ({ field }: { field: "first" | "last" }) => {
  return (
    <div className="field">
      {field}: <input />
    </div>
  );
};

const Display = ({ field }: { field: "first" | "last" }) => {
  return (
    <div className="value">
      {field}: {""}
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
  return (
    <div className="container">
      <h5>App</h5>
      <ContentContainer />
    </div>
  );
}

export default App;
