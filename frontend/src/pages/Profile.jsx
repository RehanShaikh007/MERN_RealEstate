import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRef } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase.js";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  SignOutUserStart,
} from "../redux/user/userSlice.js";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const Profile = () => {
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const dispatch = useDispatch();
  const [showListingsError, setShowListingsError] = useState(false);
  const [userListings, setUserListings] = useState([]);

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },

      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, avatar: downloadURL });
        });
      }
    );
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success == false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignOut = async () => {
    try {
      dispatch(SignOutUserStart());
      const res = await fetch("/api/auth/signout");
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };


  const handleShowListings = async() => {
     try {
      setShowListingsError(false);
       const res = await fetch(`/api/user/listings/${currentUser._id}`);
       const data = await res.json();
       if(data.success === false){
        setShowListingsError(true);
        return;
       }
       setUserListings(data);
     } catch (error) {
        setShowListingsError(true);
     }
  }

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
        />
        <img
          onClick={() => fileRef.current.click()}
          src={formData.avatar || currentUser.avatar}
          alt="profile"
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
        />
        <p className="self-center">
          {fileUploadError ? (
            <span className="text-red-700 font-medium">
              Error on Uploading Image (Image must be less than 2 mb Size)
            </span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className="text-slate-700">{`Uploading ${filePerc}%`}</span>
          ) : filePerc === 100 ? (
            <span className="text-green-700 font-medium">
              Image Successfully Uploaded!
            </span>
          ) : (
            ""
          )}
        </p>
        <input
          type="text"
          placeholder="username"
          defaultValue={currentUser.username}
          className="border p-3 rounded-lg"
          onChange={handleChange}
          id="username"
        />
        <input
          type="email"
          placeholder="email"
          defaultValue={currentUser.email}
          className="border p-3 rounded-lg"
          onChange={handleChange}
          id="email"
        />
        <input
          type="password"
          placeholder="password"
          className="border p-3 rounded-lg"
          id="password"
        />
        <button
          disabled={loading}
          className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading..." : "Update"}
        </button>
        <Link
          className="bg-green-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-95"
          to={"/create-listing"}
        >
          create listing
        </Link>
      </form>
      <div className="flex justify-between mt-5">
        <span
          onClick={handleDeleteUser}
          className="border-solid border-2 p-2 rounded-lg border-red-700 hover:bg-red-700 hover:text-white text-red-700 cursor-pointer font-medium"
        >
          Delete Account
        </span>
        <span
          onClick={handleSignOut}
          className="border-solid border-2 p-2 rounded-lg border-red-700 hover:bg-red-700 hover:text-white text-red-700 cursor-pointer font-medium"
        >
          Sign Out
        </span>
      </div>
      <p className="text-red-700 mt-5 font-medium">{error ? error : ""}</p>
      <p className="text-green-700 mt-5 font-medium">
        {updateSuccess ? "User Updated Successfully!" : ""}
      </p>
      <button onClick={handleShowListings} className="flex text-green-700 mx-auto text-center font-medium border-2 border-green-700 px-3 py-2 rounded-lg hover:bg-green-700 hover:text-white">Show Listings</button>
      <p className="text-red-700 mt-5">{showListingsError ? 'Error showing Listings' : '' }</p>
      {userListings && userListings.length > 0 && 
      <div className="flex flex-col gap-4">
        <h1 className="text-center mt-7 text-2xl font-semibold ">Your Listings</h1>
          {userListings.map((listing) => (
        <div className="border rounded-lg p-3 flex justify-between items-center gap-4" key={listing._id}>
          <Link  className='h-16 w-16 object-contain' to={`/listing/${listing._id}`}>
           <img className="h-16 w-16 object-contain" src={listing.imageUrls[0]} alt="listing-cover" />
          </Link>
          <Link className="flex-1text-slate-700 font-semibold hover:underline truncate" to={`/listing/${listing._id}`}><p>{listing.name}</p>
          </Link>
          <div className="flex flex-col items-center">
             <button className="text-red-700 uppercase">Delete</button>
             <button className="text-green-700 uppercase">Edit</button>
          </div>
        </div>
       ))}
      </div>
     
      }
    </div>
  );
};

export default Profile;
 