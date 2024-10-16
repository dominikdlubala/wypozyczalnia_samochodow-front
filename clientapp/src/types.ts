export type User = {
    id: number; 
    username: string; 
    password: string; 
    firstName?: string; 
    lastName?: string; 
    registrationDate: Date; 
}

export type Car = {
    model: string
    imageUrl: string
    id: number
}

export type MyError = {
    error?: boolean; 
    message?: string; 
}

export type UserApiReturn = {
    data: User | null; 
    error?: MyError | null; 
}