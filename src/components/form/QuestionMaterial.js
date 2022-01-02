import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Chip from '@mui/material/Chip';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const Question = ({ question, updateTitle, updateDescription, updateQuestionType,
  addSelectOption, deleteSelectOption, updateSelectOption,
}) => {
  return <Box
    component="div"
    sx={{
      m: 1,
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      p: 2,
      bgcolor: 'white',
      borderRadius: 2
    }}
  >
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
        }}
      >
        <TextField id=""
          onChange={e => updateTitle(e.target.value, question.uuid)}
          placeholder="question Title"
          value={question.title}
          variant="standard" />

        <TextField onChange={e => updateDescription(e.target.value, question.uuid)}
          value={question.description}
          placeholder="question description"
          variant="standard"
        />
      </Box>
      <Select
        sx={{width:150,}}
        labelId="demo-simple-select-standard-label"
        id="demo-simple-select-standard"
        value={question.questionType}
        onChange={e => updateQuestionType(e.target.value, question.uuid)}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value={'checkbox'}>CheckBox</MenuItem>
        <MenuItem value={'radio'}>Radio</MenuItem>
        <MenuItem value={'longText'}>Long Text</MenuItem>
      </Select>
    </Box>

    {((question.questionType === "checkbox") || (question.questionType === "radio")) &&
      <Box>
        {question.selectOptions.map((option, index) => {
          return <Box
            key={index}
            sx={{
              '& > :not(style)': { m: 1, },
            }}
          >
            <TextField id=""
              onChange={e => updateSelectOption(e.target.value, question.uuid, option.uuid, "title")}
              placeholder="Option Title" value={option.title}
              variant="standard" />
            <br />

            <TextField id=""
              onChange={e => updateSelectOption(e.target.value, question.uuid, option.uuid, "description")}
              placeholder="Option Description" value={option.description}
              variant="standard" />

            <Chip
              width={40}
              label="Deletable"
              onDelete={e => deleteSelectOption(question.uuid, option.uuid)} />
            <br />
          </Box>
        })}

        <Fab size="small" color="primary"
          onClick={e => addSelectOption(question.uuid)}
          aria-label="add">
          <AddIcon />
        </Fab>

      </Box>
    }
  </Box>
}

export default Question