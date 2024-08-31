import { useState } from "react"

function App() {
  const [searchText , setSearchText] = useState("");
  return (
    <>
     <div><input type="text" value={searchText} onChange={(e) =>  setSearchText(e.target.value)} /></div>
     <h1 className="text-indigo-600" >سلام</h1>
    </>
  )
}

export default App
