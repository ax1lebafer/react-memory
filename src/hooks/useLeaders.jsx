import { useContext } from "react";
import { LeadersContext } from "../contexts/LeadersContext";

export function useLeaders() {
  return useContext(LeadersContext);
}
