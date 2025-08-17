"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import ImageUploadModal from "./image-upload-modal";

interface Props {
  className?: string;
}

const ImageUploadWrapper: React.FC<Props> = ({ className }) => {
  const [openAuthModal, setOpenAuthModal] = useState<boolean>(false);

  return (
    <div>
      <ImageUploadModal
        open={openAuthModal}
        onClose={() => setOpenAuthModal(false)}
      />

      <Button variant="outline" onClick={() => setOpenAuthModal(true)}>
        Upload photo
      </Button>
    </div>
  );
};

export default ImageUploadWrapper;
