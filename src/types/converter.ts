import type { LucideIcon } from 'lucide-react'

export type ConversionType = 'json-to-toon' | 'csv-to-toon' | 'xml-to-toon' | 'yaml-to-toon'

export interface ConversionConfig {
  id: ConversionType
  name: string
  description: string
  icon: LucideIcon
  inputLabel: string
  outputLabel: string
  inputPlaceholder: string
  outputPlaceholder: string
  fileExtension: string
  mimeType: string
  tips: string[]
  exampleData: string
}

export interface ConversionResult {
  success: boolean
  output: string
  inputTokens: number
  outputTokens: number
  error?: string
}

export interface ConverterState {
  activeType: ConversionType
  input: string
  output: string
  inputTokens: number
  outputTokens: number
  isConverting: boolean
  copied: boolean
  error?: string
}
