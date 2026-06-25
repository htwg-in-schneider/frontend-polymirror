# PolyMirror - Frontend

**Prediction Market Simulator** | HTWG Konstanz - Webentwicklung

PolyMirror ermoeglicht es Nutzern, mit virtuellem Guthaben auf reale Prediction-Market-Events zu wetten. Die Plattform spiegelt Echtzeit-Odds von [Polymarket](https://polymarket.com) wider und bietet eine risikofreie Uebungsumgebung.

## Tech Stack

| Komponente | Technologie |
|---|---|
| Framework | Vue.js 3 (Composition API) |
| Build Tool | Vite |
| Routing | Vue Router |
| State Management | Pinia |
| Authentifizierung | Auth0 (OAuth2/JWT) |
| Styling | Custom CSS (Design System) |
| Hosting | GitHub Pages |

## Setup

```bash
npm install
npm run dev
```

Die App laeuft unter `http://localhost:5173`.

### Umgebungsvariablen

Eine `.env`-Datei im Root mit folgenden Werten wird benoetigt:

```
VITE_AUTH0_DOMAIN=<auth0-domain>
VITE_AUTH0_CLIENT_ID=<auth0-client-id>
VITE_AUTH0_AUDIENCE=<auth0-audience>
VITE_API_BASE_URL=<backend-api-url>
```

## Live-Demo

| Komponente | URL |
|---|---|
| Frontend | https://htwg-in-schneider.github.io/frontend-polymirror/ |
| Backend API | https://backend-polymirror.onrender.com/api |

### Test-Zugangsdaten

| Rolle | E-Mail | Passwort |
|---|---|---|
| User | syconnect00@gmail.com | Admin123! |
| Admin | admin@polymirror.de | Admin123! |

> Der Admin-Account hat Zugang zum Admin Panel unter `/admin`.

## Projektstruktur

```
src/
  assets/css/       # Globale Styles & Design System
  components/       # Wiederverwendbare Komponenten (NavBar, Footer, etc.)
  router/           # Vue Router Konfiguration
  stores/           # Pinia Stores (User, Markets)
  views/            # Seiten (Markets, Dashboard, Admin, etc.)
```

## Dokumentation

Die vollstaendige Projektdokumentation (Spezifikation, Use Cases, Implementierung, Screenshots) befindet sich unter:

**[docs/DOKUMENTATION.md](docs/DOKUMENTATION.md)**

## Team

Simon Kulik & Thomas Buehler
