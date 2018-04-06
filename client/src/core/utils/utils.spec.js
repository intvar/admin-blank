import { EditorState } from 'draft-js';
import {
  objToQSParams,
  convertHtmlToEditorState,
  convertEditorStateToHtml,
  beautifyNumber,
  parseQueryString,
  pick,
} from './index';

describe('utils', () => {
  describe('objToQSParams', () => {
    it('should return query string with two parameters', () => {
      const actualUrl = objToQSParams({ a: 1, b: 0, c: null });
      expect(actualUrl).toEqual('a=1&b=0');
    });

    it('should return empty query string', () => {
      const actualUrl = objToQSParams({ a: null });
      expect(actualUrl).toEqual('');
    });

    it('should return query string with data format ISO 8601', () => {
      const actualUrl = objToQSParams({ a: 'a', b: new Date(0) });
      expect(actualUrl).toEqual('a=a&b=1970-01-01T00:00:00.000Z');
    });

    it('should return array string', () => {
      const actualUrl = objToQSParams({ a: 'a', b: ['test', 'test1', 'test2'] });
      expect(actualUrl).toEqual('a=a&b=test,test1,test2');
    });
  });

  describe('convertHtmlToEditorState', () => {
    it('should return editor state for html', () => {
      const editorState = convertHtmlToEditorState('<p>test</p>');
      expect(editorState instanceof EditorState).toBeTruthy();
    });

    it('should return editor state for null', () => {
      const editorState = convertHtmlToEditorState(null);
      expect(editorState instanceof EditorState).toBeTruthy();
    });

    it('should return editor state for empty string', () => {
      const editorState = convertHtmlToEditorState('');
      expect(editorState instanceof EditorState).toBeTruthy();
    });
  });

  describe('convertEditorStateToHtml', () => {
    it('should return html from editor state', () => {
      const html = '<p><strong>test</strong></p>';
      const editorState = convertHtmlToEditorState(html);
      const actualHtml = convertEditorStateToHtml(editorState);
      expect(actualHtml).toBe(html);
    });
  });

  describe('beatifyNumber', () => {
    it('should return zero string if got falsy value', () => {
      const n = beautifyNumber(false);
      expect(n).toBe('0');
    });

    it('should return number without zeros', () => {
      const n = beautifyNumber('1234.000');
      expect(n).toBe('1234');
    });

    it('should return zero string when number with all zeros', () => {
      const n = beautifyNumber('000');
      expect(n).toBe('0');
    });
  });

  describe('parseQueryString', () => {
    const qsInObj = { a: 'test', SAMLRequest: '+asdfasdf=' };
    const qsInStr = 'a=test&SAMLRequest=+asdfasdf=';
    const qsInStrWithQuestionSymbol = `?${qsInStr}`;

    it('should parse qs corret', () => {
      expect(parseQueryString(qsInStr)).toEqual(qsInObj);
    });

    it('should parse qs with question symbol corret', () => {
      expect(parseQueryString(qsInStrWithQuestionSymbol)).toEqual(qsInObj);
    });

    it('should return empty object if argument falsy value', () => {
      expect(parseQueryString('')).toEqual({});
    });
  });

  describe('pick', () => {
    it('should pick correct object', () => {
      const src = { a: false, b: 1, c: '' };
      const picked = pick(['a', 'b'], src);
      expect(picked).toEqual({ a: false, b: 1 });

      const src2 = {};
      const picked2 = pick(['a', 'b'], src2);
      expect(picked2).toEqual({});
    });
  });
});
