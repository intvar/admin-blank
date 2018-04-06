import React from 'react';
import HTMLEditor from './components/html_editor';

export const renderHtmlEditor = ({
  input
}) => (
  <HTMLEditor onChange={input.onChange} value={input.value} />
);
