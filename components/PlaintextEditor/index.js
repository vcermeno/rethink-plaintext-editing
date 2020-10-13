// Import React dependencies.
import React, { useMemo, useState, useEffect } from 'react';
// Import the Slate editor factory.
import { createEditor } from 'slate';
import path from 'path';

// Import the Slate components and React plugin.
import { Slate, withReact, Editable } from 'slate-react';

import PropTypes from 'prop-types';

import css from './style.css';

function PlaintextEditor({ file, write }) {
  const editor = useMemo(() => withReact(createEditor()), []);
  const [value, setValue] = useState([
    {
      type: 'paragraph',
      children: [{ text: 'A line of text in a paragraph.' }]
    }
  ]);

  useEffect(() => {
    (async () => {
      const text = await file.text();
      setValue([
        {
          type: 'paragraph',
          children: [{ text }]
        }
      ]);
    })();
    console.log('he;llo');
  }, [file]);

  useEffect(() => {
    if (value && value[0].children){
      const newText = value[0].children[0].text;
      const newFile = new File([newText], file.name, {
        type: file.type,
        lastModified: Date.now()
      });
      write(newFile);
    }
  }, [value]);

  return (
    <div className={css.editor}>
      <div className={css.title}>{path.basename(file.name)}</div>
      <Slate
        editor={editor}
        value={value}
        onChange={newValue => setValue(newValue)}
      >
        <Editable className={css.content} />
      </Slate>
    </div>
  );
}

PlaintextEditor.propTypes = {
  file: PropTypes.object,
  write: PropTypes.func
};

export default PlaintextEditor;
