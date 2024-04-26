import jwt, { JwtPayload, VerifyErrors } from "jsonwebtoken";

import env from "./env.util";

const { JWT_SECRET_ACCESS_TOKEN_KEY, JWT_SECRET_REFRESH_TOKEN_KEY, JWT_SECRET_ADMIN_TOKEN_KEY } = env;

interface Verify {
    error: string | null;
    status: boolean;
}

interface SignAdmin {
    username: string;
    id: string;
}

export function signAdmin({ id, username }: SignAdmin): string {
    const payload: SignAdmin = { username, id };
    return jwt.sign(payload, JWT_SECRET_ADMIN_TOKEN_KEY, {
        expiresIn: "30m"
    });
}

interface VerifyAdmin extends Verify {
    payload: SignAdmin | null;
}

export function verifyAdmin(token: string): VerifyAdmin {
    const result: VerifyAdmin = {
        payload: null,
        error: null,
        status: false
    };

    jwt.verify(token, JWT_SECRET_ADMIN_TOKEN_KEY, (error: VerifyErrors | null, decode: string | JwtPayload | undefined) => {
        if (error) {
            result.error = error.message;
        }
        else if (typeof decode === "string" || decode === undefined) {
            result.error = "Invalid payload.";
        }
        else {
            result.payload = decode as SignAdmin;
            result.status = true;
        }
    });

    return result;
}

interface SignAccess {
    username: string;
    id: string;
}

export function signAccess({ username, id }: SignAccess): string {
    const payload: SignAccess = { username, id };
    return jwt.sign(payload, JWT_SECRET_ACCESS_TOKEN_KEY, {
        expiresIn: "5m"
    });
}

export interface VerifyAccess extends Verify {
    payload: SignAccess | null;
}

export function verifyAccess(token: string): VerifyAccess {
    const result: VerifyAccess = {
        error: null,
        payload: null,
        status: false
    }
    jwt.verify(token, JWT_SECRET_ACCESS_TOKEN_KEY, (error: VerifyErrors | null, decode: string | JwtPayload | undefined) => {
        if (error) {
            result.error = error.message;
        }
        else if (typeof decode === "string" || decode === undefined) {
            result.error = "Invalid payload.";
        }
        else {
            result.payload = decode as SignAccess;
            result.status = true;
        }
    });

    return result;
}

interface SingRefresh {
    username: string;
}

export function signRefresh({ username }: SingRefresh): string {
    const payload: SingRefresh = { username };
    return jwt.sign(payload, JWT_SECRET_REFRESH_TOKEN_KEY, {
        expiresIn: "7d"
    });
}

export interface VerifyRefresh extends Verify {
    payload: SingRefresh | null;
}

export function verifyRefresh(token: string): VerifyRefresh {
    const result: VerifyRefresh = {
        error: null,
        payload: null,
        status: false
    }
    jwt.verify(token, JWT_SECRET_REFRESH_TOKEN_KEY, (error: VerifyErrors | null, decode: string | JwtPayload | undefined) => {
        if (error) {
            result.error = error.message;
        }
        else if (typeof decode === "string" || !decode) {
            result.error = "Invalid payload.";
        }
        else { 
            result.payload = decode as SingRefresh;
            result.status = true;
        }
    });

    return result;
}