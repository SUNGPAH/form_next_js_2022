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

export default Question