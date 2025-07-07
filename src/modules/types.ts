export type PrimitiveType = string | number | boolean;

export type ObjectType = Record<string, (PrimitiveType | ((e: Event) => void))>;

export type PropType = Record<string, PrimitiveType | ObjectType | (() => void) | ((x: string) => void) | ObjectType[]>;

export function isObject( propValue: PrimitiveType | ObjectType | (() => void) | ((x: string) => void) | ObjectType[]):
 propValue is ObjectType {
  return typeof propValue === 'object';
}

export type EventCallback = (...args: PropType[]) => void;
