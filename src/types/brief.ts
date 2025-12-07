export interface BriefStep {
  label: string;
  required: boolean;
  type?: 'text' | 'textarea' | 'options';
  key: string;
  options?: string[];
}
