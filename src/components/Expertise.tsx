import React from "react";
import '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReact, faDocker, faPython } from '@fortawesome/free-brands-svg-icons';
import Chip from '@mui/material/Chip';
import '../assets/styles/Expertise.scss';

const labelsFirst = [
    "React",
    "TypeScript",
    "JavaScript",
    "HTML5",
    "CSS3",
    "SASS",
    "Flask",
    "Python",
    "SQL",
    "PostgreSQL",
    "Postman"
];

const labelsSecond = [
    "Git",
    "GitHub Actions",
    "Docker",
    "AWS",
    "Azure",
    "Linux",
    "Snowflake",
    "Pandas",
    "Selenium",
];

const labelsThird = [
    "OpenAI",
    "Groq",
    "LangChain",
    "Qdrant",
    "Hugging Face",
    "LlamaIndex",
    "Streamlit",
];

function Expertise() {
    return (
    <div className="container" id="expertise">
        <div className="skills-container">
            <h1>Core Competencies</h1>
            <div className="skills-grid">
                <div className="skill">
                    {/* <FontAwesomeIcon icon={faReact} size="3x"/> */}
                    <h3>End-to-end Engineering</h3>
                    <p>Build complete systems across the stack, from backend architecture to frontend interfaces. I've owned features end-to-end — from infrastructure feasibility study and investment cost analysis through technology-stack evaluation to implementation — and built applications from scratch. I work primarily within engineering teams, owning my components through to delivery.</p>
                    {/*
                    <div className="flex-chips">
                        <span className="chip-title">Tech stack:</span>
                        {labelsFirst.map((label, index) => (
                            <Chip key={index} className='chip' label={label} />
                        ))}
                    </div> */}
                </div>

                <div className="skill">
                    {/* <FontAwesomeIcon icon={faDocker} size="3x"/> */}
                    <h3>Data and ETL Engineering</h3>
                    <p>I design and maintain data pipelines that move and transform data reliably at scale. Across telecom, finance, and enterprise, I've reengineered existing services and built new pipelines — automating data extraction from diverse sources, implementing new business workflows in a billing ETL pipeline serving 170M+ subscribers, and automating large-scale report generation</p>
                    {/*
                    <div className="flex-chips">
                        <span className="chip-title">Tech stack:</span>
                        {labelsSecond.map((label, index) => (
                            <Chip key={index} className='chip' label={label} />
                        ))}
                    </div> */}
                </div>

                <div className="skill">
                    {/* <FontAwesomeIcon icon={faPython} size="3x"/> */}
                    <h3>Applied AI and ML and Research</h3>
                    <p>I work at the intersection of applied AI and research. My graduate research explored the convergence of AI applications and security frameworks, and that's where my conviction took shape: advances in AI matter most when they reach the real world. I focus on building AI solutions that serve genuine, everyday needs.</p>
                    {/*
                    <div className="flex-chips">
                        <span className="chip-title">Tech stack:</span>
                        {labelsThird.map((label, index) => (
                            <Chip key={index} className='chip' label={label} />
                        ))}
                    </div> */}
                </div>

            </div>
        </div>
    </div>
    );
}

export default Expertise;