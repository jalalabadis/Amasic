import React from 'react'
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div className="footer">
    <div className="row">
   <dl className="col-6">
  <dt><Link to={"/"}>Amasic</Link></dt>
  <dd>As an Amazon Associate Amasic earns from qualifying purchases.</dd>
  </dl>
  
  <dl className="col-6">
  <dt></dt>
  <dd>
                  <ul>
                      <li>Copyright © Amasic 2023</li>
                      <li><Link to={"/"}>Legal Notice</Link></li>
                      <li><Link to={"/"}>Privacy policy</Link></li>
                      <li><Link to={"/"}>Cookie Policy</Link></li>
                  </ul>
              </dd>
          </dl>
     
  </div></div>
  )
}

export default Footer