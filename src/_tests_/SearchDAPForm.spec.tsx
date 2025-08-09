// import React from "react";
// import { render, screen, fireEvent, waitFor } from "@testing-library/react";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { StoreContext } from "../../context/Store";
// import SearchDAPForm from "@/components/SearchDAPForm";
// import { vi, describe, it, expect } from "vitest";
// import { IPlans, ISearch, IUser } from "@/@types/store";
// import { Individual } from "@/lib/types/Individual";
// import { MemoryRouter } from "react-router";

// // Polyfill for ResizeObserver (JSDOM doesn't implement it)
// if (typeof ResizeObserver === "undefined") {
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   (globalThis as any).ResizeObserver = class {
//     observe() {}
//     unobserve() {}
//     disconnect() {}
//   };
// }

// // Mock fetchIndividuals to always return an empty array.
// vi.mock('@/services/IndividualsService', () => ({
//   fetchIndividuals: vi.fn(() => Promise.resolve([]))
// }));

// // Create a new QueryClient instance.
// const createQueryClient = () => new QueryClient();

// // Define a dummy store matching your StoreContextType.
// const dummyStore = {
//   state: {
//     user: {} as IUser,
//     search: {} as ISearch,
//     plans: {} as IPlans,
//     currentSelection: {
//       currentIndividual: { id: "1", first_name: "Kevin", last_name: "Smith", mrn: "123456", dob: "01/02/1956", created_at: "", created_by: "system" } as Individual,
//       currentPlan: null,
//     },
//     currentUser: {},
//   },
//   dispatch: vi.fn(),
//   user: {} as IUser,
//   search: {} as ISearch,
//   plans: {} as IPlans,
//   currentSelection: {
//     currentIndividual: { id: "1", first_name: "Kevin", last_name: "Smith", mrn: "123456", dob: "01/02/1956", created_at: "", created_by: "system" } as Individual,
//     currentPlan: null,
//   },
//   UserService: {},
//   SearchService: {},
//   LandingService: {},
//   RestService: {},
// };

// // Define an override store where no individual is selected.
// const noCurrentStore = {
//   ...dummyStore,
//   state: {
//     ...dummyStore.state,
//     currentSelection: { currentIndividual: null, currentPlan: null },
//   },
//   currentSelection: { currentIndividual: null, currentPlan: null },
// };

// // Inline wrapper component that provides both context providers.
// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// const AllProviders: React.FC<{ children: React.ReactNode; store?: any }> = ({ children, store }) => {
//   const queryClient = createQueryClient();
//   return (
//     <StoreContext.Provider value={store || dummyStore}>
//       <QueryClientProvider client={queryClient}>
//         <MemoryRouter>{children}</MemoryRouter>
//       </QueryClientProvider>
//     </StoreContext.Provider>
//   );
// };

// // Helper that renders with our providers.
// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// const renderWithProviders = (ui: React.ReactElement, storeOverride?: any) => {
//   return render(ui, {
//     wrapper: ({ children }) => <AllProviders store={storeOverride}>{children}</AllProviders>,
//   });
// };

// describe("SearchDAPForm", () => {
//   it("populates the CommandInput with the current individual's full name", () => {
//     renderWithProviders(<SearchDAPForm />);
//     const input = screen.getByPlaceholderText(/Search for individual/i) as HTMLInputElement;
//     expect(input.value).toBe("Kevin Smith");
//   });

//   it("shows loading immediately when user begins typing", async () => {
//     renderWithProviders(<SearchDAPForm />);
//     const input = screen.getByPlaceholderText(/Search for individual/i) as HTMLInputElement;
//     fireEvent.change(input, { target: { value: "K" } });
//     expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
//   });

//   it("does not flash 'Individual not found' when clearing the query", async () => {
//     // Use store override with no current individual.
//     renderWithProviders(<SearchDAPForm />, noCurrentStore);
//     const input = screen.getByPlaceholderText(/Search for individual/i) as HTMLInputElement;
//     // Type a query (our mock of fetchIndividuals always returns empty).
//     fireEvent.change(input, { target: { value: "Some Name" } });
//     // Wait for the "Individual not found" message to appear.
//     const notFoundElement = await screen.findByText(/Individual not found/i, {}, { timeout: 1500 });
//     expect(notFoundElement).toBeInTheDocument();
//     // Now clear the query.
//     const clearButton = screen.getByTitle("Clear");
//     fireEvent.click(clearButton);
//     // Wait for the "Individual not found" message to disappear.
//     await waitFor(
//       () => expect(screen.queryByText(/Individual not found/i)).toBeNull(),
//       { timeout: 500 }
//     );
//   });

//   it("dispatches CLEAR_CURRENT_INDIVIDUAL and CLEAR_CURRENT_PLAN when clear button is clicked", () => {
//     renderWithProviders(<SearchDAPForm />);
//     const clearButton = screen.getByTitle("Clear");
//     fireEvent.click(clearButton);
//     expect(dummyStore.dispatch).toHaveBeenCalledWith({ type: "CLEAR_CURRENT_INDIVIDUAL" });
//     expect(dummyStore.dispatch).toHaveBeenCalledWith({ type: "CLEAR_CURRENT_PLAN" });
//   });
// });
