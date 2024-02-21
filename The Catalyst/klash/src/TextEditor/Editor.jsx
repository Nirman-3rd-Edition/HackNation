import {useState} from 'react';
import AceEditor from 'react-ace';
import Select from 'react-select';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-monokai';
import './style.css'


const Editor = () => {

    const [selectedLanguage, setSelectedLanguage] = useState('javascript'); // Set your default language here

  const languageOptions = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'php', label: 'PHP' },
    { value: 'c_cpp', label: 'C++' },
    { value: 'markdown', label: 'MarkDown' },
    { value: 'typescript', label: 'TypeScript' },
    // Add more language options as needed
  ];

  const handleLanguageChange = (selectedOption) => {
    setSelectedLanguage(selectedOption.value);
  };
    const handleChange = (value) => {
      console.log(value);
      // Handle the editor content change
    };
  
    return (
    <div className='ContainerEditor'>
        <Select
        className='dropdown'
        options={languageOptions}
        value={languageOptions.find((option) => option.value === selectedLanguage)}
        onChange={handleLanguageChange}
        />
      <AceEditor
        style={{width:'80%',height:'25rem' }}
        className='AceEdit'
        mode="javascript"
        theme="monokai"
        onChange={handleChange}
        name="your-editor"
        editorProps={{ $blockScrolling: true }}
      />
    </div>
    );
  };
  
  export default Editor;
  