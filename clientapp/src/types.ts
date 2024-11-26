export type User = {
  id: number;
  username: string;
  password: string;
  email: string | null;
  firstName?: string | null;
  lastName?: string | null;
  registrationDate?: Date;
};

export type Car = {
  id: number;
  brand: string;
  model: string;
  imageUrl: string;
  fuelType: string;
  capcity: number;
  bodyType: string;
  color: string;
  pricePerDay: number;
  productionYear: number;

  reservations?: Reservation[] | null;
  faults?: Fault[] | null;
  reviews?: Review[] | null;
  usersFavourites?: User[] | null;
};

export type CarFilter = {
  fuelType?: string | null;
  capacity?: string | null;
  bodyType?: string | null;
  color?: string | null;
  priceMin?: string | null;
  priceMax?: string | null;
  yearMin?: string | null;
  yearMax?: string | null;
  reservationStart?: Date | null;
  reservationEnd?: Date | null;
};

export type Reservation = {
  id: number;
  userId: number;
  carId: number;
  startDate: Date;
  endDate: Date;
  car?: Car;
  user?: User;
};

export type Fault = {
  id: number;
  reportedUserId: number;
  carId: number;
  description: string;
  dateOfIssue: Date;
  car: Car;
  reportedUser: User;
};

export type Review = {
  id: number;
  userId: number;
  carId: number;
  starsOutOfFive: number;
  reviewContent?: string | null;
  dateOfIssue?: Date | null;
  car: Car;
  user: User;
};

export type MyError = {
  error?: boolean;
  message?: string;
};

export type UserApiReturn = {
  data?: User | User[] | null;
  error?: MyError | null;
};

export type UserLoginApiReturn = {
  token: string | null;
  error?: MyError | null;
};

export type CarApiReturn = {
  data?: Car | Car[] | null;
  error?: MyError | null;
};

export type ReservationApiReturn = {
  data?: Reservation | Reservation[] | null;
  error?: MyError | null;
};
