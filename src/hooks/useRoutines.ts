import { useCallback, useEffect, useState } from "react";
import type { Routine, RoutineInput } from "../types/routines";
import {
  createRoutine,
  deleteRoutine,
  getRoutine,
  listRoutines,
  updateRoutine,
} from "../lib/routinesStorage";

export function useRoutines() {
  const [routines, setRoutines] = useState<Routine[]>([]);
  const [ready, setReady] = useState(false);

  const refresh = useCallback(() => {
    setRoutines(listRoutines());
    setReady(true);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const create = useCallback(
    (input: RoutineInput) => {
      const routine = createRoutine(input);
      refresh();
      return routine;
    },
    [refresh]
  );

  const update = useCallback(
    (id: string, input: RoutineInput) => {
      const routine = updateRoutine(id, input);
      refresh();
      return routine;
    },
    [refresh]
  );

  const remove = useCallback(
    (id: string) => {
      const ok = deleteRoutine(id);
      refresh();
      return ok;
    },
    [refresh]
  );

  const find = useCallback((id: string) => getRoutine(id), []);

  return { routines, ready, refresh, create, update, remove, find };
}
