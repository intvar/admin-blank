import React, { Component } from 'react';
import { convertToRaw, EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import PropTypes from 'prop-types';
import { convertHtmlToEditorState } from '../../utils';

class HTMLEditor extends Component {
  constructor(props) {
    super(props);
    let editorState;
    if (props.value) {
      editorState = convertHtmlToEditorState(props.value);
    } else {
      editorState = EditorState.createEmpty();
    }
    this.state = {
      editorState,
    };
    this.onEditorStateChange = this.onEditorStateChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      editorState: convertHtmlToEditorState(nextProps.value),
    });
  }

  onEditorStateChange(editorState) {
    this.setState({
      editorState,
    });
    this.props.onChange(draftToHtml(convertToRaw(editorState.getCurrentContent())));
  }

  render() {
    const { editorState } = this.state;
    return (
      <div>
        <Editor
          editorState={editorState}
          wrapperClassName="agreements__editor-wrapper"
          editorClassName="agreements__editor"
          onEditorStateChange={this.onEditorStateChange}
        />
      </div>
    );
  }
}

HTMLEditor.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

HTMLEditor.defaultProps = {
  value: '',
};

export default HTMLEditor;
