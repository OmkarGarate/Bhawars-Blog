import React from 'react'
import { useState } from 'react'
import {useAuthContext} from './useAuthContext'

export const useLoginUser = () => {
    const [errorU, setErrorU] = useState(null)
    const [isLoadingU, setIsLoadingU] = useState(null)
    const {dispatch} = useAuthContext()

    const loginUser = async (email, password) =>{
        setIsLoadingU(true)
        setErrorU(null)

        const response = await fetch('/users/loginUser', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password})
        })

        const json = await response.json()

        if(!response.ok){
            setIsLoadingU(false)
            setErrorU(json.error)
        }

        if(response.ok){
            // save the user to local storare
            localStorage.setItem('user', JSON.stringify(json))

            //update the auth context
            dispatch({type: 'LOGIN', payload: json})

            setIsLoadingU(false)
        }

    }
    return {loginUser, isLoadingU, errorU}
}

export default useLoginUser