import { useCallback, useState } from "react";

export type FiltersState = {
  ticket_id?: string;
  fk_user_id?: string;
  name?: string;
  mobile?: string;
  email?: string;
  national_code?: string;
  content?: string;
  ip_address?: string;
  fk_department_id?: string;
  status: string;
};

export type FiltersHook = {
  state: FiltersState;
  setState: (newState: Partial<FiltersState>) => void;
  setField: <K extends keyof FiltersState>(
    field: K,
    value: FiltersState[K]
  ) => void;
  resetState: (newState?: Partial<FiltersState>) => void;
};

export function useFilters(initialState: FiltersState): FiltersHook {
  const [state, setState] = useState<FiltersState>(initialState);

  const updateState = useCallback((newState: Partial<FiltersState>) => {
    setState((prev) => ({ ...prev, ...newState }));
  }, []);

  const setField = useCallback(
    <K extends keyof FiltersState>(field: K, value: FiltersState[K]) => {
      setState((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  const resetState = useCallback(
    (newState?: Partial<FiltersState>) => {
      setState((prev) => ({
        ...initialState,
        ...(newState || {}),
      }));
    },
    [initialState]
  );

  return {
    state,
    setState: updateState,
    setField,
    resetState,
  };
}
