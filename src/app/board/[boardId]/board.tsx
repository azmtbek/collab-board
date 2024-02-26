'use client';
import React, { useCallback, useEffect, useState } from 'react';

import { Excalidraw, LiveCollaborationTrigger } from "@excalidraw/excalidraw";
import { AppState, ExcalidrawImperativeAPI, ExcalidrawProps } from '@excalidraw/excalidraw/types/types';
import { ExcalidrawElement, Theme } from '@excalidraw/excalidraw/types/element/types';
import _ from 'lodash';
import useLocalStorageState from 'use-local-storage-state';
import { useDataStore } from '@/lib/useDataStore';
import useStore from '@/lib/useStore';
import { getBoardElements, setBoardElement } from './actions';
import { Elements, RowElements, parseElements, stringifyElements } from './utils';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';


export default function Board(
  { boardId }
    : {
      boardId: string;
    }
) {
  const [excalidrawAPI, setExcalidrawAPI] = useState<ExcalidrawImperativeAPI>();
  const [theme, setTheme] = useLocalStorageState('theme');
  const [locEls, setLocEls] = useLocalStorageState<Elements>(
    `elements:${boardId}`, { defaultValue: {} }
  );

  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['elements'], queryFn: async () => {
      const els = await getBoardElements(boardId);
      setLocEls(parseElements(els));
      return parseElements(els);
    }
  });

  const mutation = useMutation({
    mutationFn: async (elementsToUpdate: Elements) => {
      await setBoardElement(boardId, stringifyElements(elementsToUpdate));
      setLocEls(((prev) => ({ ...prev, ...elementsToUpdate })));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['elements'] });
    },
  });

  excalidrawAPI?.onChange(_.throttle(async (els: readonly ExcalidrawElement[], appState: AppState) => {
    const elementsToUpdate: Elements = {};
    for (const el of els) {
      let localEl = query.data?.[el.id];

      console.log('idx', localEl?.id);
      console.log('updated:el', el.updated);
      if (!localEl || el.updated !== localEl.updated) {
        elementsToUpdate[el.id] = el;
      }
    }
    if (!_.isEmpty(elementsToUpdate)) {
      mutation.mutate(elementsToUpdate);
      // setLocStorageElements((prev) => ({ ...prev, ...elementsToUpdate }));
    }
    if (appState.theme !== theme) {
      setTheme(appState.theme);
    }

  }, 400));


  return (
    <div className="h-screen">
      <Excalidraw
        initialData={{
          elements: Object.values(query.data || {}),
          appState: { theme: theme as Theme }
        }}

        excalidrawAPI={(api) => {
          setExcalidrawAPI(api);
        }}
        isCollaborating={true}
        renderTopRightUI={() => (
          <LiveCollaborationTrigger
            isCollaborating={true}
            onSelect={() => { }}
          />)}
      >
      </Excalidraw>
    </div>
  );
}
