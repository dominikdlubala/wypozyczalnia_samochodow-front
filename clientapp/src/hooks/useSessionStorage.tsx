import { useState } from 'react'; 

export const useSessionStorage = <T,>(keyName: string, defaultValue: T) => {
    const [storedValue, setStoredValue] = useState<T>(() => {
        try {
            const value = window.sessionStorage.getItem(keyName); 
            if(value){
                return JSON.parse(value) as T; 
            } else {
                window.sessionStorage.setItem(keyName, JSON.stringify(defaultValue))
                return defaultValue; 
            }
        } catch (error) {
            console.error('Error with useSessionStorage'); 
            return defaultValue; 
        }
    })

    const setValue = (newValue: T) => {
        try {
            window.sessionStorage.setItem(keyName, JSON.stringify(newValue)); 
        } catch (error) {
            console.error(error); 
        }
        setStoredValue(newValue); 
    }
    
    return [storedValue, setValue] as const; 
}


