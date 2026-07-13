import {atom} from "nanostores";

export const selectedTag = atom<string>( '')
export const isClient = atom<boolean>(false)