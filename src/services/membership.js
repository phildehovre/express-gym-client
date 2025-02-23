import { useState, useCallback } from "react"

export const credentials = {
    credentials: 'include',
    headers: {
        'Access-Control-Allow-Origin': 'no-cors',
        'Content-Type': 'application/json' 
    },
} 

export const useApiCall = (callback) => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const execute = useCallback(async (...args) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await callback(...args);
      setResult(res);
      return res; // Allows the caller to use the result
    } catch (err) {
      setError(err);
      console.error("API call error:", err);
    } finally {
      setIsLoading(false);
    }
  }, [callback]);

  return { execute, result, isLoading, error };
};


export const createMembership = async () => {
        try {
            const res = await fetch(url + '/membership', {
                method: 'POST',
                ...credentials,
                body: JSON.stringify({password, email})
            })
            const data = await res.json()
            if (data.user) {
                navigate('/')
            }
            console.log(data)
            console.log('membership created')
        } catch (error) {
            console.error(error)
        } 
    }

export const createUser = async (data) => {
    try {
        const res = await fetch(`${import.meta.env.CLIENT_URL}/signup`, {
            method: 'POST',
            ...credentials,
            body: JSON.stringify({
                email: data.email, 
            })
        })
        const data = await res.json()
        return data 
    } catch (err) {
        throw new Error(err)
    }
}