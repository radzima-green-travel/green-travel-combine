export interface Feature {
  name: string;
  bootstrap: (...args: any[]) => Promise<any>;
  exports: Record<string, any>;
}
