import { useState } from "react"
import { Button } from "./components/Button"
import { ReadingArea } from "./components/ReadingArea"
import { ControlPanel } from "./components/ControlPanel"
import { SourceInput } from "./components/SourceInput"
import type { ParsedResponse } from "../../server/src/ichiran.types"
import type { Settings } from "./components/types"


type View = "input" | "reading" | "loading"; //screen states

export default function App() {

  const [result,setResult] = useState<ParsedResponse | null>(null);
  const [view,setView] = useState<View>("input");
  const [error,setError] = useState<string | null>(null);
  const [playing,setPlaying] = useState(false);
  const [settings,setSettings] = useState<Settings>({
    mode: "paragraph",
    showFurigana: false,
    fontSize: 24,
    tokenChunkSize: 1,
    speed: 500,
  })

  function updateSettings(changes:Partial<Settings>) {
    setSettings({ ...settings, ...changes})
  }
  
  
  async function handleSubmit(text: string) {
    setView("loading");
    setError(null);

    try {
      const res = await fetch("http://localhost:3000/api/parse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sentence: text }),
      });
      if (!res.ok) throw new Error(`Server error: ${res.status}`);
      setResult(await res.json());
      setView("reading");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
      setView("input");   // go back so user can retry
    }
  }

  return (
    <div>
      <Header/>
      <>
        {view === "input" && <SourceInput onSubmit={handleSubmit} error={error}/>}
        {view === "reading" && <div className="mt-10 grid grid-cols-[1fr_minmax(0,720px)_1fr] gap-5">
          <Button variant="new-text" onClick={() => setView("input")}>New <br/>Text</Button>
          <ReadingArea playing={playing} setPlaying={setPlaying} result={result} settings={settings}></ReadingArea>
          <ControlPanel settings={settings} onSettingsChange={updateSettings}/>
        </div>}
        {view === "loading" && <div className="flex justify-center">LOADING...</div>}
      </>
    </div>
    
  )
}

function Header() {
    return (
        <header className="flex justify-center">
            <nav className="border-2 border-t-0">
                <ul className="flex flex-row gap-4">
                    <li>Speed<br/>Reader</li>
                    <li>Read</li>
                    <li>Profile</li>
                </ul>
            </nav>
        </header>
    )
}