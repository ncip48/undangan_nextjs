"use client";

import { DependencyList, EffectCallback, useEffect, useRef } from "react";

const useEffectAfterMount = (
  cb: EffectCallback,
  dependencies: DependencyList | undefined
) => {
  const mounted = useRef(false);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      cb();
    }
  }, dependencies);
};

export default useEffectAfterMount;
