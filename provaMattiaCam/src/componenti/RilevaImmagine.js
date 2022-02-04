import RilevaHeader from './RilevaHeader';
import ClassificaImmagine from './ClassificaImmagine';

function RilevaImmagine(){
    return(
        <div>
            <RilevaHeader type="Image Classification" info="Upload a photo and let me analyze it"/>
            <ClassificaImmagine />
        </div>
    )
}

export default RilevaImmagine;