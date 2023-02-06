import { useEffect, useRef, useState } from 'react'

import { basicSetup, EditorView } from 'codemirror'
import { EditorState } from '@codemirror/state'
import { drawSelection, highlightActiveLine } from '@codemirror/view'
import { html } from '@codemirror/lang-html'

import styles from '@/styles/button.module.css'

type Props = {
  componentCode: string
  handleEditCode: CallableFunction
}

function PreviewEdit({ componentCode, handleEditCode }: Props) {
  const codeEditor = useRef(null)

  const [editedCode, setEditedCode] = useState<string>('')

  useEffect(() => {
    const codeEditorElement = codeEditor.current

    if (!codeEditorElement) {
      return
    }

    const editorState = EditorState.create({
      doc: componentCode,
      extensions: [
        basicSetup,
        drawSelection(),
        highlightActiveLine(),
        html(),
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => setEditedCode(componentCode), [componentCode])

  return (
    <div className="relative">
      <button
        onClick={() => handleEditCode(editedCode)}
        className={`${styles.pill} absolute bottom-4 right-4 z-50 bg-black text-white`}
      >
        <span aria-hidden="true" role="img" className="text-sm">
          💾
        </span>

        <span className="text-xs font-medium">Save</span>
      </button>

      <div className="h-[400px] overflow-auto rounded-lg bg-gray-900 ring-2 ring-gray-900 lg:h-[600px]">
        <div ref={codeEditor}></div>
      </div>
    </div>
  )
}

export default PreviewEdit
