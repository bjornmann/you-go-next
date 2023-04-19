import * as s from './style';
interface IAlertBanner {
  headline: string;
  message: string;
}
const AlertBanner = ({ headline, message }: IAlertBanner) => (
  <s.Wrapper>
    <strong>{headline}</strong>
    <p>{message}</p>
  </s.Wrapper>
);

export default AlertBanner;
