'use client';
import React, { useCallback, useEffect, useState } from 'react';

import { Excalidraw, LiveCollaborationTrigger } from "@excalidraw/excalidraw";
import { AppState, ExcalidrawImperativeAPI, ExcalidrawProps } from '@excalidraw/excalidraw/types/types';
import { ExcalidrawElement, Theme } from '@excalidraw/excalidraw/types/element/types';
import _ from 'lodash';
import useLocalStorageState from 'use-local-storage-state';




export default function Board() {
  const [excalidrawAPI, setExcalidrawAPI] = useState<ExcalidrawImperativeAPI>();
  // const [lastElId, setLastElId] = useState('');
  const [theme, setTheme] = useLocalStorageState('theme');
  const [elements, setElements] = useLocalStorageState<readonly ExcalidrawElement[]>(
    'elements', { defaultValue: [] }
  )
    ;

  const onChange: ExcalidrawProps["onChange"] = useCallback(
    _.throttle((els: readonly ExcalidrawElement[], appState: AppState) => {
      // const last = els.at(-1);
      // const isNewAdded = false;
      for (const el of els) {
        if (el.updated !== elements.find(e => e.id == el.id)?.updated) setElements(els);
      }
      // if (lastElId !== last?.id) {
      //   setLastElId(last?.id!);
      //   setElements(prev => els);
      //   console.log(elements);
      // }
      if (appState.theme !== theme) {
        setTheme(appState.theme);
      }
      console.log('other', els);
    }, 2000),
    [],
  );

  return (
    <div className="h-screen">
      <Excalidraw
        initialData={{
          elements,
          appState: { theme: theme as Theme }
        }}

        excalidrawAPI={(api) => {
          setExcalidrawAPI(api);
        }}
        onChange={onChange}
        isCollaborating={true}
        renderTopRightUI={() => (
          <LiveCollaborationTrigger isCollaborating={true} onSelect={() => { console.log('log here'); excalidrawAPI; }} />)}
      >
      </Excalidraw>

    </div>
  );
}
