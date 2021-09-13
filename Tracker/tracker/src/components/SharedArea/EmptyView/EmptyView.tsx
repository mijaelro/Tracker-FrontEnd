import "./EmptyView.css";

interface EmptyViewProps {
	msg: string;
};

const EmptyView=(props: EmptyViewProps): JSX.Element=> {
    return (
        <div className="EmptyView">
            <h2 id="niceTitle2">{props.msg}</h2>
			<img alt ="empty view"src="https://media0.giphy.com/media/3o7bu3XilJ5BOiSGic/200w.webp?cid=ecf05e47ri1jxg7le2yq096cs84xlx973et2i9i9vffgkzfe&rid=200w.webp&ct=g"/>
        </div>
    );
};

export default EmptyView;