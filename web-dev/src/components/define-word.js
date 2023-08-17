import React from "react";
import subUrbanLogo from "../images/logo.png";
const DefineWord = () => {
    return (
        <div className="border p-3">
            <div className="d-flex align-items-center justify-content-center mb-3">
                <h1 className="text-uppercase font-weight-bold mr-3">
                    SUB-URBAN IS WRITTEN BY YOU
                </h1>
                <img src={subUrbanLogo} alt="Sub-Urban Logo" className="img-fluid w-50" />
            </div>
            <div className="d-grid gap-2">
                <a href="/define" className="btn btn-primary rounded-pill button-style font-weight-bold">
                    <span className="mr-2">+</span> Define a Word
                </a>
            </div>
        </div>
    );
}

export default DefineWord;