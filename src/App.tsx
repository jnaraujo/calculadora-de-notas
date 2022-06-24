import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "./App.scss";

function App() {
  const { register, watch, setValue } = useForm();

  const [notaNecessaria, setNotaNecessaria] = useState(10);

  const pesos = {
    1: 2,
    2: 3,
    3: 3,
  };

  const mediaMinima = 7;

  useEffect(() => {
    const subscription = watch((value) => {
      const notasUsuario = [value.primeira, value.segunda];

      if (value.primeira > 10) {
        return setValue("primeira", 10);
      }
      if (value.segunda > 10) {
        return setValue("segunda", 10);
      }
      if (value.primeira < 0) {
        return setValue("primeira", 0);
      }
      if (value.segunda < 0) {
        return setValue("segunda", 0);
      }

      const notasPesos = {
        primeira: (Number(notasUsuario[0]) * pesos[1]) / 8,
        segunda: (Number(notasUsuario[1]) * pesos[2]) / 8,
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
          <div>
            Nota da primeira prova:{" "}
            <input
              type="number"
              {...register("primeira")}
              step={0.1}
              defaultValue={5}
              min={0}
              max={10}
            />{" "}
          </div>
          <div>
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

export default App;
