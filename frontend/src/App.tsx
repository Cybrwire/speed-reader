import { Button } from "./components/Button"
import { ReadingArea } from "./components/ReadingArea"

export default function App() {
  return (
    <div>
      <Header/>
      <div className="flex flex-row">
        <Button variant="new-text">New <br/>Text</Button>
        <ReadingArea></ReadingArea>
      </div>
    </div>
    
  )
}

function Header() {
    return (
        <header className="flex justify-center">
            <nav className="border-2">
                <ul className="flex flex-row gap-4">
                    <li>Speed<br/>Reader</li>
                    <li>Read</li>
                    <li>Profile</li>
                </ul>
            </nav>
        </header>
    )
}