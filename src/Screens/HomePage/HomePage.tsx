import React, { RefObject, useRef, useState } from "react";
import HeaderHome from "../../Components/Header/HeaderHome";
import { Link } from "react-router-dom";
import { PropTypes } from "../../data";
import userEvent from "@testing-library/user-event";
import { Button } from "antd";
import * as THREE from "three";
import { DeviceOrientationControls } from "three/examples/jsm/controls/DeviceOrientationControls.js";
import leftImg from "../../assets/img/left.jpeg";
import rightImg from "../../assets/img/right.jpeg";
import topImg from "../../assets/img/T2.jpg";
import bottomImg from "../../assets/img/T1.jpg";
import frontImg from "../../assets/img/FRONT.jpg";
import backImg from "../../assets/img/BACK.jpg";
import L1 from "../../assets/img/L1.jpg";
import L2 from "../../assets/img/L2.jpg";
import L3 from "../../assets/img/L3.jpg";
import L4 from "../../assets/img/L4.jpg";
import L5 from "../../assets/img/L5.jpg";
import L6 from "../../assets/img/L6.jpg";
import L7 from "../../assets/img/L7.jpg";
import L8 from "../../assets/img/L8.jpg";
import L9 from "../../assets/img/L9.jpg";
import R1 from "../../assets/img/R1.jpg";
import R2 from "../../assets/img/R2.jpg";
import R3 from "../../assets/img/R3.jpg";
import R4 from "../../assets/img/R4.jpg";
import R5 from "../../assets/img/R5.jpg";
import R6 from "../../assets/img/R6.jpg";
import R7 from "../../assets/img/R7.jpg";
import R8 from "../../assets/img/R8.jpg";
import R9 from "../../assets/img/R9.jpg";
import Loading from "../../Components/Loading/Loading";

export default function HomePage(props: PropTypes) {
  const leftArr = [L1, L2, L3, L4, L5, L6, L7, L8, L9];
  const rightArr = [R1, R2, R3, R4, R5, R6, R7, R8, R9];
  const ln = Math.floor(Math.random() * 9);
  const [loading, setLoading] = useState(true);
  const mount = useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    var renderer = new THREE.WebGLRenderer({ antialias: true });
    const mouse = new THREE.Vector2();
    const target = new THREE.Vector2();
    const windowHalf = new THREE.Vector2(
      window.innerWidth / 2,
      window.innerHeight / 2
    );
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    mount.current?.appendChild(renderer.domElement);
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    let flag = 0;
    window.addEventListener("resize", () => {
      let height = window.innerHeight;
      let width = window.innerWidth;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    });
    let callback = (event: any) => {
      console.log(flag);
      if (event.alpha) flag = 1;
      else if (flag == 1)
        window.removeEventListener("deviceorientation", callback);
      else {
        console.log("set camera position");
      }
    };
    window.addEventListener("deviceorientation", callback);

    const cubegeometry = new THREE.BoxGeometry(80, 80, 80); //create shape
    let cubeMaterials = [
      new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load(rightArr[ln]),
        side: THREE.BackSide,
      }), //right side
      new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load(leftArr[ln]),
        side: THREE.BackSide,
      }), //left side
      new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load(topImg),
        side: THREE.BackSide,
      }), //top side
      new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load(bottomImg),
        side: THREE.BackSide,
      }), //bottom side
      new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load(backImg),
        side: THREE.BackSide,
      }), //front side
      new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load(frontImg),
        side: THREE.BackSide,
      }), //back side
    ];

    const cubematerial = cubeMaterials; //give material and colour
    const cube = new THREE.Mesh(cubegeometry, cubematerial);

    scene.add(cube);

    let ambientLight = new THREE.AmbientLight(0xccccff, 0.7);
    scene.add(ambientLight);

    let directionalLight = new THREE.DirectionalLight(0xccccff, 0.01);
    directionalLight.position.set(0, 3, 50);
    let directionalLight1 = new THREE.DirectionalLight(0xccccff, 0.022);
    directionalLight1.position.set(20, 2.5, 50);
    let directionalLight2 = new THREE.DirectionalLight(0xccccff, 0.022);
    directionalLight2.position.set(-20, 2.5, 50);

    scene.add(directionalLight);
    scene.add(directionalLight1);
    scene.add(directionalLight2);

    function onMouseMove(event: any) {
      mouse.x = event.clientX - windowHalf.x;
      mouse.y = event.clientY - windowHalf.x;
    }
    var stars: THREE.Mesh<THREE.SphereGeometry, THREE.MeshBasicMaterial>[] = [];
    function addSphere() {
      // The loop will move from z position of -1000 to z position 1000, adding a random particle at each position.
      for (var z = -1000; z < 1000; z += 2) {
        // Make a sphere (exactly the same as before).
        var geometry = new THREE.SphereGeometry(0.5, 32, 32);
        var material = new THREE.MeshBasicMaterial({ color: 0xffffff });
        var sphere = new THREE.Mesh(geometry, material);

        // This time we give the sphere random x and y positions between -500 and 500
        sphere.position.x = Math.random() * 1000 - 500;
        sphere.position.y = Math.random() * 1000 - 500;

        // Then set the z position to where it is in the loop (distance of camera)
        sphere.position.z = z;

        // scale it up a bit
        sphere.scale.x = sphere.scale.y = 2;

        //add the sphere to the scene
        scene.add(sphere);

        //finally push it to the stars array
        stars.push(sphere);
      }
    }
    function animateStars() {
      // loop through each star
      for (var i = 0; i < stars.length; i++) {
        // and move it forward dependent on the mouseY position.
        stars[i].position.z += i / 10;

        // if the particle is too close move it to the back
        if (stars[i].position.z > 1000) stars[i].position.z -= 2000;
      }
    }

    let controls: any;
    let funct = () => {
      if (flag) {
        controls = new DeviceOrientationControls(camera);
        controls.alphaOffset = -1.5708;
      } else {
        document.addEventListener("mousemove", onMouseMove, false);
        console.log("reached here");
      }
    };
    setTimeout(() => {
      funct();
      setLoading(false);
    }, 1000);

    //game logic
    var update1 = () => {
      if (flag && controls) {
        controls.update();
      } else {
        target.x = (1 - mouse.x) * 0.002;
        target.y = (1 - mouse.y) * 0.002;
        camera.rotation.x += 0.05 * (target.y - camera.rotation.x);
        camera.rotation.y += 0.05 * (target.x - camera.rotation.y);
      }
    };
    //what we want to render
    var render = () => {
      renderer.render(scene, camera);
    };
    //game loop (event loop for game),(update, render, repeat)
    var GameLoop = () => {
      requestAnimationFrame(GameLoop); //run every single frame
      update1();
      render();
    };
    GameLoop();
  }, []);

  return (
    <>
      <Loading loading={loading} />
      <div ref={mount} style={{ width: "100vw", height: "100vh" }}></div>
      {!loading && (
        <div
          style={{
            position: "absolute",
            zIndex: 1000,
            marginTop: "15px",
            right: "15px",
            display:"flex"
          }}
        >
          {props.user.isLoggedIn ? (
            <Link to="/profile">
              <button
                className="btn_home"
                style={{ margin: "auto", transform: "scale(0.7)" }}
              >
                Go to Profile
              </button>
            </Link>
          ) : (
            <Link to="/login">
              <button
                className="btn_home"
                style={{ margin: "auto", transform: "scale(0.7)" }}
              >
                Login
              </button>
            </Link>
          )}
        </div>
      )}
      <div
        style={{
          position: "absolute",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          height: "100vh",
          width: "100vw",
          zIndex: 999,
        }}
      >
        <div style={{ margin: "auto", marginBottom: "5px" }}>
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Link to="/events">
              <button className="btn_home">Explore Events</button>
            </Link>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                margin: "auto",
                marginTop: "50px",
              }}
            >
              <Link to="/privacy" style={{ marginRight: "15px" }}>
                <h4>Privacy</h4>
              </Link>
              <Link to="/about" style={{ marginRight: "15px" }}>
                <h4>About</h4>
              </Link>
              <Link to="/termsofservice">
                <h4>Terms of Service</h4>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
