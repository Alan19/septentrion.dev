import {useSearchParams} from 'react-router-dom'
import {useCallback, useMemo} from 'react'
import _ from "lodash";

export function useQueryState<T>(
    key: string,
    defaultValue: T
): [T, (value: T) => void] {
    const [searchParams, setSearchParams] = useSearchParams()

    const value = useMemo(() => {
        const raw = searchParams.get(key)
        if (raw === null) return defaultValue

        try {
            return JSON.parse(raw) as T
        } catch (e) {
            console.warn(`Failed to parse query param "${key}":`, e)
            return defaultValue
        }
    }, [searchParams, key, defaultValue])

    const setValue = useCallback(
        (newValue: T, replaceHistory: boolean = true) => {
            const newParams = new URLSearchParams(searchParams)

            if (_.isEqual(newValue, defaultValue)) {
                newParams.delete(key)
            } else {
                newParams.set(key, JSON.stringify(newValue))
            }
            setSearchParams(newParams, {replace: replaceHistory})
        },
        [key, searchParams, setSearchParams, defaultValue]
    )

    return [value, setValue]
}