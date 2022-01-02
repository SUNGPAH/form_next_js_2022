import styles from '../../styles/Home.module.css'
import {useState, useEffect} from 'react';
import { v4 as uuidv4 } from 'uuid';
import QuestionMaterial from '../../src/components/form/QuestionMaterial';
import { QuestionInterface } from '../../src/interfaces/form';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';

const headerHeight = 100;

export default function CreateSecond() {
  const [title, setTitle] = useState<string>("");
  const [questions, setQuestions] = useState<Array<QuestionInterface>>([]);

  useEffect(() => {
    document.body.style.backgroundColor = "#ede7f6";
    addDefaultQuestion();
    return () => {document.body.style.backgroundColor = "white"}
  }, [])

  const submit = () => {
    alert(questions.length);
  }

  const addDefaultQuestion = () => {
    const cp = [...questions]
    cp.push({
      uuid: uuidv4(),
      title: "",
      questionType: "checkbox",
      description:"",
      selectOptions: [
        {
          uuid: uuidv4(),
          title: "",
          description: ""
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
      title: "",
      description: ""
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
  }

  return (
    <>
    <CssBaseline />
    <Box
      sx={{width:'100%', height:headerHeight, 
      backgroundColor:'white',
      display:'flex',
      flexDirection:'row',
      justifyContent: "space-between",
      zIndex:2,
      position:'fixed', left:0,}}
    >
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width:'100%',},
        }}
        noValidate
        autoComplete="off"
      >
        [icon]
        <TextField id="" label="Title" 
        onChange={e => setTitle(e.target.value)} placeholder="input here.." value={title}
        variant="standard" />
      </Box>
      
      <Box>
        other parts..
      </Box>

    </Box>
    <Container maxWidth="sm">
      <Box sx={{height:headerHeight,}}></Box>
      
      {questions.map((question,index) => {
        return <QuestionMaterial key={index} question={question} 
        updateDescription={updateDescription}
        updateTitle={updateTitle}
        updateQuestionType={updateQuestionType}
        addSelectOption={addSelectOption}
        updateSelectOption={updateSelectOption}
        deleteSelectOption={deleteSelectOption}
        />
      })}

      <Box sx={{ '& > :not(style)': { 
        m: 1, 
        position:'absolute', 
        bottom:20,
        right:5,
        } }}>
        <Fab color="primary" aria-label="add"
        onClick={e => addDefaultQuestion()}
        >
          <AddIcon />
        </Fab>
      </Box>
      {
        questions.length !== 0 &&
        <Box textAlign='center'>
          <Button size="large" variant="contained" onClick={e=>submit()}>Submit</Button>
        </Box>        
      }
    </Container>
    </>
  )
}

