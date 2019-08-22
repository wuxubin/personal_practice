//COLORS
var Colors = {
  red: 0xf25346,
  white: 0xd8d0d1,
  pink: 0xF5986E,
  brown: 0x59332e,
  brownDark: 0x23190f,
  blue: 0x68c3c0,
};

// THREEJS RELATED VARIABLES

var scene,
  camera, fieldOfView, aspectRatio, nearPlane, farPlane,
  renderer, container;

//SCREEN VARIABLES

var HEIGHT, WIDTH;

//INIT THREE JS, SCREEN AND MOUSE EVENTS

function createScene() {

  HEIGHT = window.innerHeight;
  WIDTH = window.innerWidth;

  scene = new THREE.Scene();
  aspectRatio = WIDTH / HEIGHT;
  fieldOfView = 60;
  nearPlane = 1;
  farPlane = 10000;
  camera = new THREE.PerspectiveCamera(
    fieldOfView,
    aspectRatio,
    nearPlane,
    farPlane
  );
  scene.fog = new THREE.Fog(0xf7d9aa, 100, 950);
  camera.position.x = 0;
  camera.position.z = 200;
  camera.position.y = 100;

  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(WIDTH, HEIGHT);
  renderer.shadowMap.enabled = true;
  container = document.getElementById('world');
  container.appendChild(renderer.domElement);

  window.addEventListener('resize', handleWindowResize, false);
}

// HANDLE SCREEN EVENTS

function handleWindowResize() {
  HEIGHT = window.innerHeight;
  WIDTH = window.innerWidth;
  renderer.setSize(WIDTH, HEIGHT);
  camera.aspect = WIDTH / HEIGHT;
  camera.updateProjectionMatrix();
}


// LIGHTS

var ambientLight, hemisphereLight, shadowLight;

function createLights() {

  hemisphereLight = new THREE.HemisphereLight(0xaaaaaa, 0x000000, .9);
  // 环境光源修改场景中的全局颜色和使阴影更加柔和
  ambientLight = new THREE.AmbientLight(0xdc8874, .5);

  shadowLight = new THREE.DirectionalLight(0xffffff, .9);
  shadowLight.position.set(150, 350, 350);
  shadowLight.castShadow = true;
  shadowLight.shadow.camera.left = -400;
  shadowLight.shadow.camera.right = 400;
  shadowLight.shadow.camera.top = 400;
  shadowLight.shadow.camera.bottom = -400;
  shadowLight.shadow.camera.near = 1;
  shadowLight.shadow.camera.far = 1000;
  shadowLight.shadow.mapSize.width = 2048;
  shadowLight.shadow.mapSize.height = 2048;

  scene.add(hemisphereLight);
  scene.add(shadowLight);
  scene.add(ambientLight);
}


var Pilot = function () {
  this.mesh = new THREE.Object3D();
  this.mesh.name = "pilot";
  // angleHairs是用于后面头发的动画的属性 
  this.angleHairs = 0;

  // 飞行员的身体
  var bodyGeom = new THREE.BoxGeometry(15, 15, 15);
  var bodyMat = new THREE.MeshPhongMaterial({ color: Colors.brown, shading: THREE.FlatShading });
  var body = new THREE.Mesh(bodyGeom, bodyMat);
  body.position.set(2, -12, 0);

  this.mesh.add(body);
  // 脸部
  var faceGeom = new THREE.BoxGeometry(10, 10, 10);
  var faceMat = new THREE.MeshLambertMaterial({ color: Colors.pink });
  var face = new THREE.Mesh(faceGeom, faceMat);
  this.mesh.add(face);
  // 头发
  var hairGeom = new THREE.BoxGeometry(4, 4, 4);
  var hairMat = new THREE.MeshLambertMaterial({ color: Colors.brown });
  var hair = new THREE.Mesh(hairGeom, hairMat);
  hair.geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 2, 0));
  // 创建一个头发容器
  var hairs = new THREE.Object3D();
  // 创建一个头发顶部的容器（这会有动画效果）
  this.hairsTop = new THREE.Object3D();
  // 创建头顶的头发并放置他们在一个3*4的网格中
  for (var i = 0; i < 12; i++) {
    var h = hair.clone();
    var col = i % 3;
    var row = Math.floor(i / 3);
    var startPosZ = -4;
    var startPosX = -4;
    h.position.set(startPosX + row * 4, 0, startPosZ + col * 4);
    this.hairsTop.add(h);
  }
  hairs.add(this.hairsTop);
  // 创建脸庞的头发
  var hairSideGeom = new THREE.BoxGeometry(12, 4, 2);
  hairSideGeom.applyMatrix(new THREE.Matrix4().makeTranslation(-6, 0, 0));
  var hairSideR = new THREE.Mesh(hairSideGeom, hairMat);
  var hairSideL = hairSideR.clone();
  hairSideR.position.set(8, -2, 6);
  hairSideL.position.set(8, -2, -6);
  hairs.add(hairSideR);
  hairs.add(hairSideL);
  // 创建后脑勺的头发
  var hairBackGeom = new THREE.BoxGeometry(2, 8, 10);
  var hairBack = new THREE.Mesh(hairBackGeom, hairMat);
  hairBack.position.set(-1, -4, 0)
  hairs.add(hairBack);
  hairs.position.set(-5, 5, 0);

  this.mesh.add(hairs);

  var glassGeom = new THREE.BoxGeometry(5, 5, 5);
  var glassMat = new THREE.MeshLambertMaterial({ color: Colors.brown });
  var glassR = new THREE.Mesh(glassGeom, glassMat);
  glassR.position.set(6, 0, 3);
  var glassL = glassR.clone();
  glassL.position.z = -glassR.position.z

  var glassAGeom = new THREE.BoxGeometry(11, 1, 11);
  var glassA = new THREE.Mesh(glassAGeom, glassMat);
  this.mesh.add(glassR);
  this.mesh.add(glassL);
  this.mesh.add(glassA);

  var earGeom = new THREE.BoxGeometry(2, 3, 2);
  var earL = new THREE.Mesh(earGeom, faceMat);
  earL.position.set(0, 0, -6);
  var earR = earL.clone();
  earR.position.set(0, 0, 6);
  this.mesh.add(earL);
  this.mesh.add(earR);
}
// 移动头发
Pilot.prototype.updateHairs = function () {
  // 获得头发
  var hairs = this.hairsTop.children;
  // 根据 angleHairs 的角度更新头发
  var l = hairs.length;
  for (var i = 0; i < l; i++) {
    var h = hairs[i];
    // 每根头发将周期性的基础上原始大小的75%至100%之间作调整。
    h.scale.y = .75 + Math.cos(this.angleHairs + i / 3) * .25;
  }
  // 在下一帧增加角度
  this.angleHairs += 0.16;
}


var AirPlane = function () {
  this.mesh = new THREE.Object3D();
  this.mesh.name = "airPlane";

  // 驾驶舱

  var geomCockpit = new THREE.BoxGeometry(80, 50, 50, 1, 1, 1);
  var matCockpit = new THREE.MeshPhongMaterial({ color: Colors.red, shading: THREE.FlatShading });

  // 我们可以通过访问形状中顶点数组中一组特定的顶点
  // 然后移动它的 x, y, z 属性:
  geomCockpit.vertices[4].y -= 10;
  geomCockpit.vertices[4].z += 20;
  geomCockpit.vertices[5].y -= 10;
  geomCockpit.vertices[5].z -= 20;
  geomCockpit.vertices[6].y += 30;
  geomCockpit.vertices[6].z += 20;
  geomCockpit.vertices[7].y += 30;
  geomCockpit.vertices[7].z -= 20;

  var cockpit = new THREE.Mesh(geomCockpit, matCockpit);
  cockpit.castShadow = true;
  cockpit.receiveShadow = true;
  this.mesh.add(cockpit);

  // Engine

  var geomEngine = new THREE.BoxGeometry(20, 50, 50, 1, 1, 1);
  var matEngine = new THREE.MeshPhongMaterial({ color: Colors.white, shading: THREE.FlatShading });
  var engine = new THREE.Mesh(geomEngine, matEngine);
  engine.position.x = 50;
  engine.castShadow = true;
  engine.receiveShadow = true;
  this.mesh.add(engine);

  // Tail Plane

  var geomTailPlane = new THREE.BoxGeometry(15, 20, 5, 1, 1, 1);
  var matTailPlane = new THREE.MeshPhongMaterial({ color: Colors.red, shading: THREE.FlatShading });
  var tailPlane = new THREE.Mesh(geomTailPlane, matTailPlane);
  tailPlane.position.set(-40, 20, 0);
  tailPlane.castShadow = true;
  tailPlane.receiveShadow = true;
  this.mesh.add(tailPlane);

  // Wings

  var geomSideWing = new THREE.BoxGeometry(30, 5, 120, 1, 1, 1);
  var matSideWing = new THREE.MeshPhongMaterial({ color: Colors.red, shading: THREE.FlatShading });
  var sideWing = new THREE.Mesh(geomSideWing, matSideWing);
  sideWing.position.set(0, 15, 0);
  sideWing.castShadow = true;
  sideWing.receiveShadow = true;
  this.mesh.add(sideWing);

  var geomWindshield = new THREE.BoxGeometry(3, 15, 20, 1, 1, 1);
  var matWindshield = new THREE.MeshPhongMaterial({ color: Colors.white, transparent: true, opacity: .3, shading: THREE.FlatShading });;
  var windshield = new THREE.Mesh(geomWindshield, matWindshield);
  windshield.position.set(5, 27, 0);

  windshield.castShadow = true;
  windshield.receiveShadow = true;

  this.mesh.add(windshield);

  var geomPropeller = new THREE.BoxGeometry(20, 10, 10, 1, 1, 1);
  geomPropeller.vertices[4].y -= 5;
  geomPropeller.vertices[4].z += 5;
  geomPropeller.vertices[5].y -= 5;
  geomPropeller.vertices[5].z -= 5;
  geomPropeller.vertices[6].y += 5;
  geomPropeller.vertices[6].z += 5;
  geomPropeller.vertices[7].y += 5;
  geomPropeller.vertices[7].z -= 5;
  var matPropeller = new THREE.MeshPhongMaterial({ color: Colors.brown, shading: THREE.FlatShading });
  this.propeller = new THREE.Mesh(geomPropeller, matPropeller);

  this.propeller.castShadow = true;
  this.propeller.receiveShadow = true;

  var geomBlade = new THREE.BoxGeometry(1, 80, 10, 1, 1, 1);
  var matBlade = new THREE.MeshPhongMaterial({ color: Colors.brownDark, shading: THREE.FlatShading });
  var blade1 = new THREE.Mesh(geomBlade, matBlade);
  blade1.position.set(8, 0, 0);

  blade1.castShadow = true;
  blade1.receiveShadow = true;

  var blade2 = blade1.clone();
  blade2.rotation.x = Math.PI / 2;

  blade2.castShadow = true;
  blade2.receiveShadow = true;

  this.propeller.add(blade1);
  this.propeller.add(blade2);
  this.propeller.position.set(60, 0, 0);
  this.mesh.add(this.propeller);

  var wheelProtecGeom = new THREE.BoxGeometry(30, 15, 10, 1, 1, 1);
  var wheelProtecMat = new THREE.MeshPhongMaterial({ color: Colors.red, shading: THREE.FlatShading });
  var wheelProtecR = new THREE.Mesh(wheelProtecGeom, wheelProtecMat);
  wheelProtecR.position.set(25, -20, 25);
  this.mesh.add(wheelProtecR);

  var wheelTireGeom = new THREE.BoxGeometry(24, 24, 4);
  var wheelTireMat = new THREE.MeshPhongMaterial({ color: Colors.brownDark, shading: THREE.FlatShading });
  var wheelTireR = new THREE.Mesh(wheelTireGeom, wheelTireMat);
  wheelTireR.position.set(25, -28, 25);

  var wheelAxisGeom = new THREE.BoxGeometry(10, 10, 6);
  var wheelAxisMat = new THREE.MeshPhongMaterial({ color: Colors.brown, shading: THREE.FlatShading });
  var wheelAxis = new THREE.Mesh(wheelAxisGeom, wheelAxisMat);
  wheelTireR.add(wheelAxis);

  this.mesh.add(wheelTireR);

  var wheelProtecL = wheelProtecR.clone();
  wheelProtecL.position.z = -wheelProtecR.position.z;
  this.mesh.add(wheelProtecL);

  var wheelTireL = wheelTireR.clone();
  wheelTireL.position.z = -wheelTireR.position.z;
  this.mesh.add(wheelTireL);

  var wheelTireB = wheelTireR.clone();
  wheelTireB.scale.set(.5, .5, .5);
  wheelTireB.position.set(-35, -5, 0);
  this.mesh.add(wheelTireB);

  var suspensionGeom = new THREE.BoxGeometry(4, 20, 4);
  suspensionGeom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 10, 0))
  var suspensionMat = new THREE.MeshPhongMaterial({ color: Colors.red, shading: THREE.FlatShading });
  var suspension = new THREE.Mesh(suspensionGeom, suspensionMat);
  suspension.position.set(-35, -5, 0);
  suspension.rotation.z = -.3;
  this.mesh.add(suspension);

  this.pilot = new Pilot();
  this.pilot.mesh.position.set(-10, 27, 0);
  this.mesh.add(this.pilot.mesh);

  this.mesh.castShadow = true;
  this.mesh.receiveShadow = true;

};

Sky = function () {
  this.mesh = new THREE.Object3D();
  this.nClouds = 20;
  this.clouds = [];
  var stepAngle = Math.PI * 2 / this.nClouds;
  for (var i = 0; i < this.nClouds; i++) {
    var c = new Cloud();
    this.clouds.push(c);
    var a = stepAngle * i;
    var h = 750 + Math.random() * 200;
    c.mesh.position.y = Math.sin(a) * h;
    c.mesh.position.x = Math.cos(a) * h;
    c.mesh.position.z = -400 - Math.random() * 400;
    c.mesh.rotation.z = a + Math.PI / 2;
    var s = 1 + Math.random() * 2;
    c.mesh.scale.set(s, s, s);
    this.mesh.add(c.mesh);
  }
}

Sea = function () {
  var geom = new THREE.CylinderGeometry(600, 600, 800, 40, 10);
  geom.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI / 2));
  // 重点：通过合并顶点，我们确保海浪的连续性
  geom.mergeVertices();
  // 获得顶点
  var l = geom.vertices.length;
  // 创建一个新的数组存储与每个顶点关联的值：
  this.waves = [];

  for (var i = 0; i < l; i++) {
    // 获取每个顶点
    var v = geom.vertices[i];
    // 存储一些关联的数值
    this.waves.push({
      y: v.y,
      x: v.x,
      z: v.z,
      ang: Math.random() * Math.PI * 2,
      amp: 5 + Math.random() * 15,
      speed: 0.016 + Math.random() * 0.032
    });
  };
  var mat = new THREE.MeshPhongMaterial({
    color: Colors.blue,
    transparent: true,
    opacity: .8,
    shading: THREE.FlatShading,

  });

  this.mesh = new THREE.Mesh(geom, mat);
  this.mesh.receiveShadow = true;

}
// 现在我们创建一个在每帧可以调用的函数，用于更新顶点的位置来模拟海浪。
Sea.prototype.moveWaves = function () {
  // 获取顶点
  var verts = this.mesh.geometry.vertices;
  var l = verts.length;
  for (var i = 0; i < l; i++) {
    var v = verts[i];
    // 获取关联的值
    var vprops = this.waves[i];
    // 更新顶点的位置
    v.x = vprops.x + Math.cos(vprops.ang) * vprops.amp;
    v.y = vprops.y + Math.sin(vprops.ang) * vprops.amp;
    // 下一帧自增一个角度
    vprops.ang += vprops.speed;
  }
  // 告诉渲染器代表大海的几何体发生改变
  // 事实上，为了维持最好的性能
  // Three.js 会缓存几何体和忽略一些修改
  // 除非加上这句
  this.mesh.geometry.verticesNeedUpdate = true;
  sea.mesh.rotation.z += .005;
}

Cloud = function () {
  this.mesh = new THREE.Object3D();
  this.mesh.name = "cloud";
  var geom = new THREE.CubeGeometry(20, 20, 20);
  var mat = new THREE.MeshPhongMaterial({
    color: Colors.white,
  });

  var nBlocs = 3 + Math.floor(Math.random() * 3);
  for (var i = 0; i < nBlocs; i++) {
    var m = new THREE.Mesh(geom.clone(), mat);
    m.position.x = i * 15;
    m.position.y = Math.random() * 10;
    m.position.z = Math.random() * 10;
    m.rotation.z = Math.random() * Math.PI * 2;
    m.rotation.y = Math.random() * Math.PI * 2;
    var s = .1 + Math.random() * .9;
    m.scale.set(s, s, s);
    m.castShadow = true;
    m.receiveShadow = true;
    this.mesh.add(m);
  }
}

// 3D Models
var sea;
var airplane;

function createPlane() {
  airplane = new AirPlane();
  airplane.mesh.scale.set(.25, .25, .25);
  airplane.mesh.position.y = 100;
  scene.add(airplane.mesh);
}

function createSea() {
  sea = new Sea();
  sea.mesh.position.y = -600;
  scene.add(sea.mesh);
}

function createSky() {
  sky = new Sky();
  sky.mesh.position.y = -600;
  scene.add(sky.mesh);
}

function loop() {
  updatePlane();
  airplane.pilot.updateHairs();
  updateCameraFov();
  sea.moveWaves();
  sky.mesh.rotation.z += .01;
  renderer.render(scene, camera);
  requestAnimationFrame(loop);
}

function updatePlane() {
  var targetY = normalize(mousePos.y, -.75, .75, 25, 175);
  var targetX = normalize(mousePos.x, -.75, .75, -100, 100);
  // 在每帧通过添加剩余距离的一小部分的值移动飞机
  airplane.mesh.position.y += (targetY - airplane.mesh.position.y) * 0.1;

  // 剩余的距离按比例转动飞机
  airplane.mesh.rotation.z = (targetY - airplane.mesh.position.y) * 0.0128;
  airplane.mesh.rotation.x = (airplane.mesh.position.y - targetY) * 0.0064;
  airplane.propeller.rotation.x += 0.3;
}

function updateCameraFov() {
  camera.fov = normalize(mousePos.x, -1, 1, 40, 80);
  camera.updateProjectionMatrix();
}

function normalize(v, vmin, vmax, tmin, tmax) {
  var nv = Math.max(Math.min(v, vmax), vmin);
  var dv = vmax - vmin;
  var pc = (nv - vmin) / dv;
  var dt = tmax - tmin;
  var tv = tmin + (pc * dt);
  return tv;
}

function init(event) {
  document.addEventListener('mousemove', handleMouseMove, false);
  createScene();
  createLights();
  createPlane();
  createSea();
  createSky();
  loop();
}

// HANDLE MOUSE EVENTS

var mousePos = { x: 0, y: 0 };

function handleMouseMove(event) {
  var tx = -1 + (event.clientX / WIDTH) * 2;
  var ty = 1 - (event.clientY / HEIGHT) * 2;
  mousePos = { x: tx, y: ty };
}

window.addEventListener('load', init, false);
