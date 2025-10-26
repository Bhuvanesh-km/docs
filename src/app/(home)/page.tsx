import { NavBar } from "./navbar";
import { TemplatesGallery } from "./templates-gallery";

const Home = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="fixed left-0 right-0 top-0 z-10 flex h-16 bg-white p-4">
        <NavBar />
      </div>
      <div className="mt-16">
        <TemplatesGallery />
      </div>
    </div>
  );
};

export default Home;
