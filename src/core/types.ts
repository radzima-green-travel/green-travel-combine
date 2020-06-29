export interface ILabelError {
  message: {
    titlePaths: string[];
    textPaths: string[];
  };
  status?: number;
  originalMessage: string;
}
