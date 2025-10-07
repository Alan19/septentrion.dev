import {useEffect} from "react";

export function useInjectClass(ref: React.RefObject<HTMLDivElement | null>, targetClass: string, injectedClass: string[]) {
     useEffect(() => {
        const dropdown = ref.current?.querySelector(`.${targetClass}`);
        if (dropdown) injectedClass.forEach(value => dropdown.classList.add(value))
    }, [injectedClass, ref, targetClass]);
}