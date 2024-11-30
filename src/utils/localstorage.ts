import { useState, useEffect, useCallback } from "react";

const secretKey = import.meta.env.VITE_LOCALSTORAGE_SECRET_KEY;

// Define types for encrypted data
interface EncryptedData {
    iv: number[];
    data: number[];
}

// Encrypt data function
async function encryptData(data: string): Promise<EncryptedData> {
    const encoder = new TextEncoder();
    const dataBuffer = encoder.encode(data);

    const key = await window.crypto.subtle.importKey(
        "raw",
        encoder.encode(secretKey),
        { name: "AES-GCM" },
        false,
        ["encrypt"]
    );

    const iv = window.crypto.getRandomValues(new Uint8Array(12));
    const encryptedBuffer = await window.crypto.subtle.encrypt(
        { name: "AES-GCM", iv },
        key,
        dataBuffer
    );

    return {
        iv: Array.from(iv),
        data: Array.from(new Uint8Array(encryptedBuffer)),
    };
}

// Decrypt data function
async function decryptData(encrypted: EncryptedData): Promise<string> {
    const encoder = new TextEncoder();
    const key = await window.crypto.subtle.importKey(
        "raw",
        encoder.encode(secretKey),
        { name: "AES-GCM" },
        false,
        ["decrypt"]
    );

    const iv = new Uint8Array(encrypted.iv);
    const encryptedData = new Uint8Array(encrypted.data);

    const decryptedBuffer = await window.crypto.subtle.decrypt(
        { name: "AES-GCM", iv },
        key,
        encryptedData
    );

    const decoder = new TextDecoder();
    return decoder.decode(decryptedBuffer);
}

function useControlledLocalStorage<T>(key: string, initialValue: T) {
    const [storedValue, setStoredValue] = useState<T>(initialValue);

    const loadStoredValue = useCallback(async () => {
        try {
            const item = window.localStorage.getItem(key);
            if (item) {
                const encrypted: EncryptedData = JSON.parse(item);
                const decrypted = await decryptData(encrypted);
                setStoredValue(JSON.parse(decrypted) as T);
            } else {
                setStoredValue(initialValue);
            }
        } catch (error) {
            console.error("Error reading from localStorage:", error);
            setStoredValue(initialValue);
        }
    }, [key, initialValue]);

    useEffect(() => {
        loadStoredValue();
    }, [loadStoredValue]);

    const setValue = async (value: T | ((val: T) => T)) => {
        try {
            const newValue = typeof value === "function" ? (value as (val: T) => T)(storedValue) : value;
            setStoredValue(newValue);

            const encrypted = await encryptData(JSON.stringify(newValue));
            window.localStorage.setItem(key, JSON.stringify(encrypted));
        } catch (error) {
            console.error("Error writing to localStorage:", error);
        }
    };

    return [storedValue, setValue] as const;
}

export default useControlledLocalStorage;
