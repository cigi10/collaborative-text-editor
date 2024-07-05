import { useState,useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Editor from "@monaco-editor/react"
import * as Y from "yjs"
import { Room, WebrtcProvider } from 'y-webrtc'
import { MonacoBinding } from 'y-monaco'

function App() {
  const editorRef = useRef(null);

  //HANDELING BY YJS:

  // (initalise yjs, and tell it to listen to monaco if and when it does changes)
//Editor Value -> YJS Text Value (and this value, is going to be shared by multiple ppl)
//So when one person deletes text, it deleted from the shared thing, that means for everyone

  function handleEditorDidMount(editor,monaco){
    editorRef.current = editor;
    //initialize yjs 
    const doc = new Y.Doc(); //technically a collection of shared objects 

    //connect to peers (or start connection) with webrtc
    const provider = new WebrtcProvider("test-room", doc); //stuff like room 1 room 2 etc
    const type = doc.getText("monaco"); // doc {"monaco": "what our ide is showing"}
   
    //bind yjs to monaco -- same thing as tell yjs to listen to monaco for changes
    const binding = new MonacoBinding(type, editorRef.current.getModel(), new Set([editorRef.current]), provider.awareness);
    console.log(provider.awareness);
   
    //for this u have to import lot of libraries -- from yjs - import last 3 lines
  }
  return (
   <Editor
   height="100vh"
   width="100vh"
   theme="vs-light"
   onMount={handleEditorDidMount}
   />
  )
}

export default App
