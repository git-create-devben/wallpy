// import axios from "axios";
// import Image from "next/image";

// interface UnsplashPhoto {
//     photos: string
// }

// export async function getStaticProps() {
//   const response = await axios.get(
//     "https://api.unsplash.com/photos?client_id=7e9695HaTIcsIhEYsWU59mMVISnoE35xFD4ED8Fa6-A"
//   );

//   const photos = response.data;

//   return {
//     props: {
//       photos,
//     },
//   };
// }

// export default function UnsplashPage({ photos }: { photos: any[] }) {
//   return (
//     <div>
//       <h1>Unsplash Photos</h1>
//       <ul>
//         {photos.map((photo) => (
//           <li key={photo.id}>
//             <Image
//               src={String(photo.urls.regular)}
//               width={500}
//               height={500}
//               alt={photos.alt_description}
//             />
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }