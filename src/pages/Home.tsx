import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "../styles/Home.scss";

export default function Home() {
  const { register, watch, setValue } = useForm();
  const [notaNecessaria, setNotaNecessaria] = useState(10);

  const pesos = {
    primeira: 2,
    segunda: 3,
    terceira: 3,
  };

  const mediaMinima = 7;

  useEffect(() => {
    const subscription = watch((prova, { name }) => {
      const notasUsuario = [prova.primeira, prova.segunda];

      if (name && (prova[name] < 0 || prova[name] > 10)) {
        return setValue(name, Math.min(Math.max(0, prova[name]), 10));
      }

      const notasPesos = {
        primeira: (Number(notasUsuario[0]) * pesos.primeira) / 8,
        segunda: (Number(notasUsuario[1]) * pesos.segunda) / 8,
      };

      const notaAtual = notasPesos.primeira + notasPesos.segunda;

      const precisaTirar = ((mediaMinima - notaAtual) * 8) / 3;

      setNotaNecessaria(precisaTirar);
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <div className="App">
      <div className="Content">
        <div className="top">
          <h1>Calculadora de nota em Pré-Cálculo</h1>
          <p>
            Para saber quanto você precisa tirar na última prova para ficar na
            média de 7.
          </p>
        </div>
        <form>
          <div className="group">
            Nota da primeira prova:{" "}
            <div className="notes">
              <input
                type="number"
                {...register("primeira")}
                step={0.1}
                defaultValue={5}
                min={0}
                max={10}
              />
            </div>
          </div>
          <div className="group">
            Nota da segunda prova:{" "}
            <input
              type="number"
              {...register("segunda")}
              step={0.1}
              defaultValue={5}
              min={0}
              max={10}
              maxLength={10}
            />
          </div>
        </form>
        <div className="line"></div>
        <div className={`finalnote`}>
          <div>
            <p>
              Quanto você vai precisar tirar na última prova para não ir pra
              final:
            </p>
          </div>
          <div
            className={`${
              notaNecessaria <= 6.5
                ? "good"
                : notaNecessaria <= 8
                ? "ok"
                : "bad"
            }`}
          >
            {notaNecessaria.toPrecision(2)}
          </div>
        </div>
      </div>
    </div>
  );
}
