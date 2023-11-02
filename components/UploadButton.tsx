"use client";

import { UploadButton } from "../utils/uploadthing";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"


export default function Uploadbutton() {
  return (
    <main>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <button
        className=" w-40 btn text-[12px]"
        onClick={() => {
          // Check if the modal element exists before calling the showModal() method.
          const element = document.getElementById("my_modal_5");

          if (element != null && (element as DialogElement).tagName === "DIALOG") {
            element.showModal();
          }
        }}
      >
        Add portfolio
      </button>
      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">
            Press ESC key or click the button below to close
          </p>
          <UploadButton
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              // Do something with the response
              console.log("Files: ", res);
              alert("Upload Completed");
            }}
            onUploadError={(error: Error) => {
              // Do something with the error.
              alert(`ERROR! ${error.message}`);
            }}
          />
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </main>
  );
}
