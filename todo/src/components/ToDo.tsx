import { Box } from '@mui/system';
import { useCallback, useState } from 'react';
import './todo.css';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import AddIcon from '@mui/icons-material/Add';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import TaskList from './TasksList';
import { ITask } from './interfaces.ts';

const initialState = [
  { id: 1, text: 'помыть посуду', done: false },
  { id: 2, text: 'сходить в магазин', done: false },
];

export default function ToDo() {
  const [tasks, setTasks] = useState(initialState);
  const [taskName, setTaskName] = useState('');

  function AddTask() {
    setTasks([
      ...tasks,
      {
        id: tasks.length + 1,
        text: taskName,
        done: false,
      },
    ]);
  }

  function ChangeTask(task: ITask) {
    setTasks(
      tasks.map((t) => {
        if (t.id === task.id) {
          return task;
        } else {
          return t;
        }
      }),
    );
  }

  function DeleteTask(taskId: number) {
    setTasks(tasks.filter((t) => t.id !== taskId));
  }

  return (
    <Box
      sx={{
        width: 515,
        height: 766,
        margin: 'auto',
        marginTop: 12,

        bgcolor: 'white',
        borderRadius: 4,
      }}
    >
      <Box
        sx={{
          width: 420,
          height: 716,
          margin: 'auto',
        }}
      >
        <h1 className='headerTask'>TODO</h1>

        <FormControl
          fullWidth
          variant='standard'
          sx={{
            marginBottom: 2,
          }}
        >
          <InputLabel htmlFor='input' shrink={true}>
            Имя новой задачи
          </InputLabel>
          <Input
            value={taskName}
            onChange={(e: any) => setTaskName(e.target.value)}
            id='input'
            endAdornment={
              <InputAdornment sx={{ marginRight: 0 }} position='end'>
                {taskName.length < 1 ? (
                  <IconButton
                    color='primary'
                    sx={{
                      color: '#2196F380',
                      '&:hover': { background: 'none' },
                      paddingRight: '0px',
                      paddingLeft: '0px',
                    }}
                    onClick={() => {
                      setTaskName('');
                    }}
                  >
                    <AddIcon />
                  </IconButton>
                ) : (
                  <IconButton
                    color='primary'
                    sx={{
                      '&:hover': { background: 'none' },
                      paddingRight: '0px',
                      paddingLeft: '0px',
                    }}
                    onClick={() => {
                      setTaskName('');
                      AddTask();
                    }}
                  >
                    <AddIcon />
                  </IconButton>
                )}
              </InputAdornment>
            }
          />
        </FormControl>
        <TaskList
          tasks={tasks}
          onChangeTask={ChangeTask}
          onDeleteTask={DeleteTask}
        />
      </Box>
    </Box>
  );
}
