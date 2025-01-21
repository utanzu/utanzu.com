/* eslint-disable prettier/prettier */
import type { Document, MDX } from 'contentlayer2/core'

export type Career = {
    heading: string
    title: string
    date: string
    icon?: string
    image?: string
    summary: string
    tags?: { title: string; url: string }[]
}

export type Project = {
    type: 'work' | 'self'
    title: string
    description?: string
    imgSrc: string
    url?: string
    builtWith: string[]
    links?: { title: string; url: string }[]
}

export type MDXDocument = Document & { body: MDX }
export type MDXDocumentDate = MDXDocument & {
    date: string
}

export type CoreContent<T> = Omit<T, 'body' | '_raw' | '_id'>
