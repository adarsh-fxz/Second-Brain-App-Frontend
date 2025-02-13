import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";
import axios from "axios";

export function useContent() {

    function refresh() {
        axios.get<{ data: any[] }>(BACKEND_URL + "/api/v1/content", {
            headers: {
                Authorization: localStorage.getItem("token") || ""
            }
        }).then(response => {
            setContent(response.data);
        })
    }

    const [content, setContent] = useState<any>([]);

    useEffect(() => {
        refresh();
        let interval = setInterval(() => {
            refresh();
        }, 10 * 1000);

        return () => {
            clearInterval(interval);
        }
    }, []);

    return {content, refresh};
}