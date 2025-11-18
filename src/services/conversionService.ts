import { encode } from '@toon-format/toon'
import type { ConversionType, ConversionResult } from '../types/converter'

// Simple token counting function (approximation)
const countTokens = (text: string): number => {
  return Math.ceil(text.length / 4) // Rough GPT token estimation
}

// CSV parser utility
const parseCSV = (csvText: string): any[] => {
  const lines = csvText.trim().split('\n')
  if (lines.length < 2) return []
  
  const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''))
  const data = []
  
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',').map(v => v.trim().replace(/"/g, ''))
    const row: any = {}
    
    headers.forEach((header, index) => {
      const value = values[index]
      // Try to parse as number or boolean
      if (value === 'true') row[header] = true
      else if (value === 'false') row[header] = false
      else if (!isNaN(Number(value)) && value !== '') row[header] = Number(value)
      else row[header] = value
    })
    
    data.push(row)
  }
  
  return data
}

// Basic XML to JSON parser (simplified)
const parseXML = (xmlText: string): any => {
  try {
    // This is a very basic XML parser - in a real app you'd use DOMParser or a library
    // For now, we'll just return a simplified structure
    return {
      _note: "XML parsing is simplified for demo purposes",
      _originalXML: xmlText.substring(0, 200) + "..."
    }
  } catch (error) {
    throw new Error('Invalid XML format')
  }
}

// Basic YAML parser (simplified)
const parseYAML = (yamlText: string): any => {
  try {
    // This is a very basic YAML parser - in a real app you'd use js-yaml
    // For demo purposes, we'll create a simple structure
    return {
      _note: "YAML parsing is simplified for demo purposes",
      _originalYAML: yamlText.substring(0, 200) + "..."
    }
  } catch (error) {
    throw new Error('Invalid YAML format')
  }
}

export class ConversionService {
  static async convert(type: ConversionType, input: string): Promise<ConversionResult> {
    try {
      let parsedData: any
      
      switch (type) {
        case 'json-to-toon':
          parsedData = JSON.parse(input)
          break
          
        case 'csv-to-toon':
          parsedData = parseCSV(input)
          break
          
        case 'xml-to-toon':
          parsedData = parseXML(input)
          break
          
        case 'yaml-to-toon':
          parsedData = parseYAML(input)
          break
          
        default:
          throw new Error(`Unsupported conversion type: ${type}`)
      }
      
      // Convert to TOON format
      const toonOutput = encode(parsedData)
      const inputTokens = countTokens(input)
      const outputTokens = countTokens(toonOutput)
      
      return {
        success: true,
        output: toonOutput,
        inputTokens,
        outputTokens
      }
    } catch (error) {
      return {
        success: false,
        output: '',
        inputTokens: 0,
        outputTokens: 0,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      }
    }
  }
  
  static getTokenSavings(inputTokens: number, outputTokens: number): number {
    if (inputTokens === 0) return 0
    return Math.round(((inputTokens - outputTokens) / inputTokens) * 100)
  }
}
