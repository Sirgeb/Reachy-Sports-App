import React from 'react';
import { withRouter } from 'react-router-dom';
import { useQuery, gql, useMutation } from '@apollo/react-hooks';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import { toast } from 'react-toastify';
import Select from '@material-ui/core/Select';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import InputLabel from '@material-ui/core/InputLabel';
import WYSIWYGEditor from './WYSIWYGEditor';
import Button from '@material-ui/core/Button';
import LinearProgress from './LinearProgress';

const INITIAL_STATE = {
  isFeatured: false,
  image: '',
  caption: '',
  category: '',
  description: ''
};

const GET_POST = gql`
  query GET_POST($postId: ID!) {
    getPost(postId: $postId) {
      id
      image
      caption
      description
      isFeatured
      category
    }
  }
`;

const UPDATE_POST = gql`
  mutation UPDATE_POST(
    $postId: ID!
    $image: String
    $caption: String
    $description: String
    $category: String
  ) {
    updatePost(
      postId: $postId
      image: $image
      caption: $caption
      description: $description
      category: $category
    )
  }
`;

const SportsUpdateForm = ({ createPost, loading, match, history }) => {
  const postId = match.params.id;
  const { data } = useQuery(GET_POST, { variables: { postId }, fetchPolicy: "cache-and-network"});
  const [updatePost] = useMutation(UPDATE_POST, { onCompleted: () => {
    toast.success("Changes Saved Successfully!", { autoClose: 3000, className: 'toastify-success' });
  }});
  const [state, setState] = React.useState(INITIAL_STATE);
  const [isFilled, setIsFilled] = React.useState(false);
  const [editorState, setEditorState] = React.useState(EditorState.createEmpty);
  const classes = useStyles();

  React.useEffect(() => {
    const fields = { ...state };
    delete fields.isFeatured
    const filled = Object.values(fields).every(field => Boolean(field));
    setIsFilled(!filled) 
  }, [state]);

  React.useEffect(() => {
    if (data !== undefined) {
      const { image, caption, description, isFeatured, category } = data.getPost;
      setState(prevState => ({ ...prevState, image, caption, description, isFeatured, category }));
      convertHtmlToDraft(description);
    }
  }, [data])

  const handleSubmit = async () => {
    if (postId) {
      try {
        await updatePost({
          variables: {
            ...state,
            postId
          }
        });
        history.push('/');
      } catch (e) {
        toast.error(`${e.message}`, { autoClose: 5000 })
      }
    } else {
      try {
        await createPost({
          variables: {
            ...state
          }
        });
        setState(INITIAL_STATE);
        setEditorState('');
      } catch (e) {
        toast.error(`${e.message}`, { autoClose: 5000 })
      }
    }
  }

  const isDisabled = (loading) => {
    if (loading) return "none";
  }
  
  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
    const description = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    setState({ ...state, description });
  };

  const convertHtmlToDraft = (HTML) => {
    const contentBlock = htmlToDraft(HTML);
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
      const editorState = EditorState.createWithContent(contentState);
      setEditorState(editorState);
    }
  }

  const handleChange = (event) => {
    if (event.target.name === "isFeatured") {
      setState({ ...state, [event.target.name]: !state.isFeatured });
    } else {
      setState({ ...state, [event.target.name]: event.target.value });
    }
  };

  return (
    <React.Fragment>
      { loading ? <LinearProgress /> : null }
      <Paper elevation={3} variant="outlined">
        <form noValidate autoComplete="off">
          <div className={classes.root}>
            <FormControlLabel
              control={
                <Switch 
                  onChange={handleChange} 
                  name="isFeatured" 
                  value={state.isFeatured}
                  disabled={loading}
                />
              }
              label="Feature Post On Slider"
            />
            <TextField
              label="Caption"
              className={classes.input}
              helperText="Enter Caption of the Post here"
              name="caption"
              disabled={loading}
              onChange={handleChange}
              value={state.caption}
            /> 
            <FormControl className={classes.input}>
              <InputLabel id="demo-simple-select-label" >Category</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="category"
                value={state.category}
                disabled={loading}
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
              disabled={loading}
              onChange={handleChange}
              value={state.image}
            /> 
            <label className={classes.editorLabel}>Enter the body of your post in the box below</label>
            <div className={classes.editor} style={{ pointerEvents: isDisabled(loading) }}>
              <WYSIWYGEditor 
                onEditorStateChange={onEditorStateChange}
                editorState={editorState}
              />
            </div>
            <Button 
              variant="outlined" 
              disabled={loading || isFilled} 
              onClick={handleSubmit}
            >
              { postId ? 'Save Post' : 'Publish Post'}
            </Button>
          </div> 
        </form>
      </Paper>
    </React.Fragment>
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

export default withRouter(SportsUpdateForm);
