// 2-4-27, 2620170553, Miki Takahashi
window.onload = function() {
  const width = window.innerWidth;
  const height = window.innerHeight;

  const Xc = 9;
  const Yc = 9;
  const LXc = 4;
  const LYc = 4;


  let geometries = [];
  let cubes = [];
  let cubeParams = [];
  let mov = true;

  let scene = new THREE.Scene();
  let camera = new THREE.PerspectiveCamera( 75, width/height, 0.1, 1000 );
  let renderer = new THREE.WebGLRenderer();
  renderer.setSize( width, height);
  document.body.appendChild(renderer.domElement);
  for(let y=-(Yc-1)/2; y<=(Yc-1)/2; y++) {
    for(let x=-(Xc-1)/2; x<=(Xc-1)/2; x++) {
      let geometry = new THREE.BoxGeometry(0.8,0.8,0.8);
      const r = 0.7*(x+(Xc-1)/2)/Xc;
      const g = 0.7*(y+(Yc-1)/2)/Yc;
      const c = new THREE.Color(r,g,0.7);
    	let material = new THREE.MeshStandardMaterial( {color: c, roughness: 0.3} );
    	let cube = new THREE.Mesh(geometry, material);
      cube.position.x = x*1.5;
      cube.position.y = y*1.4;
      geometries.push(geometry);
      cubes.push(cube);
      cubeParams.push([Math.random()*0.4-0.1,Math.random()*0.4-0.1]);
      scene.add( cube );
    }
  }


  for(let y=-(LYc-1)/2; y<=(LYc-1)/2; y++) {
    for(let x=-(LXc-1)/2; x<=(LXc-1)/2; x++) {
      const r = 0.3*(x+(LXc-1)/2)/LXc + 0.15;
      const g = 0.3*(y+(LYc-1)/2)/LYc + 0.15;
      const light = new THREE.PointLight(new THREE.Color(r,g,0.4), 1);
      light.position.x = x*3;
      light.position.y = y*2;
      scene.add(light);
    }
  }


  console.log(cubes[0]);

  camera.position.z = 6;
  let count = 0;
  var animate = function() {
    requestAnimationFrame( animate );
    for(let y=-(Yc-1)/2; y<=(Yc-1)/2; y++) {
      for(let x=-(Xc-1)/2; x<=(Xc-1)/2; x++) {
        const i = (y+(Yc-1)/2)*Xc+(x+(Xc-1)/2)
        const dx = cubeParams[i][0];
        const dy = cubeParams[i][1];
        if(y<0) { cubes[i].rotation.x -= dx; }
        else if(0<y) { cubes[i].rotation.x +=dx; }
        if(x<0) { cubes[i].rotation.y += dy; }
        else if(0<x) { cubes[i].rotation.y -=dy; }
        cubes[i].scale.x = 0.8+0.2*Math.cos(count*4);
        cubes[i].scale.y = 0.8+0.2*Math.cos(count*4);
        cubes[i].scale.z = 0.8+0.2*Math.cos(count*4);
      }
    }
    count += 0.04;
    camera.position.x = Math.sin(count*0.5);
    camera.position.y = Math.cos(count*0.5);
    camera.position.z = 5.7 + 0.7*Math.sin(count);
    camera.rotation.z += 0.01;
    renderer.render( scene, camera );
  }
  animate();
}
