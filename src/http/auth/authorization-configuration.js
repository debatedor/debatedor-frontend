import { tokenManager } from "./TokenManager";

export const authorizationConfig = {
    headers: { Authorization: `Bearer ${tokenManager.getToken()}` }
} 