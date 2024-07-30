import { useContext } from "react";
import { EasyModeContext } from "../contexts/EasyModeContext";

export function useEasyMode() {
  return useContext(EasyModeContext);
}
