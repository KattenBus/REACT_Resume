import {Rnd} from 'react-rnd'

export default function Desktop_Icon({ imageIcon, iconText, start_x, start_y, doubleClick}) {

  return(

    <Rnd
      default={{
        x: start_x,
        y: start_y,
      }}
      bounds=".Desktop-StartScreen"
      enableResizing="false"
    >

      <div className = "icon-Structure" onDoubleClick={doubleClick}>
        <img id = "icon-Image" src = {imageIcon} draggable = "false"/>
        <p id = "icon-Text">{iconText}</p>
      </div>
    </Rnd>
  );
}