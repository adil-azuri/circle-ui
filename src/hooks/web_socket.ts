// useWebSocket.ts
import { useEffect, useRef } from "react";

export const useWebSocket = (url: string, onMessage: (message: any) => void) => {
    const socketRef = useRef<WebSocket | null>(null);

    useEffect(() => {
        const newSocket = new WebSocket(url);

        newSocket.onopen = () => {
            console.log("WebSocket connection established");
        };

        newSocket.onmessage = (event) => {
            try {
                const message = JSON.parse(event.data.toString());
                onMessage(message);
            } catch (error) {
                console.error("Failed to parse WebSocket message:", error, event.data);
            }
        };

        newSocket.onclose = () => {
            console.log("WebSocket connection closed");
        };

        newSocket.onerror = (error) => {
            console.error("WebSocket error:", error);
        };

        socketRef.current = newSocket;

        return () => {
            if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
                socketRef.current.close();
            }
            socketRef.current = null;
        };
    }, [url, onMessage]);
};
