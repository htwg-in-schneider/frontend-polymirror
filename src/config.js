// Zentrale API-Basis-URL — liest aus der Umgebungsvariable, fällt für die Entwicklung auf localhost zurück
export const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';
