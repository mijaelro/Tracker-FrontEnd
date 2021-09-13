import "./ChartBar.css";

interface ChartBarProps{
    label:string;
    value:number;
    maxValue:number;
};

function ChartBar(props:ChartBarProps): JSX.Element {

    let barFillHeight = '0%';
    
    if(props.maxValue>0){
        barFillHeight =Math.round((props.value/props.maxValue)*100) + '%'
    };

    return (
        <div className="ChartBar">
			<div className="ChartBarInner">
                <div className="ChartBarFill" style={{height:barFillHeight}}></div>
            </div>
            <div className="ChartBarLabel">{props.label}</div>
        </div>
    );
};

export default ChartBar;
