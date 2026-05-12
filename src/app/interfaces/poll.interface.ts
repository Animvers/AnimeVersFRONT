import { ChoiceInterface } from './choice.interface';
export interface PollInterface {
  id?: number;
  title: string;
  is_active: boolean;
  question: string;
  create_at?: Date | string;
  image_url?: string;
  category_name: string;
  who_make_it_id_id?: number;

  choices: ChoiceInterface[] | string[];
}
