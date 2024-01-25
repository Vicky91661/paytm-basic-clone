import {BrowserRouter,Route, Routes} from "react-router-dom"
import Dashboard from "./Pages/Dashboard"
import Signin from "./Pages/Signin"
import Signup from "./Pages/Signup"
import ProfileDetails from "./Pages/ProfileDetails"
import Error from "./Pages/Error"
function App() {

  return (
    
      <BrowserRouter>
        <Routes>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/signin" element={<Signin/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/profile" element={<ProfileDetails/>}/>
          <Route path="/error" element={<Error/>}/>
        </Routes>
      </BrowserRouter>
    
  )
}

export default App
