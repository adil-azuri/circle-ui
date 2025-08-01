import { useEffect, useRef } from "react";

export const useWebSocket = (
    url: string,
    onMessage: (message: any) => void
) => {
    const wsRef = useRef<WebSocket | null>(null);

    useEffect(() => {
        if (!url) return;

        const ws = new WebSocket(url);
        wsRef.current = ws;

        ws.onopen = () => {
            console.log("WebSocket connection established");
        };

        ws.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                onMessage(data);
            } catch (error) {
                console.error("Failed to parse WebSocket message:", error);
            }
        };

        ws.onclose = (event) => {
            console.log("WebSocket connection closed:", event.reason);
        };

        ws.onerror = (error) => {
            console.error("WebSocket error:", error);
        };

        return () => {
            if (wsRef.current) {
                wsRef.current.close();
            }
        };
    }, [url, onMessage]);
};
