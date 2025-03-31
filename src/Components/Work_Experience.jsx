import React from 'react';
import { Rnd } from 'react-rnd';
import { textFilesData } from './Data';

export default function Work_Experience({ start_x, start_y, width, height }) {
  return (
    <Rnd
    className = "hejhej"
      default={{
        x: start_x,
        y: start_y,
        width: width,
        height: height,
      }}
      bounds=".Desktop-StartScreen"
    >
      <div className="hej" style={{ width: '100%', height: '100%', overflow: 'auto' }}>
        <br></br>
        {textFilesData.map((job, index) => (
          <div key={index}>
            <h1>{job.workPlace}</h1>
            <p>{job.description}</p>
            <p>{job.city}</p>
            <p>{job.startDate}</p>
            <p>{job.endDate}</p>
          </div>
        ))}
      </div>
    </Rnd>
  );
}