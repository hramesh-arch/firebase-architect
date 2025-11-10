import { useState } from 'react';
import TemplateGallery from './components/TemplateGallery';
import Customizer from './components/Customizer';

function App() {
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  return (
    <div className="min-h-screen">
      {selectedTemplate ? (
        <Customizer
          template={selectedTemplate}
          onClose={() => setSelectedTemplate(null)}
        />
      ) : (
        <TemplateGallery onSelectTemplate={setSelectedTemplate} />
      )}
    </div>
  );
}

export default App;
