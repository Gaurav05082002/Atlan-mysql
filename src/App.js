// App.js
import React, { useState  , useEffect} from 'react';
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

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust the breakpoint as needed
    };

    handleResize(); // Set initial state

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="App">
    {isMobile ? (<div style={{ textAlign:'center'   , justifyContent:'center', display:"flex" , alignItems:'center' , height:'100vh'  , padding:'3vh' }} ><p>Please open this application on a laptop or monitor. Currently not available on mobile.</p></div>) : (
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
    )}
  </div>
  );
}

export default App;
