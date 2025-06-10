'use client'
import { useEffect, useRef, useState } from 'react'

const N8N_SCRIPTS = [
  '/static/scripts/webcomponents-loader.js',
  '/static/scripts/polyfill-support.js',
  '/static/scripts/n8n-demo.bundled.js',
]

// TODO: replace images of n8n with real workflow
// TODO: check if I can and I want to change the size of the iframe
// TODO: blog rag: remove unneeded nodes

function loadScript(src: string, type?: string) {
  return new Promise<void>((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve()
      return
    }
    const script = document.createElement('script')
    script.src = src
    if (type) script.type = type
    script.onload = () => resolve()
    script.onerror = () => reject()
    document.head.appendChild(script)
  })
}

type N8nDemoProps = {
  workflow?: string
  file?: string // path to a JSON file (relative to /public or absolute URL)
}

export default function N8nDemo({ workflow, file }: N8nDemoProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [workflowData, setWorkflowData] = useState<string | null>(workflow ?? null)

  useEffect(() => {
    if (file) {
      console.log('[N8nDemo] Fetching file:', file)
      fetch(file)
        .then((res) => res.json())
        .then((data) => {
          console.log('[N8nDemo] File fetched, setting workflowData:', data)
          setWorkflowData(JSON.stringify(data))
        })
        .catch((err) => {
          console.error('[N8nDemo] Error fetching file:', err)
          setWorkflowData(null)
        })
    }
  }, [file])

  useEffect(() => {
    console.log('[N8nDemo] workflowData changed:', workflowData)
    if (!workflowData) return
    Promise.all(
      N8N_SCRIPTS.map((src) => loadScript(src, src.endsWith('bundled.js') ? 'module' : undefined))
    )
      .then(() => {
        if (ref.current) {
          ref.current.innerHTML = ''
          const el = document.createElement('n8n-demo')
          el.setAttribute('style', 'display:block;')
          el.setAttribute('workflow', workflowData)
          ref.current.appendChild(el)
          console.log('[N8nDemo] n8n-demo element created and appended', el)
        }
      })
      .catch((err) => {
        console.error('[N8nDemo] Error loading scripts:', err)
      })
  }, [workflowData])

  return <div ref={ref}></div>
}
