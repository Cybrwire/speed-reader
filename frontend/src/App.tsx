import { useState } from "react"
import { Button } from "./components/Button"
import { ReadingArea } from "./components/ReadingArea"
import { ControlPanel } from "./components/ControlPanel"
import { SourceInput } from "./components/SourceInput"
import type { ParseResponse } from "../../server/src/ichiran.types"

export default function App() {

  const [result,setResult] = useState<ParseResponse | null>(null);

  return (
    <div>
      <Header/>
      <SourceInput onResult={setResult}/>
      <div className="mt-10 grid grid-cols-[1fr_minmax(0,720px)_1fr] gap-5">
        <Button variant="new-text" >New <br/>Text</Button>
        <ReadingArea result={result}></ReadingArea>
        <ControlPanel/>
      </div>
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