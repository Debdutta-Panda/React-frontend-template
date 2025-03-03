import { scan } from "react-scan";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

import { BrowserRouter } from "react-router";
import { PrimeReactProvider } from "primereact/api";
import "./themes/lara_custom/theme.css";
import { create } from "zustand";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { persist, createJSONStorage } from 'zustand/middleware'

/*scan({
	enabled: false,
  });*/

const queryClient = new QueryClient();

export const useBearStore = create(persist((set) => ({
	bears: 0,
	increasePopulation: () =>
		set((state: any) => ({ bears: state.bears + 1 })),
	removeAllBears: () => set({ bears: 0 }),
}),{
	name: 'food-storage', // name of the item in the storage (must be unique)
	storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
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
