import type { FileSystemEntry } from './../models/file-system';

const fileTypeMap: Object = {
  bat: 'nf nf-custom-msdos',
  c: 'nf nf-custom-c',
  ['code-workspace']: 'nf nf-mdi-code_braces',
  cpp: 'nf nf-custom-cpp',
  cs: 'nf nf-mdi-language_csharp',
  csproj: 'nf nf-dev-visualstudio',
  css: 'nf nf-dev-css3',
  doc: 'nf nf-fa-file_word_o',
  excel: 'nf nf-fa-file_excel_o',
  fs: 'nf nf-dev-fsharp',
  gitignore: 'nf nf-dev-git',
  html: 'nf nf-dev-html5',
  js: 'nf nf-dev-javascript',
  json: 'nf nf-mdi-code_braces',
  jpeg: 'nf nf-mdi-file_image',
  jpg: 'nf nf-mdi-file_image',
  less: 'nf nf-dev-less',
  md: 'nf nf-mdi-markdown',
  pdf: 'nf nf-mdi-file_pdf',
  png: 'nf nf-mdi-file_image',
  py: 'nf nf-dev-python',
  sass: 'nf nf-dev-sass',
  scss: 'nf nf-dev-sass',
  sln: 'nf nf-dev-visualstudio',
  sql: 'nf nf-mdi-script',
  ts: 'nf nf-seti-typescript',
  txt: 'nf nf-fa-file_text',
  vim: 'nf nf-dev-vim',
  xml: 'nf nf-mdi-file_xml'
}

export function getFileIconClass(entry: FileSystemEntry) {
  return entry.is_directory
    ? 'fa fa-folder'
    : fileTypeMap[entry.extension.replace('.', '')] || 'nf nf-fa-file';
}

export default {
  getFileIconClass
}
