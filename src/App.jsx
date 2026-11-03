import React, { lazy, Suspense, useEffect } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { useGame } from "./store/game";
import Landing from "./pages/Landing";

const Game = lazy(() => import("./pages/Game"));
const Onboarding = lazy(() => import("./pages/Onboarding"));

const Loading = () => (
  <div className="flex h-[100dvh] items-center justify-center bg-ink" data-testid="app-loading">
    <div className="font-display text-2xl uppercase tracking-widest text-gold">Loading turf...</div>
  </div>
);

function Home() {
  const { player, loaded, load } = useGame();

  useEffect(() => {
    load();
  }, [load]);

  if (!loaded) return <Loading />;
  if (!player) return <Landing />;
  return (
    <Suspense fallback={<Loading />}>
      <Game />
    </Suspense>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Toaster
        theme="dark"
        position="top-center"
        offset="112px"
        toastOptions={{
          style: {
            borderRadius: 0,
            background: "#121212",
            border: "1px solid #FFD700",
            color: "#F3F4F6",
          },
        }}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/onboarding" element={<Suspense fallback={<Loading />}><Onboarding /></Suspense>} />
        <Route path="/game" element={<Suspense fallback={<Loading />}><Game /></Suspense>} />
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
