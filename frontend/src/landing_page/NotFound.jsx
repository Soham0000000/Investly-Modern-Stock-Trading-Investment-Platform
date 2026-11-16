import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
    return (
        <section className="container d-flex align-items-center justify-content-center" style={{ minHeight: '60vh' }}>
            <div className="row justify-content-center w-100">
                <div className="col-12 col-md-8 text-center py-5">
                    <i className="fa-solid fa-circle-question fa-4x text-primary mb-4" aria-hidden="true"></i>
                    <h1 className="fw-bold mb-3">404 - Page Not Found</h1>
                    <p className="fs-5 text-secondary mb-4">
                        Sorry, the page you are looking for does not exist or has been moved.
                    </p>
                    <Link to="/" className="btn btn-primary px-4 py-2">
                        <i className="fa-solid fa-house me-2" aria-hidden="true"></i>
                        Go to Home
                    </Link>
                </div>
            </div>
        </section>
    );
}

export default NotFound;