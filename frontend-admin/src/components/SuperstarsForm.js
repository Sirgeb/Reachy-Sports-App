import React from 'react';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Button from '@material-ui/core/Button';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import WYSIWYGEditor from './WYSIWYGEditor';

const SuperstarsForm = () => {
  const [state, setState] = React.useState({
    fullname: "",
    category: "",
    country: "",
    dateOfBirth: "",
    bio: "",
    image: ""
  });

  const [editorState, setEditorState] = React.useState(EditorState.createEmpty);

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
    const bio = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    setState({ ...state, bio });
  };

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const classes = useStyles();

  return (
    <Paper elevation={3} variant="outlined">
      <form noValidate autoComplete="off">
        <div className={classes.root}>
          <TextField
            label="Fullname"
            className={classes.input}
            helperText="Enter Superstar name here"
            name="fullname"
            onChange={handleChange}
            value={state.fullname}
          /> 
          <TextField
            id="date"
            label="Date of Birth"
            type="date"
            name="dateOfBirth"
            onChange={handleChange}
            value={state.dateOfBirth}
            className={classes.input}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <FormControl className={classes.input}>
            <InputLabel id="demo-simple-select-label">Select Country</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="country"
                value={state.country}
                onChange={handleChange}
              >
              <MenuItem value="Afganistan">Afghanistan</MenuItem>
              <MenuItem value="Albania">Albania</MenuItem>
              <MenuItem value="Algeria">Algeria</MenuItem>
              <MenuItem value="American Samoa">American Samoa</MenuItem>
              <MenuItem value="Andorra">Andorra</MenuItem>
              <MenuItem value="Angola">Angola</MenuItem>
              <MenuItem value="Anguilla">Anguilla</MenuItem>
              <MenuItem value="Antigua & Barbuda">Antigua & Barbuda</MenuItem>
              <MenuItem value="Argentina">Argentina</MenuItem>
              <MenuItem value="Armenia">Armenia</MenuItem>
              <MenuItem value="Aruba">Aruba</MenuItem>
              <MenuItem value="Australia">Australia</MenuItem>
              <MenuItem value="Austria">Austria</MenuItem>
              <MenuItem value="Azerbaijan">Azerbaijan</MenuItem>
              <MenuItem value="Bahamas">Bahamas</MenuItem>
              <MenuItem value="Bahrain">Bahrain</MenuItem>
              <MenuItem value="Bangladesh">Bangladesh</MenuItem>
              <MenuItem value="Barbados">Barbados</MenuItem>
              <MenuItem value="Belarus">Belarus</MenuItem>
              <MenuItem value="Belgium">Belgium</MenuItem>
              <MenuItem value="Belize">Belize</MenuItem>
              <MenuItem value="Benin">Benin</MenuItem>
              <MenuItem value="Bermuda">Bermuda</MenuItem>
              <MenuItem value="Bhutan">Bhutan</MenuItem>
              <MenuItem value="Bolivia">Bolivia</MenuItem>
              <MenuItem value="Bonaire">Bonaire</MenuItem>
              <MenuItem value="Bosnia & Herzegovina">Bosnia & Herzegovina</MenuItem>
              <MenuItem value="Botswana">Botswana</MenuItem>
              <MenuItem value="Brazil">Brazil</MenuItem>
              <MenuItem value="British Indian Ocean Ter">British Indian Ocean Ter</MenuItem>
              <MenuItem value="Brunei">Brunei</MenuItem>
              <MenuItem value="Bulgaria">Bulgaria</MenuItem>
              <MenuItem value="Burkina Faso">Burkina Faso</MenuItem>
              <MenuItem value="Burundi">Burundi</MenuItem>
              <MenuItem value="Cambodia">Cambodia</MenuItem>
              <MenuItem value="Cameroon">Cameroon</MenuItem>
              <MenuItem value="Canada">Canada</MenuItem>
              <MenuItem value="Canary Islands">Canary Islands</MenuItem>
              <MenuItem value="Cape Verde">Cape Verde</MenuItem>
              <MenuItem value="Cayman Islands">Cayman Islands</MenuItem>
              <MenuItem value="Central African Republic">Central African Republic</MenuItem>
              <MenuItem value="Chad">Chad</MenuItem>
              <MenuItem value="Channel Islands">Channel Islands</MenuItem>
              <MenuItem value="Chile">Chile</MenuItem>
              <MenuItem value="China">China</MenuItem>
              <MenuItem value="Christmas Island">Christmas Island</MenuItem>
              <MenuItem value="Cocos Island">Cocos Island</MenuItem>
              <MenuItem value="Colombia">Colombia</MenuItem>
              <MenuItem value="Comoros">Comoros</MenuItem>
              <MenuItem value="Congo">Congo</MenuItem>
              <MenuItem value="Cook Islands">Cook Islands</MenuItem>
              <MenuItem value="Costa Rica">Costa Rica</MenuItem>
              <MenuItem value="Cote DIvoire">Cote DIvoire</MenuItem>
              <MenuItem value="Croatia">Croatia</MenuItem>
              <MenuItem value="Cuba">Cuba</MenuItem>
              <MenuItem value="Curaco">Curacao</MenuItem>
              <MenuItem value="Cyprus">Cyprus</MenuItem>
              <MenuItem value="Czech Republic">Czech Republic</MenuItem>
              <MenuItem value="Denmark">Denmark</MenuItem>
              <MenuItem value="Djibouti">Djibouti</MenuItem>
              <MenuItem value="Dominica">Dominica</MenuItem>
              <MenuItem value="Dominican Republic">Dominican Republic</MenuItem>
              <MenuItem value="East Timor">East Timor</MenuItem>
              <MenuItem value="Ecuador">Ecuador</MenuItem>
              <MenuItem value="Egypt">Egypt</MenuItem>
              <MenuItem value="El Salvador">El Salvador</MenuItem>
              <MenuItem value="Equatorial Guinea">Equatorial Guinea</MenuItem>
              <MenuItem value="Eritrea">Eritrea</MenuItem>
              <MenuItem value="Estonia">Estonia</MenuItem>
              <MenuItem value="Ethiopia">Ethiopia</MenuItem>
              <MenuItem value="Falkland Islands">Falkland Islands</MenuItem>
              <MenuItem value="Faroe Islands">Faroe Islands</MenuItem>
              <MenuItem value="Fiji">Fiji</MenuItem>
              <MenuItem value="Finland">Finland</MenuItem>
              <MenuItem value="France">France</MenuItem>
              <MenuItem value="French Guiana">French Guiana</MenuItem>
              <MenuItem value="French Polynesia">French Polynesia</MenuItem>
              <MenuItem value="French Southern Ter">French Southern Ter</MenuItem>
              <MenuItem value="Gabon">Gabon</MenuItem>
              <MenuItem value="Gambia">Gambia</MenuItem>
              <MenuItem value="Georgia">Georgia</MenuItem>
              <MenuItem value="Germany">Germany</MenuItem>
              <MenuItem value="Ghana">Ghana</MenuItem>
              <MenuItem value="Gibraltar">Gibraltar</MenuItem>
              <MenuItem value="Great Britain">Great Britain</MenuItem>
              <MenuItem value="Greece">Greece</MenuItem>
              <MenuItem value="Greenland">Greenland</MenuItem>
              <MenuItem value="Grenada">Grenada</MenuItem>
              <MenuItem value="Guadeloupe">Guadeloupe</MenuItem>
              <MenuItem value="Guam">Guam</MenuItem>
              <MenuItem value="Guatemala">Guatemala</MenuItem>
              <MenuItem value="Guinea">Guinea</MenuItem>
              <MenuItem value="Guyana">Guyana</MenuItem>
              <MenuItem value="Haiti">Haiti</MenuItem>
              <MenuItem value="Hawaii">Hawaii</MenuItem>
              <MenuItem value="Honduras">Honduras</MenuItem>
              <MenuItem value="Hong Kong">Hong Kong</MenuItem>
              <MenuItem value="Hungary">Hungary</MenuItem>
              <MenuItem value="Iceland">Iceland</MenuItem>
              <MenuItem value="Indonesia">Indonesia</MenuItem>
              <MenuItem value="India">India</MenuItem>
              <MenuItem value="Iran">Iran</MenuItem>
              <MenuItem value="Iraq">Iraq</MenuItem>
              <MenuItem value="Ireland">Ireland</MenuItem>
              <MenuItem value="Isle of Man">Isle of Man</MenuItem>
              <MenuItem value="Israel">Israel</MenuItem>
              <MenuItem value="Italy">Italy</MenuItem>
              <MenuItem value="Jamaica">Jamaica</MenuItem>
              <MenuItem value="Japan">Japan</MenuItem>
              <MenuItem value="Jordan">Jordan</MenuItem>
              <MenuItem value="Kazakhstan">Kazakhstan</MenuItem>
              <MenuItem value="Kenya">Kenya</MenuItem>
              <MenuItem value="Kiribati">Kiribati</MenuItem>
              <MenuItem value="Korea North">Korea North</MenuItem>
              <MenuItem value="Korea Sout">Korea South</MenuItem>
              <MenuItem value="Kuwait">Kuwait</MenuItem>
              <MenuItem value="Kyrgyzstan">Kyrgyzstan</MenuItem>
              <MenuItem value="Laos">Laos</MenuItem>
              <MenuItem value="Latvia">Latvia</MenuItem>
              <MenuItem value="Lebanon">Lebanon</MenuItem>
              <MenuItem value="Lesotho">Lesotho</MenuItem>
              <MenuItem value="Liberia">Liberia</MenuItem>
              <MenuItem value="Libya">Libya</MenuItem>
              <MenuItem value="Liechtenstein">Liechtenstein</MenuItem>
              <MenuItem value="Lithuania">Lithuania</MenuItem>
              <MenuItem value="Luxembourg">Luxembourg</MenuItem>
              <MenuItem value="Macau">Macau</MenuItem>
              <MenuItem value="Macedonia">Macedonia</MenuItem>
              <MenuItem value="Madagascar">Madagascar</MenuItem>
              <MenuItem value="Malaysia">Malaysia</MenuItem>
              <MenuItem value="Malawi">Malawi</MenuItem>
              <MenuItem value="Maldives">Maldives</MenuItem>
              <MenuItem value="Mali">Mali</MenuItem>
              <MenuItem value="Malta">Malta</MenuItem>
              <MenuItem value="Marshall Islands">Marshall Islands</MenuItem>
              <MenuItem value="Martinique">Martinique</MenuItem>
              <MenuItem value="Mauritania">Mauritania</MenuItem>
              <MenuItem value="Mauritius">Mauritius</MenuItem>
              <MenuItem value="Mayotte">Mayotte</MenuItem>
              <MenuItem value="Mexico">Mexico</MenuItem>
              <MenuItem value="Midway Islands">Midway Islands</MenuItem>
              <MenuItem value="Moldova">Moldova</MenuItem>
              <MenuItem value="Monaco">Monaco</MenuItem>
              <MenuItem value="Mongolia">Mongolia</MenuItem>
              <MenuItem value="Montserrat">Montserrat</MenuItem>
              <MenuItem value="Morocco">Morocco</MenuItem>
              <MenuItem value="Mozambique">Mozambique</MenuItem>
              <MenuItem value="Myanmar">Myanmar</MenuItem>
              <MenuItem value="Nambia">Nambia</MenuItem>
              <MenuItem value="Nauru">Nauru</MenuItem>
              <MenuItem value="Nepal">Nepal</MenuItem>
              <MenuItem value="Netherland Antilles">Netherland Antilles</MenuItem>
              <MenuItem value="Netherlands">Netherlands (Holland, Europe)</MenuItem>
              <MenuItem value="Nevis">Nevis</MenuItem>
              <MenuItem value="New Caledonia">New Caledonia</MenuItem>
              <MenuItem value="New Zealand">New Zealand</MenuItem>
              <MenuItem value="Nicaragua">Nicaragua</MenuItem>
              <MenuItem value="Niger">Niger</MenuItem>
              <MenuItem value="Nigeria">Nigeria</MenuItem>
              <MenuItem value="Niue">Niue</MenuItem>
              <MenuItem value="Norfolk Island">Norfolk Island</MenuItem>
              <MenuItem value="Norway">Norway</MenuItem>
              <MenuItem value="Oman">Oman</MenuItem>
              <MenuItem value="Pakistan">Pakistan</MenuItem>
              <MenuItem value="Palau Island">Palau Island</MenuItem>
              <MenuItem value="Palestine">Palestine</MenuItem>
              <MenuItem value="Panama">Panama</MenuItem>
              <MenuItem value="Papua New Guinea">Papua New Guinea</MenuItem>
              <MenuItem value="Paraguay">Paraguay</MenuItem>
              <MenuItem value="Peru">Peru</MenuItem>
              <MenuItem value="Phillipines">Philippines</MenuItem>
              <MenuItem value="Pitcairn Island">Pitcairn Island</MenuItem>
              <MenuItem value="Poland">Poland</MenuItem>
              <MenuItem value="Portugal">Portugal</MenuItem>
              <MenuItem value="Puerto Rico">Puerto Rico</MenuItem>
              <MenuItem value="Qatar">Qatar</MenuItem>
              <MenuItem value="Republic of Montenegro">Republic of Montenegro</MenuItem>
              <MenuItem value="Republic of Serbia">Republic of Serbia</MenuItem>
              <MenuItem value="Reunion">Reunion</MenuItem>
              <MenuItem value="Romania">Romania</MenuItem>
              <MenuItem value="Russia">Russia</MenuItem>
              <MenuItem value="Rwanda">Rwanda</MenuItem>
              <MenuItem value="St Barthelemy">St Barthelemy</MenuItem>
              <MenuItem value="St Eustatius">St Eustatius</MenuItem>
              <MenuItem value="St Helena">St Helena</MenuItem>
              <MenuItem value="St Kitts-Nevis">St Kitts-Nevis</MenuItem>
              <MenuItem value="St Lucia">St Lucia</MenuItem>
              <MenuItem value="St Maarten">St Maarten</MenuItem>
              <MenuItem value="St Pierre & Miquelon">St Pierre & Miquelon</MenuItem>
              <MenuItem value="St Vincent & Grenadines">St Vincent & Grenadines</MenuItem>
              <MenuItem value="Saipan">Saipan</MenuItem>
              <MenuItem value="Samoa">Samoa</MenuItem>
              <MenuItem value="Samoa American">Samoa American</MenuItem>
              <MenuItem value="San Marino">San Marino</MenuItem>
              <MenuItem value="Sao Tome & Principe">Sao Tome & Principe</MenuItem>
              <MenuItem value="Saudi Arabia">Saudi Arabia</MenuItem>
              <MenuItem value="Senegal">Senegal</MenuItem>
              <MenuItem value="Seychelles">Seychelles</MenuItem>
              <MenuItem value="Sierra Leone">Sierra Leone</MenuItem>
              <MenuItem value="Singapore">Singapore</MenuItem>
              <MenuItem value="Slovakia">Slovakia</MenuItem>
              <MenuItem value="Slovenia">Slovenia</MenuItem>
              <MenuItem value="Solomon Islands">Solomon Islands</MenuItem>
              <MenuItem value="Somalia">Somalia</MenuItem>
              <MenuItem value="South Africa">South Africa</MenuItem>
              <MenuItem value="Spain">Spain</MenuItem>
              <MenuItem value="Sri Lanka">Sri Lanka</MenuItem>
              <MenuItem value="Sudan">Sudan</MenuItem>
              <MenuItem value="Suriname">Suriname</MenuItem>
              <MenuItem value="Swaziland">Swaziland</MenuItem>
              <MenuItem value="Sweden">Sweden</MenuItem>
              <MenuItem value="Switzerland">Switzerland</MenuItem>
              <MenuItem value="Syria">Syria</MenuItem>
              <MenuItem value="Tahiti">Tahiti</MenuItem>
              <MenuItem value="Taiwan">Taiwan</MenuItem>
              <MenuItem value="Tajikistan">Tajikistan</MenuItem>
              <MenuItem value="Tanzania">Tanzania</MenuItem>
              <MenuItem value="Thailand">Thailand</MenuItem>
              <MenuItem value="Togo">Togo</MenuItem>
              <MenuItem value="Tokelau">Tokelau</MenuItem>
              <MenuItem value="Tonga">Tonga</MenuItem>
              <MenuItem value="Trinidad & Tobago">Trinidad & Tobago</MenuItem>
              <MenuItem value="Tunisia">Tunisia</MenuItem>
              <MenuItem value="Turkey">Turkey</MenuItem>
              <MenuItem value="Turkmenistan">Turkmenistan</MenuItem>
              <MenuItem value="Turks & Caicos Is">Turks & Caicos Is</MenuItem>
              <MenuItem value="Tuvalu">Tuvalu</MenuItem>
              <MenuItem value="Uganda">Uganda</MenuItem>
              <MenuItem value="United Kingdom">United Kingdom</MenuItem>
              <MenuItem value="Ukraine">Ukraine</MenuItem>
              <MenuItem value="United Arab Erimates">United Arab Emirates</MenuItem>
              <MenuItem value="United States of America">United States of America</MenuItem>
              <MenuItem value="Uraguay">Uruguay</MenuItem>
              <MenuItem value="Uzbekistan">Uzbekistan</MenuItem>
              <MenuItem value="Vanuatu">Vanuatu</MenuItem>
              <MenuItem value="Vatican City State">Vatican City State</MenuItem>
              <MenuItem value="Venezuela">Venezuela</MenuItem>
              <MenuItem value="Vietnam">Vietnam</MenuItem>
              <MenuItem value="Virgin Islands (Brit)">Virgin Islands (Brit)</MenuItem>
              <MenuItem value="Virgin Islands (USA)">Virgin Islands (USA)</MenuItem>
              <MenuItem value="Wake Island">Wake Island</MenuItem>
              <MenuItem value="Wallis & Futana Is">Wallis & Futana Is</MenuItem>
              <MenuItem value="Yemen">Yemen</MenuItem>
              <MenuItem value="Zaire">Zaire</MenuItem>
              <MenuItem value="Zambia">Zambia</MenuItem>
              <MenuItem value="Zimbabwe">Zimbabwe</MenuItem>
            </Select>
            <FormHelperText>Enter Superstar Country of Origin</FormHelperText>
          </FormControl>
          <FormControl className={classes.input}>
            <InputLabel id="Category">Category</InputLabel>
            <Select
              labelId="Category"
              id="demo-simple-select-category"
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
            id="standard-helperText"
            label="Superstar profile image link"
            helperText="Paste Image URL Here"
            name="image"
            className={classes.input}
            onChange={handleChange}
            value={state.image}
          /> 
          <label className={classes.editorLabel}>Enter biography of the Superstar in the box below</label>
          <div className={classes.editor}>
            <WYSIWYGEditor 
              onEditorStateChange={onEditorStateChange}
              editorState={editorState}
            />
          </div>
          <Button variant="outlined">
            Save Profile
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

export default SuperstarsForm;
