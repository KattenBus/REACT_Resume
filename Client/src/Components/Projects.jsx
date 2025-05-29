import { Project_files } from "./Data";

export default function Projects() {

    return(
        <div className = "Projects-Container">
            {Project_files.map(project => {

                const idIsEven = project.id % 2 === 0 ? "_left" : "_right";

                return(
                    <article id = {`project_section${idIsEven}`}>

                        <div id = {`project_content_area${idIsEven}`}>
                            <div id = {`project_text${idIsEven}`}>
                                <h2 id = "project_title">{project.title}</h2>
                                <p>{project.description}</p>
                            </div>
                            <video id = "project_video" src = {project.video} autoPlay loop controls />
                        </div>
                    </article>
                );
            })}
        </div>
    );
}