import React from "react";

interface Props {
  params: {
    photoId: number;
    id: number;
  };
}

const PhotoPage = ({ params: { id, photoId } }: Props) => {
  return (
    <div>
      PhotoPage {id} {photoId}
    </div>
  );
};

export default PhotoPage;
