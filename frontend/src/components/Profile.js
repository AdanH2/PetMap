import { useAuthUser } from "react-auth-kit";
import React from "react";
import "../styles/profile.css";
import ProfilePic from "./ProfilePic";

const Profile = () => {
    const auth = useAuthUser();
    
    const sleep = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const yes = (input) => {
        const imgContainer = document.getElementById("imgbody");
        const image = document.createElement("img");
        const modalContent = document.getElementsByClassName("modal-content")[0];

        imgContainer.innerHTML = "";
        imgContainer.style.backgroundColor = "";

        image.id = "image";
        image.src = URL.createObjectURL(input.files[0]);
        imgContainer.appendChild(image);
        
        modalContent.innerHTML = "";

        closeModal();
    }

    const no = () => {
        const modalContent = document.getElementById("preview");
        const input = document.getElementById("upload-photo");

        modalContent.innerHTML = "";
        input.value = "";

        closeModal();
    }

    const closeModal = () => {
        const modal = document.getElementById("modal-js-example");
        modal.classList.remove("is-active");
    }

    const readURL = (input) => {
        if (input.files && input.files[0]) {
            let reader = new FileReader();
            
            reader.onload = function (e) {
                const p = document.createElement("p");
                const previewFile = document.createElement("img");
                const modal = document.getElementById("modal-js-example");
                const modalContent = document.getElementsByClassName("modal-content")[0];

                let box = document.getElementById("box");

                if(!box){
                    console.log("there was no box")
                    box = document.createElement("div");

                    box.id = "box";
                    box.className = "box";

                    const newp = document.createElement("p");
                    const yesButton = document.createElement("button");
                    const noButton = document.createElement("button");

                    newp.innerHTML = "Would you like to make this picture your header?";

                    yesButton.innerHTML = "Yes";
                    yesButton.className = "button";

                    yesButton.addEventListener('click', function(){
                        yes(input);
                    });

                    noButton.innerHTML = "No";
                    noButton.className = "button";

                    noButton.addEventListener('click', function(){
                        no();
                    });

                    box.appendChild(newp);
                    box.appendChild(yesButton);
                    box.appendChild(noButton);
                }
                
                let div = document.getElementById("preview");
                
                if(!div){
                    console.log("there was no div")
                    div = document.createElement("div");

                    div.id = "preview";
                }

                p.className = "image is-4by3";

                previewFile.src = URL.createObjectURL(input.files[0]);

                p.appendChild(previewFile);

                div.appendChild(p);
                modalContent.appendChild(box);
                modalContent.appendChild(div);
                modal.classList.add("is-active");
            }

            reader.readAsDataURL(input.files[0]);
        }
    }

    const doSomething = () => {
        sleep(.5).then(() => {
            const img = document.getElementById("image");
            if (img.src === "") {
                img.remove();

                const imgContainer = document.getElementById("imgbody");

                const div = document.createElement("div");
                const warning = document.createElement("h1");
                const input = document.createElement("input");
                const label = document.createElement("label");

                imgContainer.style.backgroundColor = "lightgray";

                warning.innerHTML = "You do not have a header selected yet. Upload one."

                label.htmlFor = "upload-photo";
                label.innerHTML = "Upload Photo";
                label.className = "button";

                input.type = "file";
                input.accept = "image/jpeg";
                input.id = "upload-photo";
                input.style.opacity = 0;
                input.style.position = "absolute";

                input.addEventListener("input", function () {
                    readURL(this);
                });

                div.className = "choose-image";

                div.appendChild(warning);
                div.appendChild(label);
                div.appendChild(input);
                imgContainer.appendChild(div);
            }
        });
    }
    
    // const triggerModal = () => {
    //     const modal = document.getElementById("modal-js-example");
    //     modal.classList.add("is-active");
    // }
    
    return (
        <div className="container" style={{ paddingTop: '10px' }}>
            <section className="hero is-warning">
                <div className="hero-body">
                    <div className="profile-header">
                        <ProfilePic color="red"></ProfilePic>
                        <figure className="image" id="imgbody">
                            <img onLoad={doSomething()} id="image" alt="dog" />
                        </figure>
                    </div>
                    <div className="columns is-mobile">
                        <div className="column">
                            <div className="title is-4">First Name</div>
                            <div className="subtitle">{auth().firstname}</div>
                            <div className="title is-4">Last Name</div>
                            <div className="subtitle">{auth().lastname}</div>
                        </div>
                        <div className="column">
                            <div className="title is-4">Username</div>
                            <div className="subtitle">{auth().username}</div>
                            <div className="title is-4">Email</div>
                            <div className="subtitle">{auth().email}</div>
                        </div>
                    </div>
                </div>
            </section>
            {/* <button className="js-modal-trigger" data-target="modal-js-example" onClick={() => triggerModal()}>
                Open JS example modal
            </button> */}
            <div id="modal-js-example" className="modal">
                <div className="modal-background" onClick={() => closeModal()}></div>

                <div className="modal-content">
                </div>

                <button className="modal-close is-large" aria-label="close" onClick={() => closeModal()}>hello</button>
            </div>
        </div>
    )
}

export default Profile;