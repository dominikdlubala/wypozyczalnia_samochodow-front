import { SubmitHandler, useForm } from "react-hook-form";
import { useAuth } from "../../hooks/useAuth";
import { Car } from "../../types";
import { useEffect, useState } from "react";
import { addCar, updateCar, uploadImage } from "../../services/AdminService";

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

const fuelTypes = ["Benzyna", "Diesel"];
const bodyTypes = [
  "Couple",
  "Hatchback",
  "Kabriolet",
  "Kombi",
  "Sedan",
  "SUV",
];
const colors = [
  "Biały",
  "Czarny",
  "Czerwony",
  "Granatowy",
  "Niebieski",
  "Pomarańczowy",
  "Srebrny",
  "Szary",
  "Zielony",
  "Żółty"
];

export default function AddOrEditCarForm({
  car,
  modalClose,
  onSubmited,
}: FormProps) {
  const { token } = useAuth();

  const [isError, setIsError] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string | null | undefined>(null);

  useEffect(() => {
    setImageUrl(car?.imageUrl);
    setValue("imageUrl", car?.imageUrl || "");
  }, [car]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>();

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files[0]) {
      try {
        const file = event.target.files[0];
        const response = await uploadImage(file, token || "");
        const fileUrl = response.uniqueFileName;
        setImageUrl(fileUrl);

        setValue("imageUrl", fileUrl);
      } catch (error) {
        console.error("Błąd przesyłania zdjęcia:", error);
        setIsError(true);
      }
    }
  };

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    try {
      if (!values.imageUrl) {
        setIsError(true);
        return;
      }

      if (car == null) {
        await addCar(values, token || "");
      } else {
        await updateCar(car.id, values, token || "");
      }
      modalClose();
      onSubmited();
    } catch (error) {
      setIsError(true);
    }
  };

  return (
    <form className="addOrEdit-form" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="addOrEdit-form-title">
        {car ? "Edytuj samochód" : "Dodaj nowy samochód"}
      </h1>

      {/* Zdjęcie */}
      <div className="addOrEdit-form-group">
        {imageUrl && (
          <div className="mb-3 text-center">
            <img
              src={"/images/cars/" + imageUrl}
              alt="Car Preview"
              style={{ width: "auto", height: "auto", maxHeight: "200px" }}
            />
          </div>
        )}

        <label className="addOrEdit-form-label">Dodaj zdjęcie:</label>
        <input type="file" accept="image/*" onChange={handleFileChange} />

        <input
          type="hidden"
          {...register("imageUrl", {
            required: {
              value: true,
              message: "Zdjęcie jest wymagane",
            },
          })}
        />
        {errors.imageUrl && (
          <span className="login-input-validate">
            {errors.imageUrl?.message}
          </span>
        )}
      </div>

      {/* Marka */}
      <div className="addOrEdit-form-group">
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

        {errors.brand && (
          <span className="login-input-validate">{errors.brand?.message}</span>
        )}
      </div>

      {/* Model */}
      <div className="addOrEdit-form-group">
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

        {errors.model && (
          <span className="login-input-validate">{errors.model?.message}</span>
        )}
      </div>

      {/* Typ silnika */}
      <div className="addOrEdit-form-group">
        <label className="addOrEdit-form-label">Typ silnika: </label>
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

      {/* Pojemność */}
      <div className="addOrEdit-form-group">
        <label>Pojemność silnika (L):</label>
        <input
          type="number"
          className="addOrEdit-form-input"
          step={0.1}
          placeholder="Pojemność silnika (L)"
          defaultValue={car?.capacity}
          {...register("capacity", {
            min: {
              value: 0,
              message: "Pojemność nie może być ujemna",
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

        {errors.capacity && (
          <span className="login-input-validate">
            {errors.capacity?.message}
          </span>
        )}
      </div>

      {/* Rodzaj nadwozia */}
      <div className="addOrEdit-form-group">
        <label className="addOrEdit-form-label">Rodzaj nadwozia: </label>
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
      <div className="addOrEdit-form-group">
        <label className="addOrEdit-form-label">Kolor: </label>
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
      <div className="addOrEdit-form-group">
        <label className="addOrEdit-form-label">Cena za dzień (PLN):</label>
        <input
          type="number"
          className="addOrEdit-form-input"
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

        {errors.pricePerDay && (
          <span className="login-input-validate">
            {errors.pricePerDay?.message}
          </span>
        )}
      </div>

      {/* Rok produkcji */}
      <div className="addOrEdit-form-group">
        <label className="addOrEdit-form-label">Rok produkcji:</label>
        <input
          type="number"
          className="addOrEdit-form-input"
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

        {errors.productionYear && (
          <span className="login-input-validate">
            {errors.productionYear?.message}
          </span>
        )}
      </div>

      {/* Przycisk */}
      <div className="mt-3">
        <button type="submit" className="addOrEdit-btn-submit">
          {car ? "Edytuj" : "Dodaj"}
        </button>
      </div>

      {isError && (
        <span className="login-input-validate">
          Błąd w {car ? "edycji" : "dodawaniu"} samochodu
        </span>
      )}
    </form>
  );
}
