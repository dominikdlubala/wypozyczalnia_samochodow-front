import { SubmitHandler, useForm } from "react-hook-form";
import { useAuth } from "../../hooks/useAuth";
import { Car } from "../../types";
import { useState } from "react";
import { addCar, updateCar } from "../../services/AdminService";

type FormValues = {
  brand: string;
  model: string;
  imageUrl: string;
  fuelType: string;
  capacity: number;
  bodyType: string;
  color: string;
  pricePerDay: number;
  productionYear: number;
};

interface FormProps {
  car: Car | null;
  modalClose: () => void;
  onSubmited: () => void;
}

export default function AddOrEditCarForm({
  car,
  modalClose,
  onSubmited,
}: FormProps) {
  const fuelTypes = ["Petrol", "Diesel", "Hybrid", "Electric"];
  const bodyTypes = [
    "Convertible",
    "Coupe",
    "Hatchback",
    "Kombi",
    "Sedan",
    "SUV",
  ];
  const colors = [
    "Black",
    "Blue",
    "Gray",
    "Green",
    "Red",
    "Silver",
    "White",
    "Yellow",
  ];
  const { token } = useAuth();

  const [isError, setIsError] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    try {
      if (car == null) {
        const { data, error } = await addCar(values, token || "");
      } else {
        const { data, error } = await updateCar(car.id, values, token || "");
      }
      modalClose();
      onSubmited();
    } catch (error) {
      setIsError(true);
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="login-form-title">
        {car ? "Edytuj samochód" : "Dodaj nowy samochód"}
      </h1>
      {/* Zdjęcie TODO */}
      <input
        type="text"
        defaultValue={car?.imageUrl}
        hidden
        {...register("imageUrl")}
      />
      {/* Marka */}
      <div className="login-form-group">
        <input
          type="text"
          className="login-form-input"
          placeholder="Marka"
          defaultValue={car?.brand}
          {...register("brand", {
            required: {
              value: true,
              message: "Marka jest wymagana",
            },
          })}
        />
      </div>
      {/* Model */}
      <div className="login-form-group">
        <input
          type="text"
          className="login-form-input"
          placeholder="Model"
          defaultValue={car?.model}
          {...register("model", {
            required: {
              value: true,
              message: "Model jest wymagany",
            },
          })}
        />
      </div>
      {/* Typ silnika */}
      <div className="login-form-group">
        <label className="login-form-label">Typ silnika: </label>
        <select
          className="form-select"
          defaultValue={car?.fuelType}
          {...register("fuelType")}
        >
          {fuelTypes.map((fuelType) => (
            <option key={fuelType} value={fuelType}>
              {fuelType}
            </option>
          ))}
        </select>
      </div>
      {/* Pojemnosc */}
      <div className="login-form-group">
        <label>Pojemność silnika (L):</label>
        <input
          type="number"
          className="login-form-input"
          step={0.1}
          placeholder="Pojemność silnika (L)"
          defaultValue={car?.capacity}
          {...register("capacity", {
            min: {
              value: 0,
              message: "Pojemnośc nie może być ujemna",
            },
            max: {
              value: 10,
              message: "Zbyt duża pojemność",
            },
            required: {
              value: true,
              message: "Pojemność jest wymagana",
            },
          })}
        />
      </div>
      {/* Rodzaj nadwozia */}
      <div className="login-form-group">
        <label className="login-form-label">Rodzaj nadwozia: </label>
        <select
          className="form-select"
          defaultValue={car?.bodyType}
          {...register("bodyType")}
        >
          {bodyTypes.map((bodyType) => (
            <option key={bodyType} value={bodyType}>
              {bodyType}
            </option>
          ))}
        </select>
      </div>
      {/* Kolor */}
      <div className="login-form-group">
        <label className="login-form-label">Kolor: </label>
        <select
          className="form-select"
          defaultValue={car?.color}
          {...register("color")}
        >
          {colors.map((color) => (
            <option key={color} value={color}>
              {color}
            </option>
          ))}
        </select>
      </div>
      {/* Cena */}
      <div className="login-form-group">
        <label>Cena za dzień (PLN):</label>
        <input
          type="number"
          className="login-form-input"
          placeholder="Cena za dzień (PLN)"
          defaultValue={car?.pricePerDay}
          {...register("pricePerDay", {
            min: {
              value: 0,
              message: "Cena nie może być ujemna",
            },
            required: {
              value: true,
              message: "Cena jest wymagana",
            },
          })}
        />
      </div>
      {/* Rok */}
      <div className="login-form-group">
        <label>Rok produkcji:</label>
        <input
          type="number"
          className="login-form-input"
          placeholder="Rok produkcji"
          defaultValue={car?.productionYear}
          {...register("productionYear", {
            min: {
              value: 1900,
              message: "Nieprawidłowy rok",
            },
            max: {
              value: new Date().getFullYear(),
              message: "Nieprawidłowy rok",
            },
            required: {
              value: true,
              message: "Rok produkcji jest wymagany",
            },
          })}
        />
      </div>

      {errors.brand && (
        <span className="login-input-validate">{errors.brand?.message}</span>
      )}
      {errors.model && (
        <span className="login-input-validate">{errors.model?.message}</span>
      )}
      {errors.capacity && (
        <span className="login-input-validate">{errors.capacity?.message}</span>
      )}
      {errors.pricePerDay && (
        <span className="login-input-validate">
          {errors.pricePerDay?.message}
        </span>
      )}
      {errors.productionYear && (
        <span className="login-input-validate">
          {errors.productionYear?.message}
        </span>
      )}
      {isError && (
        <span className="login-input-validate">
          Błąd w {car ? "edycji" : "dodawaniu"} samochodu
        </span>
      )}

      {/* Przycisk */}
      <div className="mt-3">
        <button type="submit" className="btn btn-success">
          {car ? "Edytuj" : "Dodaj"}
        </button>
      </div>
    </form>
  );
}
