import React from 'react';
import './links.css';

const Links = () => (
  <div >
    <h1 className={"headerH"}>Helpful Links</h1>
      <div className={"grid-container"}>
        <div className={"grid-item"}><img src={'https://www.mentalhealthireland.ie/wp-content/uploads/2015/09/mental-health-help-lines.jpg'} alt="" className={"images"}></img></div>
        <div className={"grid-item"}><img src={'https://www.mentalhealthireland.ie/wp-content/uploads/2015/09/mental-health-gp.jpg'} alt="" className={"images"}></img></div>
        <div className={"grid-item"}><img src={'https://www.mentalhealthireland.ie/wp-content/uploads/2015/09/mental-health-counselling.jpg'} alt="" className={"images"}></img></div>  
        <div className={"grid-item"}><a href="http://www.mentalhealthireland.ie/need-help-now/">Helpline numbers</a></div>
        <div className={"grid-item"}><a href="https://www.mentalhealthireland.ie/a-to-z/gps/">GP</a></div>
        <div className={"grid-item"}><a href="http://www.psychotherapycouncil.ie/">Mental Health Counseling</a></div>  
        <div className={"grid-item"}>List of numbers of help lines that provide relating to particular issues or at times of crisis </div>
        <div className={"grid-item"}>GP may provide support directly or refer you on to community mental health services. You can find a list of support GPs following the link</div>
        <div className={"grid-item"}>A list of accredited counsellors and psychotherapists throughout Ireland may be found on the The Irish Association of Humanistic and Integrative Psychotherapy IAHIP</div>
      </div>


      <footer> Mental Health Ireland &#169;</footer>
    </div>



);

export default Links;