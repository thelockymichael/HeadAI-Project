import { useState, useEffect } from "react";
import skillService from "./services/skills";

const useTextToSkillsAPI = text => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  const textToSkills = async () => {
    const result = await skillService.create(text);
    console.log("result.data: ", result.data);
    setData(result.data);
    setLoading(false);
  };

  useEffect(() => {
    textToSkills();
  }, [text]);
  console.log("data", data);
  console.log("loading", loading);

  return [data, loading];
};

export default useTextToSkillsAPI;
