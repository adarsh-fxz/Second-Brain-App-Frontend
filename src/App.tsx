import { Button } from "./components/Button"
import { Card } from "./components/Card"
import { PlusIcon } from "./icons/PlusIcon"
import { ShareIcon } from "./icons/ShareIcon"


function App() {
  return (
    <div className="p-4">
      <div className="flex justify-end gap-4">
        <Button variant="primary" text="Add Content" startIcon={<PlusIcon />} />
        <Button variant="secondary" text="Share brain" startIcon={<ShareIcon />} />
      </div>

      <div className="flex gap-4">
        <Card type="twitter" link="https://x.com/adarsh_fxz/status/1807696622220132662" title="First tweet" />
        <Card type="youtube" link="https://www.youtube.com/watch?v=-eSeEt88zDc" title="Rockstar" />
      </div>
    </div>
  )
}

export default App
