import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

import { BrowserRouter } from "react-router";
import { PrimeReactProvider } from "primereact/api";
import "./themes/lara_custom/theme.css";
import { create } from "zustand";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export const useBearStore = create((set) => ({
	bears: 0,
	increasePopulation: () =>
		set((state: any) => ({ bears: state.bears + 1 })),
	removeAllBears: () => set({ bears: 0 }),
}));

createRoot(document.getElementById("root")!).render(
	//<StrictMode>
	<PrimeReactProvider>
		<BrowserRouter>
			<QueryClientProvider client={queryClient}>
				<App />
			</QueryClientProvider>
		</BrowserRouter>
	</PrimeReactProvider>
	//</StrictMode>
);
