'use client';
import React, { useCallback, useEffect, useState } from 'react';

import { Excalidraw, LiveCollaborationTrigger } from "@excalidraw/excalidraw";
import { AppState, ExcalidrawImperativeAPI, ExcalidrawProps } from '@excalidraw/excalidraw/types/types';
import { ExcalidrawElement, Theme } from '@excalidraw/excalidraw/types/element/types';
import _ from 'lodash';
import useLocalStorageState from 'use-local-storage-state';
import { useDataStore } from '@/lib/useDataStore';
import useStore from '@/lib/useStore';
import { setBoardElement } from './actions';
import { Elements, RowElements, parseElements, stringifyElements } from './utils';
import { revalidatePath } from 'next/cache';


export default function Board(
  { elements: defaultElements, boardId }
    : {
      elements: RowElements;
      boardId: string;
    }
) {
  const [excalidrawAPI, setExcalidrawAPI] = useState<ExcalidrawImperativeAPI>();
  const [theme, setTheme] = useLocalStorageState('theme');
  const [locStorageElements, setLocStorageElements] = useLocalStorageState<Elements>(
    `elements:${boardId}`, { defaultValue: parseElements(defaultElements) }
  );

  const onChange: ExcalidrawProps["onChange"] = useCallback(
    async (els: readonly ExcalidrawElement[], appState: AppState) => {
      const elementsToUpdate: Elements = {};
      for (const el of els) {
        let localEl = locStorageElements[el.id];

        console.log('idx', localEl?.id);
        console.log('updated:el', el.updated);
        if (!localEl || el.updated !== localEl.updated) {
          elementsToUpdate[el.id] = el;
        }
      }
      if (!_.isEmpty(elementsToUpdate)) {
        const index = await setBoardElement(boardId, stringifyElements(elementsToUpdate));
        setLocStorageElements((prev) => ({ ...prev, ...elementsToUpdate }));
      }
      if (appState.theme !== theme) {
        setTheme(appState.theme);
      }

    },
    [],
  );

  return (
    <div className="h-screen">
      <Excalidraw
        initialData={{
          elements: Object.values(locStorageElements),
          appState: { theme: theme as Theme }
        }}

        excalidrawAPI={(api) => {
          setExcalidrawAPI(api);
        }}
        onChange={onChange}
        isCollaborating={true}
        renderTopRightUI={() => (
          <LiveCollaborationTrigger
            isCollaborating={true}
            onSelect={() => { console.log('log here'); excalidrawAPI; }}
          />)}
      >
      </Excalidraw>
    </div>
  );
}
