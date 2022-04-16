import React, { createContext, useState } from "react";

export const DNAContext = createContext({
    Text: null,
    setText: null,
    pattern: null,
    setPattern: null,
    cleanable: null,
    setCleanable: null,
    isLoading: null,
    setLoading: null,
    data: null,
    setData: null,
    error: null,
    setError: null
});

export function DNAProvider({ children }){
    const [Text, setText] = useState(null)
    const [pattern, setPattern] = useState(null)
    const [cleanable, setCleanable] = useState(null)
    const [isLoading, setLoading] = useState(null)
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)

    return (
        <DNAContext.Provider
            value = 
            {{ Text, setText, 
                pattern, setPattern,
                cleanable, setCleanable,
                isLoading, setLoading,
                data, setData,
                error, setError }}>
            {children}
        </DNAContext.Provider>
    )
}