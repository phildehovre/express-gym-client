
export const fetchWithCredentials = async (method, endpoint, payload = {}) => {
    if (method == 'GET') {
        try {
        const res = await fetch(import.meta.env.VITE_API_URL + endpoint, {
            method,
            credentials: 'include',
        }) 
        const data =  await res.json();
        return data
        } catch (error) {
        console.error(error) 
        }

    }
}