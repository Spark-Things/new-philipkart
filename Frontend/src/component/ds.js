const formData = new FormData();
      formData.append("file", postImg);
      formData.append(
        "upload_preset",
        process.env.NEXT_PUBLIC_CLOUDINARY_PRESET
      );
      formData.append("folder", process.env.NEXT_PUBLIC_CLOUDINARY_POST);
      // console.log(formData);
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`,
        {
          method: "POST",
          body: formData,
        }
      ).then((response) => response.json());
      const index = res.secure_url.lastIndexOf("/");
      const imgName = res.secure_url.substring(index + 1);
      uploadData(imgName);