import { 
  FileJson, 
//   FileSpreadsheet, 
//   Code2, 
//   FileText 
} from 'lucide-react'
import type { ConversionConfig, ConversionType } from '../types/converter'

const jsonExampleData = {
  users: [
    { id: 1, name: "Alice Johnson", email: "alice@example.com", role: "admin", active: true },
    { id: 2, name: "Bob Smith", email: "bob@example.com", role: "user", active: false },
    { id: 3, name: "Carol Davis", email: "carol@example.com", role: "moderator", active: true }
  ],
  metadata: {
    total: 3,
    page: 1,
    generated: "2025-11-18T00:30:00Z"
  }
}

// const csvExampleData = `id,name,email,role,active
// 1,Alice Johnson,alice@example.com,admin,true
// 2,Bob Smith,bob@example.com,user,false
// 3,Carol Davis,carol@example.com,moderator,true`

// const xmlExampleData = `<?xml version="1.0" encoding="UTF-8"?>
// <users>
//   <user id="1">
//     <name>Alice Johnson</name>
//     <email>alice@example.com</email>
//     <role>admin</role>
//     <active>true</active>
//   </user>
//   <user id="2">
//     <name>Bob Smith</name>
//     <email>bob@example.com</email>
//     <role>user</role>
//     <active>false</active>
//   </user>
// </users>`

// const yamlExampleData = `users:
//   - id: 1
//     name: Alice Johnson
//     email: alice@example.com
//     role: admin
//     active: true
//   - id: 2
//     name: Bob Smith
//     email: bob@example.com
//     role: user
//     active: false
//   - id: 3
//     name: Carol Davis
//     email: carol@example.com
//     role: moderator
//     active: true
// metadata:
//   total: 3
//   page: 1
//   generated: "2025-11-18T00:30:00Z"`

export const conversionConfigs: Record<ConversionType, ConversionConfig> = {
  'json-to-toon': {
    id: 'json-to-toon',
    name: 'JSON to TOON',
    description: 'Convert JSON objects to token-efficient TOON format',
    icon: FileJson,
    inputLabel: 'JSON Input',
    outputLabel: 'TOON Output',
    inputPlaceholder: 'Paste your JSON here...',
    outputPlaceholder: 'TOON format will appear here...',
    fileExtension: 'toon',
    mimeType: 'text/plain',
    exampleData: JSON.stringify(jsonExampleData, null, 2),
    tips: [
      'TOON format reduces token count by eliminating redundant structure markers',
      'Best results with nested objects and arrays containing similar structures',
      'The more repetitive your JSON structure, the greater the token savings',
      'Try pasting your own API responses to see real-world savings'
    ]
  },
//   'csv-to-toon': {
//     id: 'csv-to-toon',
//     name: 'CSV to TOON',
//     description: 'Transform CSV data into structured TOON format',
//     icon: FileSpreadsheet,
//     inputLabel: 'CSV Input',
//     outputLabel: 'TOON Output',
//     inputPlaceholder: 'Paste your CSV data here...',
//     outputPlaceholder: 'TOON format will appear here...',
//     fileExtension: 'toon',
//     mimeType: 'text/plain',
//     exampleData: csvExampleData,
//     tips: [
//       'CSV headers are automatically detected and preserved',
//       'Large CSV files benefit most from TOON compression',
//       'Numeric data is optimally encoded for token efficiency',
//       'Best for tabular data with repeated column structures'
//     ]
//   },
//   'xml-to-toon': {
//     id: 'xml-to-toon',
//     name: 'XML to TOON',
//     description: 'Convert XML documents to compact TOON notation',
//     icon: Code2,
//     inputLabel: 'XML Input',
//     outputLabel: 'TOON Output',
//     inputPlaceholder: 'Paste your XML document here...',
//     outputPlaceholder: 'TOON format will appear here...',
//     fileExtension: 'toon',
//     mimeType: 'text/plain',
//     exampleData: xmlExampleData,
//     tips: [
//       'XML attributes and nested elements are preserved',
//       'Significant token savings for documents with repeated structures',
//       'Namespaces and CDATA sections are handled appropriately',
//       'Great for configuration files and structured documents'
//     ]
//   },
//   'yaml-to-toon': {
//     id: 'yaml-to-toon',
//     name: 'YAML to TOON',
//     description: 'Transform YAML configuration into TOON format',
//     icon: FileText,
//     inputLabel: 'YAML Input',
//     outputLabel: 'TOON Output',
//     inputPlaceholder: 'Paste your YAML configuration here...',
//     outputPlaceholder: 'TOON format will appear here...',
//     fileExtension: 'toon',
//     mimeType: 'text/plain',
//     exampleData: yamlExampleData,
//     tips: [
//       'YAML indentation and structure is preserved in conversion',
//       'Excellent for configuration files and deployment manifests',
//       'Comments are preserved where possible',
//       'Ideal for DevOps and infrastructure-as-code files'
//     ]
//  }
}
