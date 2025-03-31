import { textFilesData } from "./Data";

export default function Jobs_Text_File() {
    return(

        <section className="Job_TextFiles-Container">
            <div id = "Job-List">
                {textFilesData.map((job, index) => {
                    console.log(job)
                    return(
                        <div key={index}>
                            <h1>{job.workPlace}</h1>
                            <p>{job.startDate}</p>
                            <p>{job.endDate}</p>
                            <p>{job.description}</p>
                            <p>{job.city}</p>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}