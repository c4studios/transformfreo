import Layout from "./Layout.jsx";

import AboutUs from "./AboutUs";

import StatementOfFaith from "./StatementOfFaith";

import VisionAndAim from "./VisionAndAim";

import Connect from "./Connect";

import { BrowserRouter as Router, Navigate, Route, Routes, useLocation } from 'react-router-dom';

const PAGES = {

    AboutUs: AboutUs,

    StatementOfFaith: StatementOfFaith,

    VisionAndAim: VisionAndAim,

    Connect: Connect,

}

function _getCurrentPage(url) {
    if (url.endsWith('/')) {
        url = url.slice(0, -1);
    }
    let urlLastPart = url.split('/').pop();
    if (urlLastPart.includes('?')) {
        urlLastPart = urlLastPart.split('?')[0];
    }

    const pageName = Object.keys(PAGES).find(page => page.toLowerCase() === urlLastPart.toLowerCase());
    return pageName || Object.keys(PAGES)[0];
}

// Create a wrapper component that uses useLocation inside the Router context
function PagesContent() {
    const location = useLocation();
    const currentPage = _getCurrentPage(location.pathname);

    return (
        <Layout currentPageName={currentPage}>
            <Routes>

                    <Route path="/" element={<AboutUs />} />


                <Route path="/AboutUs" element={<AboutUs />} />

                <Route path="/StatementOfFaith" element={<StatementOfFaith />} />

                <Route path="/VisionAndAim" element={<VisionAndAim />} />

                {/* The Resources page was taken down in November 2026 at the
                    client's request. Old links land on the home page. */}
                <Route path="/Resources" element={<Navigate to="/" replace />} />

                <Route path="/Connect" element={<Connect />} />

            </Routes>
        </Layout>
    );
}

export default function Pages() {
    return (
        <Router>
            <PagesContent />
        </Router>
    );
}
