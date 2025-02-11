export interface AnalyticsClient {
  track: (eventName: string, properties: Record<string, unknown>) => void;
}
