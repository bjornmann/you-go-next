import * as s from './style';
const Loading = () => {
  return (
    <>
      <s.SVG x="0" y="0" viewBox="0 0 500 500">
        <s.PathCurve
          id="curve"
          d="M73.2,148.6c4-6.1,65.5-96.8,178.6-95.6c111.3,1.2,170.8,90.3,175.1,97"
        />
        <text
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
        >
          <s.TextContent
            xlinkHref="#curve"
          >
            Loading
          </s.TextContent>
        </text>
        <s.CenterCircle
          cx="50%"
          cy="50%"
          r="20%"
        />
      </s.SVG>
    </>
  );
}

export default Loading;
