// import React from "react";
// // import Dropzone from "react-dropzone-uploader";
// // import "react-dropzone-uploader/dist/styles.css";

// const ImageUpload = ({ formData, setFormData }) => {
//   const handleChangeStatus = ({ meta, file }, status) => {
//     if (status === "done") {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setFormData({
//           ...formData,
//           image: reader.result,
//         });
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   return (
//     <Dropzone
//       onChangeStatus={handleChangeStatus}
//       accept="image/*"
//       maxFiles={1}
//       inputContent="Drag an image here or click to select one"
//     />
//   );
// };

// export default ImageUpload;
