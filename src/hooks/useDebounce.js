// import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";

// hàm này dùng để diều chỉnh thời gian chỗ cái thanh tìm kím
export const useDebounce = (value, delay) => {
    const [valueDebounce, setValueDebounce] = useState('')

    useEffect(() => {
        const handle = setTimeout(() => {
            setValueDebounce(value)
        }, [delay])
    
        return () => {
            clearTimeout(handle)
        }
    }, [value])

    return valueDebounce
}