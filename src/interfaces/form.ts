export interface QuestionInterface{
  uuid: string;
  title: string;
  questionType: string;
  description: string;
  selectOptions: Array<SelectOptionInterface>;
}

export interface SelectOptionInterface{
  uuid: string;
  title: string;
  description: string;
}
