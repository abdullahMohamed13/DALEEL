import { STATIC_RESPONSES } from "@/static-data/staticResponses";

export function useStaticResponses() {
    function checkStaticResponse(input: string): string | null {
        const lower = input.toLowerCase().trim();
        for (const key of Object.keys(STATIC_RESPONSES)) {
          const { patterns, response } = STATIC_RESPONSES[key];
          if (patterns.some((p: string) => lower.includes(p))) {
            return response;
          }
        }
        return null;
    }

    return {checkStaticResponse}
}