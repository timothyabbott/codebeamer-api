import { useEffect, useState } from "react";
import apiClient from "../services/codebeamer-api-client";
import axios, { Axios, CanceledError } from "axios";
import { produce } from "immer";

export interface Srs {
  id: string;
  name: string;
  children: Srs[];
}

const getSrs = async (id: string) => {
  const response = await apiClient.get("items/" + id);
  return {
    name: response.data.name,
    id: response.data.id,
    children: response.data.children,
  };
};
const recurseAllItems = async (srs: Srs) => {
  const copiedChildren = srs.children;
  console.log(copiedChildren);

  srs.children = [];
  for (const child of copiedChildren) {
    // this can be sped up by using the "get children endpoint" rather than make individual calls.
    const result = await getSrs(child.id);
    srs.children.push(result);
    await recurseAllItems(result);
  }
  return srs;
};

const useAllSrs = (id: string) => {
  const [stateSrs, setStateSrs] = useState<Srs>();
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);

    getSrs(id).then((result) => {
      recurseAllItems(result).then(() => {
        setStateSrs(result);
      });
    });
  }, []);
  return { stateSrs, error, isLoading };
};

export const login = (userName: string, password: string) => {
  axios
    .post("https://inivata.codebeamer-x.com/cb/api/cbx/auth/login", {
      name: userName,
      password: password,
    })
    .then((response) => {
      localStorage.setItem("access key", response.data.accessToken);
      localStorage.setItem("logged in", "true");
    })
    .catch(() => {
      localStorage.setItem("logged in", "false");
      localStorage.setItem("access key", "");
    });
};

export default useAllSrs;
