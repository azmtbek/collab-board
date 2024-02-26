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
// import { Elements, RowElements, parseElements, stringifyElements } from './utils';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getSceneVersion } from "@excalidraw/excalidraw";

// import type { ExcalidrawElement } from "@excalidraw/excalidraw/types/element/types";

export interface RowElements {
  [id: string]: string;
}

export interface Elements {
  [id: string]: ExcalidrawElement;
}
export const parseElements = (els: RowElements) => {
  const elements: Elements = {};
  for (const el in els) {
    elements[el] = JSON.parse(els[el]);
  }
  console.log('elements parsr', elements);
  return elements;
};

export const stringifyElements = (els: Elements) => {
  const elements: RowElements = {};
  for (const el in els) {
    elements[el] = JSON.stringify(els[el]);
  }
  return elements;
};


export default function Board(
  { boardId }
    : {
      boardId: string;
    }
) {
  const [excalidrawAPI, setExcalidrawAPI] = useState<ExcalidrawImperativeAPI>();
  const [theme, setTheme] = useLocalStorageState('theme');
  // const [locEls, setLocEls] = useLocalStorageState<Elements>(
  //   `elements:${boardId}`, { defaultValue: {} }
  // );

  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['elements'],
    queryFn: async () => {
      const els = await getBoardElements(boardId);
      console.log('theels2', els);
      // setLocEls(parseElements(els));

      // console.log('elements parsr', elements);
      return els;
      // console.log('parse', await parseElements( els));
      // return elements;
    }
  });

  const mutation = useMutation({
    mutationFn: async (elementsToUpdate: Elements) => {
      await setBoardElement(boardId, elementsToUpdate);
    },
    onMutate: async (elementsToUpdate: Elements) => {
      await queryClient.cancelQueries({ queryKey: ['todos'] });
      queryClient.setQueryData(['elements'], (old: Elements) => ({ ...old, elementsToUpdate }));
      return elementsToUpdate;
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['elements'] });
    },
  });
  const [version, setVersion] = useState();
  useEffect(() => {
    excalidrawAPI?.onChange(_.throttle(async (els: readonly ExcalidrawElement[], appState: AppState) => {
      const ver = getSceneVersion(els);
      console.log(ver);

      if (version === ver) return;
      setVersion(version);

      const elementsToUpdate: Elements = {};
      els.forEach((el) => {
        let localEl = query.data?.[el.id];

        console.log('idx', localEl?.id);
        console.log('updated:el', el.updated);
        if (!localEl || el.updated !== localEl.updated) {
          elementsToUpdate[el.id] = el;
        }
      });
      if (!_.isEmpty(elementsToUpdate)) {
        mutation.mutate(elementsToUpdate);
        // setLocStorageElements((prev) => ({ ...prev, ...elementsToUpdate }));
      }
      if (appState.theme !== theme) {
        setTheme(appState.theme);
      }

    }, 1000));

  }, [excalidrawAPI]);

  if (query.isLoading) return;

  console.log('the data', query.data);

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
