import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Editor from 'rich-markdown-editor';
import path from 'path';

import css from './style.css';

function MarkdownEditor({ file, write }) {
  const [value, setValue] = useState('');

  const handleChange = (value) => {
      const newFile = new File([value], file.name, {
        type: file.type,
        lastModified: Date.now()
      });
      console.log(newFile)
      write(newFile);
  }

  useEffect(() => {
    (async () => {
      const text = await file.text();
      setValue(text);
    })();
  }, [file]);

  return (
    <div className={css.editor}>
      <div className={css.title}>{path.basename(file.name)}</div>
      <Editor className={css.content} value={value} onChange={handleChange} />
    </div>
  );
}

MarkdownEditor.propTypes = {
  file: PropTypes.object,
  write: PropTypes.func
};

export default MarkdownEditor;
