import { useState } from 'react'; 

export const useLocalStorage = <T,>(keyName: string, defaultValue: T) => {
    const [storedValue, setStoredValue] = useState<T>(() => {
        try {
            const value = window.localStorage.getItem(keyName); 
            if(value){
                return JSON.parse(value) as T; 
            } else {
                window.localStorage.setItem(keyName, JSON.stringify(defaultValue))
                return defaultValue; 
            }
        } catch (error) {
            console.error('Error with useLocalStorage'); 
            return defaultValue; 
        }
    })

    const setValue = (newValue: T) => {
        try {
            window.localStorage.setItem(keyName, JSON.stringify(newValue)); 
        } catch (error) {
            console.error(error); 
        }
        setStoredValue(newValue); 
    }
    
    return [storedValue, setValue] as const; 
}


