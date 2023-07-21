const ProfilePic = (props) => {

    const uploadPic = (input) => {
        if (input.files && input.files[0]) {
            let reader = new FileReader();

            reader.onload = function (e) {
                const imgContainer = document.getElementById("profilePicBody");
                const image = document.createElement("img");

                imgContainer.innerHTML = "";
                imgContainer.style.backgroundColor = "";

                image.id = "image";
                image.src = URL.createObjectURL(input.files[0]);
                imgContainer.appendChild(image);
            }

            reader.readAsDataURL(input.files[0]);
        }
    }
    return (
        <div className="profile-pic" id="profilePicBody">
            <label className="button" for="profilePicUp">Select and image</label>
            <input type="file" accept="image/jpeg" id="profilePicUp" onInput={e => uploadPic(e.target)} style={{opacity: '0'}}></input>
        </div>
    )
}

export default ProfilePic;