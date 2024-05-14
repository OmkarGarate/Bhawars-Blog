import React from 'react'
import { useState } from 'react'
import {useAuthContext} from './useAuthContext'

export const useSignup = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const {dispatch} = useAuthContext()

    const signup = async (email, firstName, lastName, password, userType, secretKey) =>{
        setIsLoading(true)
        setError(null)

        console.log(email, firstName, lastName, password, userType, secretKey)
        const response = await fetch('http://localhost:5000/users/signup', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, firstName, lastName, password, userType, secretKey})
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
    return {signup, isLoading, error}
}

export default useSignup