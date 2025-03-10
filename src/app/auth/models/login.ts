export interface Token {
  access_token: string;
  refreshToken?: string; // Opcional, si la API devuelve un token de refresco
  expiresIn: number; // Tiempo de expiración en segundos
}
