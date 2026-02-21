import { Routes, Route } from "react-router-dom";

import HomePage from "./homePage/HomePage";
import PostPage from "./postPage/PostPage";
import NotFound from "./NotFound";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/post/:id" element={<PostPage />} />

      <Route path="/404" element={<NotFound />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
