import { textFilesData } from "./Data";

export default function Jobs_Text_File() {
    return(

        <section className="Job_TextFiles-Container">
            <div id = "Job-List">
                {textFilesData.map((job, index) => {
                    return(
                        <div id = "Generated-JobList" key={index}>
                            <h1 id = "JobList-Information">{job.workPlace}</h1>
                            <div id = "JobList-Information-Dates">
                                <p>{job.startDate}-</p>
                                <p>{job.endDate}</p>
                                <p>, {job.city}</p>
                            </div>
                            <p id = "JobList-Information">{job.description}</p>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}