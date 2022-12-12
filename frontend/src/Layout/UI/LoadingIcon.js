export default function LoadingIcon(props) {
  return (
    <>
      <div className={`d-flex justify-content-center bg-dark`}>
        <div className={`spinner-border m-5 text-primary`} role="status">
          <span className={`sr-only text-white`}>Ładowanie...</span>
        </div>
      </div>
    </>
  );
}
