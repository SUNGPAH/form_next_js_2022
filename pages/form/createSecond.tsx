import styles from '../../styles/Home.module.css'
import {useState} from 'react';
import { v4 as uuidv4 } from 'uuid';
import Question from '../../src/components/form/Question';
import { QuestionInterface } from '../../src/interfaces/form';

export default function CreateSecond() {
  const [title, setTitle] = useState<string>("");
  const [questions, setQuestions] = useState<Array<QuestionInterface>>([]);

  const submit = () => {
    alert(questions.length);
  }

  const addDefaultQuestion = () => {
    const cp = [...questions]
    cp.push({
      uuid: uuidv4(),
      title: "default title",
      questionType: "checkbox",
      description:"",
      selectOptions: [
        {
          uuid: uuidv4(),
          title: "default",
          description: "default Description"
        }
      ]
    })
    setQuestions(cp);
  }

  const updateTitle = (text, uuid) => {
    const foundIndex = questions.findIndex(question => question.uuid === uuid)
    if(foundIndex === -1){
      return false
    }

    const cp = [...questions]
    cp[foundIndex].title = text
    setQuestions(cp)
  }

  const updateDescription = (text, uuid) => {
    const foundIndex = questions.findIndex(question => question.uuid === uuid)
    if(foundIndex === -1){
      return false
    }

    const cp = [...questions]
    cp[foundIndex].description = text
    setQuestions(cp)
  }

  const updateQuestionType = (questionType, uuid) => {
    const foundIndex = questions.findIndex(question => question.uuid === uuid)
    if(foundIndex === -1){
      return false
    }

    const cp = [...questions]
    cp[foundIndex].questionType = questionType
    setQuestions(cp)
  }

  const addSelectOption = (uuid) => {
    const foundIndex = questions.findIndex(question => question.uuid === uuid)
    if(foundIndex === -1){
      return false
    }

    const cp = [...questions]
    const question = cp[foundIndex]
    question.selectOptions.push({
      uuid: uuidv4(),
      title: "default",
      description: "default option"
    })
    setQuestions(cp)
  }

  const updateSelectOption = (text, uuid, optionUuid, key) => {
    const foundIndex = questions.findIndex(question => question.uuid === uuid)
    if(foundIndex === -1){
      return false
    }

    const cp = [...questions]

    const question = cp[foundIndex]
    const selectOptions = question.selectOptions
    const foundSelectOptionIndex = selectOptions.findIndex(selectOption => selectOption.uuid === optionUuid)
    if(foundSelectOptionIndex === -1){
      return false
    }

    // selectOptions[foundSelectOptionIndex].title = text
    selectOptions[foundSelectOptionIndex][key] = text
    setQuestions(cp)
  }

  const deleteSelectOption = (uuid, optionUuid) => {
    const foundIndex = questions.findIndex(question => question.uuid === uuid)
    if(foundIndex === -1){
      return false
    }

    const cp = [...questions]

    const question = cp[foundIndex]
    const selectOptions = question.selectOptions
    const foundSelectOptionIndex = selectOptions.findIndex(selectOption => selectOption.uuid === optionUuid)
    if(foundSelectOptionIndex === -1){
      return false
    }

    selectOptions.splice(foundSelectOptionIndex, 1)
    setQuestions(cp)
    //now time to learn slice.
  }

  return (
    <div className={styles.container}>
      <div>
        <span>create form</span>
        <br/>
        <input id="input" onChange={e => setTitle(e.target.value)} placeholder="input here.." value={title}/>
        <br/>

        {questions.map((question,index) => {
          return <Question key={index} question={question} 
          updateDescription={updateDescription}
          updateTitle={updateTitle}
          updateQuestionType={updateQuestionType}
          addSelectOption={addSelectOption}
          updateSelectOption={updateSelectOption}
          deleteSelectOption={deleteSelectOption}
          />
        })}

        <button onClick={e => addDefaultQuestion()}>add</button>
        <button onClick={e => submit()}>submit</button>
      </div>
    </div>
  )
}

