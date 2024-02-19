'use client';
import React, { useCallback, useEffect, useState } from 'react';

import { Excalidraw } from "@excalidraw/excalidraw";
import { AppState, ExcalidrawImperativeAPI, ExcalidrawProps } from '@excalidraw/excalidraw/types/types';
import { Button } from '@/components/ui/button';
import { ExcalidrawElement } from '@excalidraw/excalidraw/types/element/types';
import _ from 'lodash';
import dynamic from "next/dynamic";
// import { throttleRAF } from '@excalidraw/excalidraw/types/utils';


// const ExcalidrawWrapper = dynamic(
//   async () => (await import("../../excalidrawWrapper")).default,
//   {
//     ssr: false,
//   },
// );

export default function Board() {
  // const history = useHistory();
  const [excalidrawAPI, setExcalidrawAPI] = useState<ExcalidrawImperativeAPI>();
  const [lastElId, setLastElId] = useState('');
  ;
  // useEffect(() => {
  //   // const el = excalidrawAPI?.getSceneElements();
  //   excalidrawAPI?.onChange((elements) => );
  //   // console.log(el);
  // }, [excalidrawAPI, update]);
  // const log = (element) => console.log('throttle', element), 800);
  const onChange: ExcalidrawProps["onChange"] = useCallback(
    _.throttle((elements: readonly ExcalidrawElement[], appState: AppState) => {
      const last = elements.at(-1);
      if (lastElId !== last?.id) {
        setLastElId(last?.id!);
        console.log(elements);
      }
      console.log('other', elements);
    }, 2000),
    [lastElId],
  );

  return (
    <div className="h-screen">
      {/* <Button onClick={() => setUpdate(prev => prev + 1)} className='absolute top-0 right-32 z-20'>update</Button> */}
      <Excalidraw excalidrawAPI={(api) => {
        setExcalidrawAPI(api);
      }} onChange={onChange}
        isCollaborating={true} />
    </div>
  );
}
