import { useMutation } from "@tanstack/react-query";

// hàm này để có thể tái sử dụng cái --useMutation-- dùng để --req được dữ liệu--
export const useMutationHooks = (fnCallback) => {
    const mutation = useMutation({
        mutationFn: fnCallback
    })
    return mutation
}