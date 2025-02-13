import { useEffect, useState } from "react"
import { Button } from "../components/Button"
import { Card } from "../components/Card"
import { CreateContentModal } from "../components/CreateContentModal"
import { PlusIcon } from "../icons/PlusIcon"
import { ShareIcon } from "../icons/ShareIcon"
import { Sidebar } from "../components/Sidebar"
import { useContent } from "../hooks/useContent"
import axios from "axios"
import { BACKEND_URL } from "../config"


function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const { content, refresh } = useContent();

  useEffect(() => {
    refresh();
  }, [modalOpen]);


  return <div>
    <Sidebar />
    <div className="p-4 ml-72 min-h-screen bg-gray-100">
      <CreateContentModal open={modalOpen} onClose={() => {
        setModalOpen(false);
      }} />
      <div className="flex justify-end gap-4">
        <Button onClick={() => {
          setModalOpen(true)
        }} variant="primary" text="Add Content" startIcon={<PlusIcon />} />
        <Button onClick={async () => {
          const response = await axios.post(BACKEND_URL + "/api/v1/brain/share", {
            share: true
          }, {
            headers: {
              Authorization: localStorage.getItem("token") || ""
            }
          });
          const shareUrl = `http://localhost:3000/brain/${response.data.hash}`;
          alert("Brain shared! URL copied to clipboard." + shareUrl);
          navigator.clipboard.writeText(shareUrl);
        }} variant="secondary" text="Share brain" startIcon={<ShareIcon />} />
      </div>

      <div className="flex gap-4 flex-wrap pt-4">
        {content.map(({ title, link, type }) => <Card title={title} link={link} type={type} />)}

      </div>
    </div>
  </div>
}

export default Dashboard
