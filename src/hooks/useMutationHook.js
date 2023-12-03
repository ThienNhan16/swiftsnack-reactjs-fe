import { useMutation } from "@tanstack/react-query"
// import {useState} from 'react'

export const useMutationHooks = (fnCallback, isLoading) => {
    const mutation = useMutation({
        mutationFn: fnCallback
    });

    return mutation
};
