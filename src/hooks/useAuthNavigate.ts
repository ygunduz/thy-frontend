import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {navigationEventEmitter} from "@/services/base";

export const useAuthNavigate = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = navigationEventEmitter.subscribe((path) => {
            navigate(path);
        });

        return () => {
            unsubscribe();
        };
    }, [navigate]);
};