import { useEffect, useRef, useState } from 'react'

import { basicSetup, EditorView } from 'codemirror'
import { EditorState } from '@codemirror/state'
import { drawSelection, highlightActiveLine } from '@codemirror/view'
import { html } from '@codemirror/lang-html'
import { oneDarkTheme } from '@codemirror/theme-one-dark'

import styles from '@/styles/button.module.css'

type Props = {
  componentCode: string
  handleEditCode: CallableFunction
}

function PreviewEdit({ componentCode, handleEditCode }: Props) {
  const codeEditor = useRef()

  const [editedCode, setEditedCode] = useState<string>('')

  // const editorTheme = EditorView.theme(
  //   {
  //     '&': {
  //       color: 'white',
  //       backgroundColor: '#034',
  //     },
  //     '.cm-content': {
  //       caretColor: '#0e9',
  //     },
  //     '&.cm-focused .cm-cursor': {
  //       borderLeftColor: '#0e9',
  //     },
  //     '&.cm-focused .cm-selectionBackground, ::selection': {
  //       backgroundColor: '#074',
  //     },
  //     '.cm-gutters': {
  //       backgroundColor: '#045',
  //       color: '#ddd',
  //       border: 'none',
  //     },
  //   },
  //   { dark: true }
  // )

  useEffect(() => {
    const codeEditorElement = codeEditor.current

    const editorState = EditorState.create({
      doc: componentCode,
      extensions: [
        basicSetup,
        drawSelection(),
        highlightActiveLine(),
        html(),
        // EditorView.lineWrapping,
        // oneDarkTheme,
        // editorTheme,
        EditorView.updateListener.of(function (e) {
          setEditedCode(e.state.doc.toString())
        }),
      ],
    })

    const editorView = new EditorView({
      state: editorState,
      parent: codeEditorElement,
    })

    async function disableGrammarly() {
      const codeEditorInteractive =
        // @ts-ignore
        await codeEditorElement.getElementsByClassName('cm-content')[0]
      codeEditorInteractive.setAttribute('data-enable-grammarly', false)
    }

    disableGrammarly()

    return () => {
      editorView.destroy()
    }
  }, [])

  useEffect(() => setEditedCode(componentCode), [componentCode])

  return (
    <div className="relative">
      <button
        onClick={() => handleEditCode(editedCode)}
        className={`${styles.pill} absolute top-4 right-4 z-50 bg-white`}
      >
        <span aria-hidden="true" role="img" className="text-sm">
          💾
        </span>

        <span className="text-xs font-medium">Save</span>
      </button>

      <div className="h-[400px] w-full overflow-auto rounded-lg border-none ring-2 ring-black focus:ring-2 lg:h-[600px]">
        <div ref={codeEditor}></div>

        {/* <textarea
          onInput={(e) => setEditedCode(e.currentTarget.value)}
          defaultValue={editedCode}
          className="h-[400px] w-full overflow-auto rounded-lg border-none ring-2 ring-black focus:ring-2 lg:h-[600px]"
        ></textarea> */}
      </div>
    </div>
  )
}

export default PreviewEdit
