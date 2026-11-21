import { createServerFn } from "@tanstack/react-start";
import { getRequest, setResponseHeader } from "@tanstack/react-start/server";

export const loadTopicPayload = createServerFn({ method: "GET" })
  .validator((value: { topicName?: string }) => value)
  .handler(async ({ data, context }) => {
    setResponseHeader("Cache-Control", "private, no-store");
    const { loadTopicPayloadServer } = await import(
      "@/lib/topicPayloadRoute.server"
    );
    return loadTopicPayloadServer({
      request:
        (context as { request?: Request } | undefined)?.request ?? getRequest(),
      topicName: data.topicName?.trim() ?? "",
    });
  });
