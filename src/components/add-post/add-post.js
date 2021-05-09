import React, { useState } from "react";
import { storage, db, } from "../../lib/firebase";
import CameraAltIcon from "@material-ui/icons/CameraAlt";
import CircularProgress from "@material-ui/core/CircularProgress";
import './add-post.css'
// import firebase from 'firebase';

function CreatePost({ user }) {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      var src1 = URL.createObjectURL(e.target.files[0]);
      var preview1 = document.getElementById("image-1-preview");
      preview1.src = src1;
      preview1.style.display = "block";
    }
  };

  const handleUpload = () => {
    if (image) {
    //   let imageName = makeid(10);    
      const uploadTask = storage.ref(`photos/${image.name}`).put(image);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // progress function .....
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progress);
        },
        (error) => {
          // Error function...
          console.log(error);
          alert(error.message);
        },
        () => {
          // upload complete function
          storage
            .ref("photos")
            .child(image.name)
            .getDownloadURL()
            .then((url) => {
              db.collection("photos").add({
                caption: caption,
                comments: [{}],
                dateCreated: Date.now(),
                imageSrc: url,
                photoId: Math.floor(Math.random() * 100000) + 1,
                likes: [],
                userId: user.userId,
                userLatitude: "",
                userLongitude: ""
              });
            });

          setProgress(0);
          setCaption("");
          setImage(null);
          var preview1 = document.getElementById("image-1-preview");
          preview1.style.display = "none";
        }
      );
    }
  };

  const removeImage = () => {
    var preview1 = document.getElementById("image-1-preview");
    preview1.style.display = "none";
  };

  return (
    <div className="container col-span-2">
      {user ? (
        <div className="rounded col-span-4 border bg-white border-gray-primary mb-5">
          <div className="createAPost__Top">
            <p>Create a Post</p>
          </div>
          {/* <progress value={progress} max="100" /> */}

          <div className="createAPost__center">
            <textarea
              className="createAPost__textarea"
              name="create a post"
              rows="2"
              value={caption}
              placeholder="Share where you've been or what you've been doing!"
              onChange={(e) => setCaption(e.target.value)}
            ></textarea>
            <div className="imagePreview">
              <img onClick={() => removeImage()} id="image-1-preview" alt="" />
              {progress === 0 ? (
                <></>
              ) : (
                <CircularProgress
                  className="circularProgress"
                  variant="determinate"
                  value={progress}
                />
              )}
            </div>
          </div>

          <div className="imageUpload__bottom">
            <div className="image-upload">
              <label htmlFor="file-input">
                <CameraAltIcon style={{ marginTop: "5px" }} />
              </label>

              <input
                id="file-input"
                type="file"
                accept="image/*"
                onChange={handleChange}
              />
            </div>

            <button
              className="button"
              onClick={handleUpload}
              style={{
                color: caption ? "gray" : "lightgrey",
                fontWeight: caption ? "600" : "500",
              }}
            >
              Upload
            </button>
          </div>
        </div>
      ) : (
        <div
          style={{
            marginTop: "30px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
        </div>
      )}
    </div>
  );
}

export default CreatePost;
