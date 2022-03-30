import { useEffect, useState } from "react";
import TaskList from "./TaskList";
import { IconButton, ListItem } from "@mui/material";
import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
// import IconButton from '@mui/material/IconButton';
import CommentIcon from '@mui/icons-material/Comment';

function Task({ title, condition, id, setTasks }) {

  const [checked, setChecked] = useState([0]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };




  const [editInput, setEditInput] = useState({});
  useEffect(() => {
    return () => {
    };
  }, [editInput]);

  const inputHandler = async (e) => {
    setEditInput((prev) => ({
      ...prev,
      title: e.target.value,
    }));
  };

  const buttonHandler = async (id) => {
    const response = await fetch('http://localhost:3001', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });
    if (response.ok) {
      setTasks((prev) => prev.filter((el) => el.id !== id));
    }
  };

  const checkInput = async () => {
    const response = await fetch('http://localhost:3001', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });
    if (response.ok) {
      const task = await response.json();
      setTasks((prev) => {
          prev = prev.map((el) => {
            if (el.id === task.id) {
              el = { ...task };
            }
            return el;
          });
          return [...prev];
        }
      );
    }
  };

  const editHandler = async (id) => {
    const title = editInput.title;
    const response = await fetch('http://localhost:3001', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, id })
    });
    if (response.ok) {
      const task = await response.json();
      setTasks((prev) => {
        prev = prev.map((el) => {
          if (el.id === task.id) {
            el = { ...task };
          }
          return el;
        });
        return [...prev];
      });
      setEditInput({});
    } else {
      console.log(response);
    }
  };

  return (
  //   <ul className="list-group">
  //   <li className="list-group-item">
  //     <input onChange={checkInput} className="form-check-input me-1" type="checkbox" checked={condition}/>
  //     <span style={{ textDecoration: condition ? 'line-through' : 'none' }}>{title}</span>
  //     <button onClick={() => buttonHandler(id)} type="button" className="btn btn-outline-danger">Удалить</button>
  //     <span>
  //         <input onChange={inputHandler} placeholder={title} name="title" type="text"/>
  //         <button type="button" onClick={() => editHandler(id)} className="btn btn-outline-success">Изменить</button>
  //     </span>
  //   </li>
  // </ul>

  <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        <ListItem
          secondaryAction={
            <IconButton edge="end" aria-label="comments">
              <CommentIcon />
            </IconButton>
          }
          disablePadding
        >
          <ListItemButton role={undefined} onClick={checkInput} dense>
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={condition}
                onChange={checkInput}
                tabIndex={-1}
                disableRipple
              />
            </ListItemIcon>
            <ListItemText><span style={{ textDecoration: condition ? 'line-through' : 'none' }}>{title}</span></ListItemText>
          </ListItemButton>
        </ListItem>

  </List>

  );
}

export default Task;

//
// git remote add origin git@github.com:AA-21/game.git
// git branch -M main
// git push -u origin main
