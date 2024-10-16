import { User } from '../types'; 

const API_URL = '/api/User'; 

export const getUsers = async (): Promise<User[]> => {
    try {
        const response = await fetch(API_URL); 

        if (!response.ok) {
            throw new Error('Failed to fetch users'); 
        }

        return await response.json(); 
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
} 

export const getUser = async (id: number): Promise<User> => {
    try {
        const response = await fetch(`${API_URL}/${id}`); 
        
        if (!response.ok) {
            throw new Error(`Failed to fetch user with id: ${id}`);
        }

        return await response.json(); 
    } catch (error) {
        console.error('Error fetching user:', error);
        throw error;
    }
}

export const findUser = async (username: string, password: string): Promise<User | undefined> => {
    try {
        const response = await fetch(`${API_URL}/find?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`)

        if(!response.ok) {
            if(response.status === 404){
                throw new Error('User doesn\'t exist');  
            }
            throw new Error('Failed to find user'); 
        }

        return await response.json(); 
    } catch (error) {
        console.error('Error finding user', error)
    }
}

export const addUser = async (user: Omit<User, 'id'>): Promise<User> => {
    try {
        const response = await fetch(API_URL, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json', 
            }, 
            body: JSON.stringify(user)
        }); 

        if (!response.ok) {
            const errorText = await response.text(); 
            console.error('Server error:', errorText); 
            throw new Error('Failed to create user'); 
        }

        return await response.json(); 
    } catch (error) {
        console.error('Error adding user:', error);
        throw error;
    }
}

