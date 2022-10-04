import { createContext, useState } from "react";
import { api } from "../../service/app";

export const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
  const [resCalcAntecipation, setResCalcAntecipation] = useState({});

  const CalcAntecipation = async (data) => {
    const resCalcAntecipation = await api
      .post("/", data)
      .then((res) => {
        setResCalcAntecipation(res.data);
        return res;
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
    return resCalcAntecipation;
  };

  return (
    <DashboardContext.Provider
      value={{ CalcAntecipation, resCalcAntecipation }}
    >
      {children}
    </DashboardContext.Provider>
  );
};
