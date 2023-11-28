import { useState, useRef, useEffect } from "react";
import html2canvas from "html2canvas";
import QRCode from "react-qr-code";
import "./tailwind/styles.css";

function App() {
  const [value, setValue] = useState("");
  const [image, setImage] = useState("");
  const qrRef = useRef(null);

  console.log("value", value);
  console.log("image", image);
  console.log("qrRef", qrRef);

  const handleClick = () => {
    if (qrRef && value) {
      html2canvas(qrRef.current, {
        backgroundColor: "white",
        scale: 10,
      })
        .then((canvas) => {
          const imageData = canvas.toDataURL("image/png");
          const a = document.createElement("a");
          a.href = imageData;
          a.download = `${value.split("/").at(-1).toLowerCase()}-qr-code.png`;
          a.click();
          a.remove();
        })
        .catch((err) => console.log("error occured", err));
    }
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen gap-8">
      <form className="flex flex-col gap-4 p-4 text-xl rounded-md shadow-lg md:flex-row bg-blue-50">
        <input
          type="url"
          value={value}
          onChange={handleChange}
          placeholder="Enter URL"
          className="p-2 leading-3 tracking-wide bg-blue-100 rounded-md focus:bg-blue-400 placeholder:text-blue-950"
        />
        <button
          type="button"
          onClick={handleClick}
          className="px-4 py-2 transition-all duration-150 bg-blue-300 rounded-md hover:bg-blue-900 hover:text-white"
        >
          Download
        </button>
      </form>
      <div ref={qrRef}>
        <QRCode
          size={256}
          style={{ width: "108px", height: "108px" }}
          value={value}
          viewBox={`0 0 256 256`}
        />
      </div>

      {/* <div
        ref={cc}
        className="flex items-center justify-center w-1/2 text-white h-52 bg-red-950"
      >
        Hello World
      </div> */}
    </div>
  );
}

export default App;
