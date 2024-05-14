import React from 'react'
import { useState } from 'react'
import {useAuthContext} from './useAuthContext'

export const useLoginAdmin = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const {dispatch} = useAuthContext()

    const loginAdmin = async (email, password, secretKey) =>{
        setIsLoading(true)
        setError(null)

        const response = await fetch(' http://localhost:5000/users/loginAdmin', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password, secretKey})
        })

        const json = await response.json()

        if(!response.ok){
            setIsLoading(false)
            setError(json.error)
        }

        if(response.ok){
            // save the user to local storare
            localStorage.setItem('user', JSON.stringify(json))

            //update the auth context
            dispatch({type: 'LOGIN', payload: json})

            setIsLoading(false)
        }

    }
    return {loginAdmin, isLoading, error}
}

export default useLoginAdmin