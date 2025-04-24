import EditorPanel from "./_components/EditorPanel";
import Header from "./_components/Header";
import OutputPanel from "./_components/OutputPanel";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="w-full mx-auto px-2 py-2 flex-1 flex flex-col">
        <Header />
          
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 flex-1">
          <div className="flex flex-col md:max-h-[calc(100vh-100px)] md:h-full min-h-[80vh]">
            <EditorPanel />
          </div>
          <div className="flex flex-col md:max-h-[calc(100vh-100px)] md:h-full min-h-[50vh]">
            <OutputPanel />
          </div>
        </div>
      </div>
    </div>
  );
}
