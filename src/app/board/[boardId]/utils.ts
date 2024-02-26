import type { ExcalidrawElement } from "@excalidraw/excalidraw/types/element/types";

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
  return elements;
};

export const stringifyElements = (els: Elements) => {
  const elements: RowElements = {};
  for (const el in els) {
    elements[el] = JSON.stringify(els[el]);
  }
  return elements;
};