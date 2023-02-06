import { useCallback, useEffect, useRef, useState } from 'react'

// import { basicSetup, EditorView } from 'codemirror'
// import { EditorState } from '@codemirror/state'
// import { drawSelection, highlightActiveLine } from '@codemirror/view'
import CodeMirror from '@uiw/react-codemirror'
import { html } from '@codemirror/lang-html'

import styles from '@/styles/button.module.css'

type Props = {
  componentCode: string
  handleEditCode: CallableFunction
}

function PreviewEdit({ componentCode, handleEditCode }: Props) {
  const codeEditor = useRef(null)

  const [editedCode, setEditedCode] = useState<string>('')

  const onChange = useCallback((newValue, viewUpdate) => {
    console.log(newValue)
    setEditedCode(newValue)
  }, [])

  // useEffect(() => {
  //   if (!codeEditor.current) {
  //     return
  //   }

  //   const codeEditorElement = codeEditor.current as HTMLDivElement

  //   const editorState = EditorState.create({
  //     doc: staticCode,
  //     extensions: [
  //       basicSetup,
  //       drawSelection(),
  //       highlightActiveLine(),
  //       html(),
  //       EditorView.updateListener.of(function (e) {
  //         setEditedCode(e.state.doc.toString())
  //       }),
  //     ],
  //   })

  //   const editorView = new EditorView({
  //     state: editorState,
  //     parent: codeEditorElement,
  //   })

  //   disableGrammarly()

  //   return () => {
  //     editorView.destroy()
  //   }

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [staticCode])

  useEffect(() => {
    setEditedCode(componentCode)
  }, [componentCode])

  // async function disableGrammarly() {
  //   if (codeEditor.current) {
  //     const codeEditorEl = codeEditor.current as HTMLDivElement
  //     const codeEditorInteractive =
  //       codeEditorEl.getElementsByClassName('cm-content')[0]
  //     // @ts-ignore
  //     codeEditorInteractive.setAttribute('data-enable-grammarly', false)
  //   }
  // }

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

      <div className="h-[400px] overflow-auto rounded-lg ring-2 ring-black lg:h-[600px]">
        <div ref={codeEditor}></div>
        <CodeMirror
          value={componentCode}
          height="200px"
          extensions={[html()]}
          onChange={onChange}
        />
      </div>
    </div>
  )
}

export default PreviewEdit
