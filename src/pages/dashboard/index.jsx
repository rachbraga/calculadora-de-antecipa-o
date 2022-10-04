import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import React, { useContext } from "react";
import { DashboardContext } from "../../providers/dashboard";

import "./styles.css";

const Dashboard = () => {
  const { CalcAntecipation, resCalcAntecipation } =
    useContext(DashboardContext);

  const days = Object.keys(resCalcAntecipation);

  const schema = yup.object().shape({
    amount: yup
      .number()
      .required("Minimo de R$1.000,00 requerido")
      .min(1000, "Minimo de R$1.000,00"),
    installments: yup.number().required().max(12, "Máximo de 12 parcelas"),
    mdr: yup.number().required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmitFunction = (data) => {
    CalcAntecipation(data);
  };

  return (
    <div className="div-container">
      <form
        onSubmit={handleSubmit(onSubmitFunction)}
        className="form-container"
      >
        <h1 className="title-form">SIMULE SUA ANTECIPAÇÃO</h1>
        <div className="inputs-form">
          <span className="span-title">Informe o valor da venda:*</span>
          <input
            {...register("amount")}
            placeholder="Ex.: R$1.000,00"
            error={errors.amount?.message}
          />
          <span className="span-exemple">a partir de R$ 1.000,00</span>
          <span className="span-title">Em quantas parcelas:*</span>

          <input
            {...register("installments")}
            placeholder="Ex.: 3"
            error={errors.installments?.message}
          />
          <span className="span-exemple">*até 12 parcelas</span>

          <span className="span-title">Informe o percentual de MDR:*</span>
          <input
            {...register("mdr")}
            placeholder="Ex.: 4"
            error={errors.mdr?.message}
          />
        </div>
        <button type="submit">Enviar</button>
      </form>

      <ul className="ul-list">
        <h3 className="h2-subtitle">VOCÊ RECEBERÁ:</h3>
        {days.length !== 0 ? (
          days.map((day, index) => {
            if (!day[1]) {
              return (
                <li key={index} className="li-style">
                  Amanhã:
                  <strong>
                    {resCalcAntecipation[day].toLocaleString("pt-br", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </strong>
                </li>
              );
            }

            return (
              <li key={index} className="li-style">
                Em {day} dias:
                <strong>
                  {resCalcAntecipation[day].toLocaleString("pt-br", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </strong>
              </li>
            );
          })
        ) : (
          <ul className="ul-list-preload">
            <li className="li-style">
              Amanhã: <strong>R$ 0,00</strong>
            </li>
            <li className="li-style">
              Em 15 dias: <strong>R$ 0,00</strong>
            </li>
            <li className="li-style">
              Em 30 dias: <strong>R$ 0,00</strong>
            </li>
            <li className="li-style">
              Em 90 dias: <strong>R$ 0,00</strong>
            </li>
          </ul>
        )}
      </ul>
    </div>
  );
};

export default Dashboard;
