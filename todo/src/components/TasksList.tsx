import { useMemo, useState } from 'react';
import {
  Box,
  Grid,
  FormControlLabel,
  Checkbox,
  IconButton,
  Input,
  FormControl,
  InputLabel,
  InputAdornment,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneIcon from '@mui/icons-material/Done';
import { ITasks, ITasksList, ITask } from './interfaces.ts';

export default function TaskList({
  tasks,
  onChangeTask,
  onDeleteTask,
}: ITasksList) {
  const allTasks = useMemo(
    () => tasks.filter((task: any) => !task.done),
    [tasks],
  );
  const readyTasks = useMemo(
    () => tasks.filter((task: any) => task.done),
    [tasks],
  );

  return (
    <>
      {allTasks.length > 0 && (
        <p style={{ color: '#00000099', fontSize: 12 }}>
          ПЛАН ({allTasks.length})
        </p>
      )}
      {allTasks.map((task: ITask) => (
        <Grid
          container
          direction='row'
          justifyContent='space-between'
          alignItems='center'
          key={task.id}
        >
          <Task
            task={task}
            onChangeTask={onChangeTask}
            onDeleteTask={onDeleteTask}
          />
        </Grid>
      ))}
      {readyTasks.length > 0 && (
        <p style={{ color: '#00000099', fontSize: 12 }}>
          ГОТОВО({readyTasks.length})
        </p>
      )}

      {readyTasks.map((task: ITask) => (
        <Grid
          container
          direction='row'
          justifyContent='space-between'
          alignItems='center'
          key={task.id}
        >
          <Task
            task={task}
            onChangeTask={onChangeTask}
            onDeleteTask={onDeleteTask}
          />
        </Grid>
      ))}
    </>
  );
}

function Task({ task, onChangeTask, onDeleteTask }: ITasks) {
  const [isEditing, setIsEditing] = useState(false);
  let taskContent;
  if (isEditing) {
    taskContent = (
      <>
        <FormControl fullWidth variant='standard'>
          <InputLabel htmlFor='inputTask' shrink={true}>
            Имя задачи
          </InputLabel>
          <Input
            value={task.text}
            onChange={(e) => {
              onChangeTask({
                ...task,
                text: e.target.value,
              });
            }}
            id='inputTask'
            endAdornment={
              <InputAdornment position='end'>
                <IconButton
                  color='primary'
                  onClick={() => {
                    setIsEditing(false);
                  }}
                >
                  <DoneIcon />
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
      </>
    );
  } else {
    taskContent = (
      <>
        <FormControlLabel
          control={
            <Checkbox
              checked={task.done}
              onChange={(e) => {
                onChangeTask({
                  ...task,
                  done: e.target.checked,
                });
              }}
            />
          }
          label={task.text}
        />
        <Box>
          {task.done ? (
            ''
          ) : (
            <IconButton
              color='primary'
              onClick={() => {
                setIsEditing(true);
              }}
            >
              <EditIcon />
            </IconButton>
          )}

          <IconButton
            color='warning'
            onClick={() => {
              onDeleteTask(task.id);
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      </>
    );
  }
  return <>{taskContent}</>;
}
