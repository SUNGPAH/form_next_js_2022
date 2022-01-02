import styles from '../../styles/Home.module.css'
import {useState} from 'react';
import { v4 as uuidv4 } from 'uuid';

export default function Create() {
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([]);

/*
  question:
    uuid
    title, description
    questionType, # radio, checkbox, text, longText, ...
    selectOptions = [
      {
        uuid: ,
        title: ,
        description,
      }, ..
    ]
*/
  //without typestcript.. it will be so painful

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

const Question = ({question, updateTitle, updateDescription, updateQuestionType,
  addSelectOption, deleteSelectOption, updateSelectOption,
}) => {
  return <div>
    <br/>
    <input onChange={e => updateTitle(e.target.value, question.uuid)}
      value={question.title}
      placeholder="question title"
    />
    <br/>

    <input onChange={e => updateDescription(e.target.value, question.uuid)}
      value={question.description}
      placeholder="question description"
    />

    <select value={question.questionType} onChange={e => updateQuestionType(e.target.value, question.uuid)}>
      <option value="checkbox">checkbox</option>
      <option value="radio">radio</option>
      <option value="text">text</option>
      <option value="longText">long Text</option>
    </select>

    <div>here, if the question itself is..</div>

    {((question.questionType === "checkbox") || (question.questionType === "radio")) && 
      <div style={{paddingLeft:40,}}>
        {question.selectOptions.map((option, index) => {
          return <div key={index}>
            <input onChange={e => updateSelectOption(e.target.value, question.uuid, option.uuid, "title")} 
            value={option.title}/>
            [{option.uuid}]
            <br/>
            <input onChange={e => updateSelectOption(e.target.value, question.uuid, option.uuid, "description")} 
            value={option.description}/>

            <button onClick={e => deleteSelectOption(question.uuid, option.uuid)}>Delete Option</button>
            <br/>
          </div>
        })}
        <button onClick={e => addSelectOption(question.uuid)}>add</button>
      </div>
    }
  </div>
}

