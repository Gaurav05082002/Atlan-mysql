// App.js
import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Nav from './components/Nav';
import Editor from './components/editor/Editor';
import Guideline from './components/Guideline/Guideline';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap styles
import { Modal, Button } from 'react-bootstrap'; // Import Bootstrap modal components
import Stats from './components/Statistics/Stats';

function App() {
  const [showGuidelineModal, setShowGuidelineModal] = useState(true);

  const handleCloseGuidelineModal = () => setShowGuidelineModal(false);

  return (
    <div className="App">
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<Editor />} />
          <Route path="/guideline" element={<Guideline />} />
          <Route path="/Stats" element={<Stats />} />
        </Routes>

        {/* Bootstrap Modal for Guideline */}
        <Modal show={showGuidelineModal} onHide={handleCloseGuidelineModal} dialogClassName="custom-modal">
          <Modal.Header closeButton>
            <Modal.Title>Documentation</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Guideline />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseGuidelineModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Router>
    </div>
  );
}

export default App;
