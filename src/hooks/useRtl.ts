import { useState, useCallback, useEffect } from "react";

function useRtl() {
  const [isRtl, update] = useState(document.dir === "rtl" ? true : false);
  const toggle = useCallback(() => update((s) => !s), []);

  useEffect(() => {
    document.dir = isRtl ? "rtl" : "ltr";
  }, [isRtl]);

  return [isRtl, toggle];
}

export { useRtl };
