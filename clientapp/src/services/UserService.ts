import type { User, MyError, UserApiReturn, UserLoginApiReturn } from '../types'; 

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

// export const findUser = async (username: string, password: string): Promise<UserApiReturn> => {
//     try {
//         const response = await fetch(`${API_URL}/find?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`)

//         if(!response.ok) {
//             if(response.status === 404){
//                 return { data: null, error: { error: true, message: 'User not found' } } 
//             }
//             return { data: null, error: { error: true, message: 'Unexpected error in UserService/findUSer' } }
//         }

//         const data = await response.json(); 
//         return { data } as { data: User } ;  
//     } catch (error) {
//         console.error('Error finding user', error)
//         return { data: null, error: { error: true, message: 'Unexpected error in UserService/findUser' } }
//     }
// }

export const loginUser = async (username: string, password: string): Promise<UserLoginApiReturn> => {
    try {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username, 
                password: password 
            })
        });

        if(!response.ok) {
            if(response.status === 404){
                return { token: null, error: { error: true, message: 'User not found' } } 
            }
            return { token: null, error: { error: true, message: 'Unexpected error in UserService/findUSer' } }
        }

        const data = await response.json(); 
        return { token: data };  
    } catch (error) {
        console.error('Error finding user', error)
        return { token: null, error: { error: true, message: 'Unexpected error in UserService/findUser' } }
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

