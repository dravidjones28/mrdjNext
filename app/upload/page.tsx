"use client";
import React, { useState } from "react";
import { CldUploadWidget, CldImage } from "next-cloudinary";

interface CloudaryResult {
  public_id: string;
}

const Upload = () => {
  const [pubicId, setPublicId] = useState("");
  return (
    <>
      {pubicId && (
        <CldImage src={pubicId} width={270} height={180} alt="An Image" />
      )}
      <CldUploadWidget
        options={{
          sources: ["local", "google_drive", "camera"],
        }}
        uploadPreset="hmskkjzj"
        onUpload={(result, widget) => {
          if (result.event !== "success") return;
          const info = result.info as CloudaryResult;
          setPublicId(info.public_id);
        }}
      >
        {({ open }) => (
          <button className="btn btn-primary" onClick={() => open()}>
            Upload
          </button>
        )}
      </CldUploadWidget>
    </>
  );
};

export default Upload;
