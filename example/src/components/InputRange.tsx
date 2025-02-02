interface InputRangeProps {
    size: number;
    vertical?: boolean;
    minValue: number;
    maxValue: number;
    stepValue: number;
    value: number;
    setValue: (value: number) => void;
}

export default function InputRange(props: InputRangeProps): JSX.Element {
    let style: React.CSSProperties;
    if (props.vertical) {
        style = { height: props.size, direction: 'rtl', writingMode: 'vertical-rl' };
    } else {
        style = { width: props.size };
    }

    return (
        <input
            style={style}
            className={`accent-slate-700 rounded-lg focus:outline-none cursor-pointer`}
            type="range"
            min={props.minValue}
            max={props.maxValue}
            step={props.stepValue}
            value={props.value}
            onChange={(e) => props.setValue(parseInt(e.target.value))}
        />
    );
}
