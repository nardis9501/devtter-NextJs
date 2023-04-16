export default function Button({ disabled, children, onClick }) {
  return (
    <>
      <button disabled={disabled} onClick={onClick}>
        {children}
      </button>

      <style jsx>{`
        button {
          align-items: center;
          display: flex;
          background-color: #000000;
          border: 0;
          color: #fff;
          cursor: pointer;
          border-radius: 9999px;
          font-size: 16px;
          font-weight: 800;
          padding: 8px 24px;
          transition: opacity 0.3s ease;
          -webkit-user-select: none;
          user-select: none;
        }

        button[disabled] {
          pointer-events: none;
          opacity: 0.2;
        }

        button:hover {
          opacity: 0.7;
        }

        button > :global(svg) {
          margin-right: 8px;
        }
      `}</style>
    </>
  )
}
