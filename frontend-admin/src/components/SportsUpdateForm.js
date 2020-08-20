import React from 'react';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import InputLabel from '@material-ui/core/InputLabel';
import WYSIWYGEditor from './WYSIWYGEditor';
import Button from '@material-ui/core/Button';

const SportsUpdateForm = () => {
  const [state, setState] = React.useState({
    isFeatured: false,
    image: '',
    caption: '',
    category: '',
    description: ''
  });

  const [editorState, setEditorState] = React.useState(EditorState.createEmpty);

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
    const description = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    setState({ ...state, description });
  };

  const handleChange = (event) => {
    if (event.target.name === "isFeatured") {
      setState({ ...state, [event.target.name]: !state.isFeatured });
    } else {
      setState({ ...state, [event.target.name]: event.target.value });
    }
  };

  const classes = useStyles();

  return (
    <Paper elevation={3} variant="outlined">
      <form noValidate autoComplete="off">
        <div className={classes.root}>
          <FormControlLabel
            control={
              <Switch 
                onChange={handleChange} 
                name="isFeatured" 
                value={state.isFeatured}
              />
            }
            label="Feature Post On Slider"
          />
          <TextField
            label="Caption"
            className={classes.input}
            helperText="Enter Caption of the Post here"
            name="caption"
            onChange={handleChange}
            value={state.caption}
          /> 
          <FormControl className={classes.input}>
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name="category"
              value={state.category}
              onChange={handleChange}
            >
              <MenuItem value="ATHLETICS">Athletics</MenuItem>
              <MenuItem value="BASKETBALL">Basketball</MenuItem>
              <MenuItem value="BOXING">Boxing</MenuItem>
              <MenuItem value="FOOTBALL">Football</MenuItem>
              <MenuItem value="GOLF">Golf</MenuItem>
              <MenuItem value="TENNIS">Tennis</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Image Url"
            helperText="Paste Image URL Here"
            className={classes.input}
            name="image"
            onChange={handleChange}
            value={state.image}
          /> 
          <label className={classes.editorLabel}>Enter the body of your post in the box below</label>
          <div className={classes.editor}>
            <WYSIWYGEditor 
              onEditorStateChange={onEditorStateChange}
              editorState={editorState}
            />
          </div>
          <Button variant="outlined">
            Publish Post
          </Button>
        </div> 
      </form>
    </Paper>
  )
}

const useStyles = makeStyles(() => ({
  root: {
    padding: 10
  },
  input: {
    width: '100%',
    marginBottom: 20
  },
  editor: {
    maxWidth: 1050, 
    border: '0.5px solid #ccc', 
    marginBottom: 10, 
    padding: 10
  },
  editorLabel: {
    fontSize: 12, 
    color: "#757575"
  }
}));

export default SportsUpdateForm;
