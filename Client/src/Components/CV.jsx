import Simon_Nya_Zeeland from "/Simon_Nya_Zeeland.jpg";
import { MdOutlineWork } from "react-icons/md";
import { FaPhoneFlip } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FaHouseChimney } from "react-icons/fa6";
import { TbAbacus } from "react-icons/tb";
import { IoInformationCircle } from "react-icons/io5";
import { SlCalender } from "react-icons/sl";
import { BsFillMortarboardFill } from "react-icons/bs";

import { CV_education, CV_Skills, CV_workExperience } from "./Data";

export default function CV() {

    return(
        <div className = "CV-container">
            <div id = "CV-left_side">
                <div id = "CV-summary">
                    <div id = "CV-avatar-section">
                        <img src = {Simon_Nya_Zeeland} alt="CV-Picture" id="CV-picture"/>
                        <p id = "CV-name">Simon Öman Rinne</p>
                    </div>
                </div>
                <div id = "CV-contactInfo">
                    <div id = "CV-contactInfo-object">
                        <MdOutlineWork />
                        <p>Front-end Developer</p>
                    </div>
                    <div id = "CV-contactInfo-object">
                        <FaHouseChimney />
                        <p>Norrköping, Sweden</p>
                    </div>
                    <div id = "CV-contactInfo-object">
                        <MdEmail />
                        <p>simon.oman.rinne@gmail.com</p>
                    </div>
                    <div id = "CV-contactInfo-object">
                        <FaPhoneFlip />
                        <p>0703-746687</p>
                    </div>
                </div>
                <section id = "CV-Skills">
                    <div id = "CV-header">
                        <p id = "CV-header-icons"><TbAbacus /></p>
                        <h1>Färdigheter</h1>
                    </div>
                    {CV_Skills.map((skill) => (
                        <article key = {skill.id} id ="CV-specific-skill">
                            <p>{skill.skill}</p>
                            <div id = "progressBar" >
                                <div id = "progressBar-percent" style={{width: `${skill.percent}%`}}>
                                    <p>{skill.percent}%</p>
                                </div>
                            </div>
                        </article>
                    ))}
                </section>
                <section id = "CV-education">
                    <div id = "CV-header">
                        <p id = "CV-header-icons"><BsFillMortarboardFill /></p>
                        <h1>Utbildning</h1>
                    </div>
                    {CV_education.map((edu) => (
                        <article key={edu.id} id = "education-entry">
                            <h3>{edu.subject}</h3>
                            <div id = "education-dates">
                                <SlCalender />
                                <p>{edu.startDate} - {edu.endDate}</p>
                            </div>
                            <p>{edu.name}</p>
                        </article>
                    ))}
                </section>
            </div>
            <div id = "CV-right_side">
                <section id = "CV-about">
                    <div id = "CV-header">
                        <p id = "CV-header-icons"><IoInformationCircle /></p>
                        <h1>Kort om mig</h1>
                    </div>
                    <p>
                        Jag är en engagerad och driven systemutvecklare med en solid grund inom 
                        C# och .NET. På sista tiden har jag fokuserat på front-end utveckling med fokus på react. Tidigare utbildad socionom, vilket 
                        har gett mig en stark förmåga att förstå och samarbeta med människor, en kompetens 
                        som även är värdefull i utvecklingsteam. Under min nuvarande utbildning har jag också 
                        fått goda kunskaper inom SQL-databaser och har arbetat med frontend-teknologier 
                        som React. Jag har praktisk erfarenhet av både agil projektledning och teknisk 
                        utveckling, vilket jag fick möjlighet att tillämpa under en praktikperiod som frontend
                        utvecklare och SCRUM Master för ett internationellt projekt. Jag ser fram emot att 
                        fortsätta växa inom programmering och utforska nya möjligheter där jag kan utvecklas 
                        både tekniskt och personligt. Jag är redo att bidra till spännande projekt och ta nästa 
                        steg i min resa som utvecklare. 
                    </p>
                </section>
                <section id = "CV-workExperience">
                    <div id = "CV-header">
                        <p id = "CV-header-icons"><MdOutlineWork /></p>
                        <h1>Arbetslivserfarenhet</h1>
                    </div>
                    <article id = "job-container">
                        {CV_workExperience.map((job) => (
                            <div key={job.id} id = "job-entry">
                                <h3>{job.title}, {job.city}</h3>
                                <div id = "work-dates">
                                    <p><SlCalender /></p>
                                    <p>{job.startDate} - {job.endDate}</p>
                                </div>
                                <p>{job.description}</p>
                                <hr id ="CV-border"></hr>
                            </div>
                        ))}
                    </article>
                </section>
            </div>
        </div>
    );
}