import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "./App.scss";

function App() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

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

      const notasPesos = {
        primeira: (Number(notasUsuario[0]) * pesos[1]) / 8,
        segunda: (Number(notasUsuario[1]) * pesos[2]) / 8,
        terceira: (5.8 * pesos[3]) / 8,
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
          <h1>Calculadora de nota em Pré Cálculo</h1>
          <p>
            Para saber quanto você precisa tirar na última prova para ficar na
            média de 7,
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
        <div
          className={`finalnote ${
            notaNecessaria <= 6.5 ? "good" : notaNecessaria <= 8 ? "ok" : "bad"
          }`}
        >
          Você vai precisar tirar <span>{notaNecessaria.toPrecision(2)}</span>{" "}
          na última prova para não ir pra final.
        </div>
      </div>
    </div>
  );
}

export default App;
