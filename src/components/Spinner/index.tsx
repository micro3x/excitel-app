import './styles.scss';

export type SpinnerProps = {
  show: boolean;
  children?: JSX.Element;
  asOverlay?: boolean;
  inContainer?: boolean;
};

export default function Spinner({
  show,
  children,
  asOverlay,
  inContainer,
}: SpinnerProps) {
  const SpinnerHTML = () => (
    <div
      className={
        'spinner-container' +
        (asOverlay ? ' as-overlay' : '') +
        (inContainer ? ' in-container' : '')
      }
    >
      <div className="spinner-logo" />
    </div>
  );

  if (asOverlay) {
    return (
      <>
        {children}
        {show && <SpinnerHTML />}
      </>
    );
  }

  return <>{show ? <SpinnerHTML /> : children}</>;
}
