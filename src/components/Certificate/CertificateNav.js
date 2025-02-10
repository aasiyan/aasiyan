import React from 'react'
import { Link } from 'react-router-dom'

const CertificateNav = () => {
  return (
    <>
    <div className="d-flex justify-content-center flex-direction-column gap-10">
            <p>
              <Link className="linktext" to="/certificatehome">
                Approval
              </Link>
            </p>
            <p>
              <Link className="linktext" to="/certificategeneration">
                Generation
              </Link>
            </p>
            <p>
              <Link className="linktext" to="/certificatereport">
                Report
              </Link>
            </p>
          </div>
    </>
  )
}

export default CertificateNav