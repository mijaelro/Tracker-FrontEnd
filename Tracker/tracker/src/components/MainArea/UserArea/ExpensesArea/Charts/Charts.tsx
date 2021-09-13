import ChartBar from "../ChartBar/ChartBar";
import "./Charts.css";

interface ChartsProps{
    dataPoints:any[];
};

function Charts(props:ChartsProps): JSX.Element {

    const dataPointValues = props.dataPoints.map(dataPoint=>dataPoint.value);
    const totalMaxValue= Math.max(...dataPointValues);
    
    return (
        <div className="Charts">
			 {props.dataPoints.map((dataPoint=>
                <ChartBar key={dataPoint.label} value={dataPoint.value} maxValue={totalMaxValue} label={dataPoint.label}/>
            ))}
        </div>
    );
}

export default Charts;
