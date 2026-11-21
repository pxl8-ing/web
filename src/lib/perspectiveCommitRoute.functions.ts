import { createServerFn } from "@tanstack/react-start";
import { getRequest, setResponseHeader } from "@tanstack/react-start/server";

export const loadPerspectiveCommitMeta = createServerFn({ method: "GET" })
  .validator((value: { id?: string }) => value)
  .handler(async ({ data, context }) => {
    setResponseHeader("Cache-Control", "private, no-store");
    const id = data.id?.trim() ?? "";
    const request =
      (context as { request?: Request } | undefined)?.request ?? getRequest();
    const { loadPerspectiveCommitMetaServer } = await import(
      "@/lib/perspectiveCommitRoute.server"
    );
    return await loadPerspectiveCommitMetaServer({ id, request });
  });
