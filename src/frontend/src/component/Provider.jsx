import React, { createContext, useState } from "react";

export const DNAContext = createContext({
    Text: null, setText: null,
    Username: null, setUsername: null,
    Disease: null, setDisease: null,
    Method: null, setMethod: null,
    cleanable: null, setCleanable: null,
    isLoading: null, setLoading: null,
    data: null, setData: null,
    error: null, setError: null
});

export function DNAProvider({ children }){
    const [Text, setText] = useState(null)
    const [Username, setUsername] = useState("")
    const [Disease, setDisease] = useState("")
    const [Method, setMethod] = useState("")
    const [cleanable, setCleanable] = useState(null)
    const [isLoading, setLoading] = useState(null)
    const [data, setData] = useState("")
    const [error, setError] = useState(null)

    return (
        <DNAContext.Provider
            value = 
            {{ Text, setText, 
                Username, setUsername,
                Disease, setDisease,
                Method, setMethod,
                cleanable, setCleanable,
                isLoading, setLoading,
                data, setData,
                error, setError }}>
            {children}
        </DNAContext.Provider>
    )
}