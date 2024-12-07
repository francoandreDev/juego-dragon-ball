import { BrowserRouter, Route, Routes } from "react-router";

import { CharactersDetailPage } from "../pages/Characters.detail.page.tsx";
import { CharactersPage } from "../pages/Characters.page.tsx";
import { Footer } from "./Footer/Footer.tsx";
import { GamePage } from "../pages/Game.page.tsx";
import { GlobalStateProvider } from "../hooks/useGlobalState.tsx";
import { HomePage } from "../pages/Home.page.tsx";
import { PlanetsDetailPage } from "../pages/Planets.detail.page.tsx";
import { PlanetsPage } from "../pages/Planets.page.tsx";

export function App() {
    return (
        <GlobalStateProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/characters" element={<CharactersPage />} />
                    <Route
                        path="/characters/:id"
                        element={<CharactersDetailPage />}
                    />
                    <Route path="/planets" element={<PlanetsPage />} />
                    <Route
                        path="/planets/:id"
                        element={<PlanetsDetailPage />}
                    />
                    <Route path="/game/player/:id" element={<GamePage />} />
                </Routes>
                <Footer />
            </BrowserRouter>
        </GlobalStateProvider>
    );
}
