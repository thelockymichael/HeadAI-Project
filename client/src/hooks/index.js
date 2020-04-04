import { useState } from "react";

export const useField = type => {
  const [value, setValue] = useState("");

  const onChange = event => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange
  };
};

export const useKey = init => {
  const [key, setKey] = useState(init);

  const onSelect = k => {
    setKey(k);
  };

  return {
    key,
    onSelect
  };
};
